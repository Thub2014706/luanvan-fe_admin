import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import SearchBar from '~/components/SearchBar/SearchBar';
import { listFilmNotScreened } from '~/services/FilmService';
import { listShowTimeByDay } from '~/services/ShowTimeService';
import { listTheater } from '~/services/TheaterService';

const BookTicketsPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [theater, setTheater] = useState(user?.data.theater);
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listFilmNotScreened(search);
            setFilms(data);
        };
        fetch();
    }, [search]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
        };
        fetch();
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    console.log(films);

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Đặt vé</h5>
            <Row className="mb-3">
                <Col>
                    <Form.Select className="w-50" value={theater} disabled>
                        <option>Chọn rạp</option>
                        {theaters.map((item) => (
                            <option value={item._id}>{item.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <SearchBar handleSubmit={handleSearch} />
                </Col>
            </Row>
            <Row>
                {films.map((item) => (
                    <Col key={item._id} xs={3}>
                        <Link to={`/book-tickets/${item._id}`}>
                            <FilmTitle image={item.image} name={item.name} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BookTicketsPage;
