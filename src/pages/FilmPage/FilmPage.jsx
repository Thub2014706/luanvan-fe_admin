import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ImageBase from '~/components/ImageBase/ImageBase';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allFilm, statusFilm } from '~/services/FilmService';
import { detailGenre } from '~/services/GenreService';

const FilmPage = () => {
    const navigate = useNavigate();
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [genreNames, setGenreNames] = useState({});
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);

    const handleStatus = async (id) => {
        await statusFilm(id);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetchFilms = async () => {
            const data = await allFilm(search, number, numberPage);
            setFilms(data.data);
            setSumPage(data.sumPage);
        };

        fetchFilms();
    }, [number, action]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreIds = films.flatMap((film) => film.genre);
                const uniqueGenreIds = [...new Set(genreIds)];
                const genreNamesMap = {};

                await Promise.all(
                    uniqueGenreIds.map(async (id) => {
                        const genre = await detailGenre(id);
                        genreNamesMap[id] = genre.name;
                    }),
                );
                setGenreNames(genreNamesMap);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        if (films.length > 0) {
            fetchGenres();
        }
    }, [films]);

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleAdd = () => {
        navigate('/film/add');
    };

    const handleNumberPage = (value) => {
        console.log(value);
        setNumberPage(value);
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Phim</h5>
            <Row className="mb-3">
                <Col xs={6}>
                    <div className="button add" onClick={handleAdd}>
                        Thêm mới
                    </div>
                </Col>
                <Col xs={3}>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                <Col xs={3}>
                    <SearchBar handleSubmit={handleSearch} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>Tên phim</th>
                            <th>Thể loại</th>
                            <th>Thời lượng</th>
                            <th>Quốc gia</th>
                            <th>Ngày phát hành</th>
                            <th>Ngày kết thúc</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.length !== 0 ? (
                            films.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="text-center align-middle">{index + 1}</td>
                                    <td className="text-center align-middle">
                                        {/* <img src={item.image} style={{ height: '60px' }} alt="" /> */}
                                        <ImageBase pathImg={item.image} style={{ height: '60px' }} />
                                    </td>
                                    <td className="align-middle">{item.name}</td>
                                    <td className="text-center align-content-center">
                                        {item.genre.map((name) => (
                                            <p className="align-middle">{genreNames[name] || 'Loading'}</p>
                                        ))}
                                    </td>
                                    <td className="text-center align-middle">{item.time} phút</td>
                                    <td className="text-center align-middle">{item.nation}</td>
                                    <td className="text-center align-middle">
                                        {moment(item.releaseDate).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="text-center align-middle">
                                        {moment(item.endDate).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="align-content-center">
                                        <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Link to={`/film/update/${item._id}`}>
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                color="green"
                                                style={{ cursor: 'pointer' }}
                                                // onClick={() => handleShowAdd(item._id)}
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>
        </div>
    );
};

export default FilmPage;
