import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allFilm, statusFilm } from '~/services/FilmService';
import { detailGenre } from '~/services/GenreService';

const FilmPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);

    const handleStatus = async (id) => {
        await statusFilm(id, user?.accessToken);
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
    }, [number, action, numberPage, search]);

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

    const GenreName = ({ id }) => {
        const [name, setName] = useState('');

        useEffect(() => {
            const fetch = async () => {
                const data = await detailGenre(id);
                setName(data.name);
            };
            fetch();
        }, [id]);

        return <span>{name}</span>;
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
                        {films.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">
                                    {/* <img src={item.image} style={{ height: '60px' }} alt="" /> */}
                                    <ImageBase pathImg={item.image} style={{ height: '60px' }} />
                                </td>
                                <td className="align-middle">{item.name}</td>
                                <td className="text-center align-middle">
                                    {item.genre.map((name) => (
                                        <span>
                                            <GenreName id={name} />
                                            <br />
                                        </span>
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
                        ))}
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
