import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import FilmTitle from '~/components/FilmTitle/FilmTitle';
import SearchBar from '~/components/SearchBar/SearchBar';
import { listFilmNotScreened } from '~/services/FilmService';
import { listShowTimeByDay } from '~/services/ShowTimeService';
import { listTheater } from '~/services/TheaterService';

const BookTicketsPage = () => {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [theater, setTheater] = useState([]);

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
            setTheater(data);
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
                    <Form.Select className='w-50'>
                        <option>Chọn rạp</option>
                        {theater.map((item) => (
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
                        <FilmTitle image={item.image} name={item.name} id={item._id} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default BookTicketsPage;
