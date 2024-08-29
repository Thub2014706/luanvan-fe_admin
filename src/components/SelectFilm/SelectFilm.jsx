import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import FilmTitle from '../FilmTitle/FilmTitle';
import { Link } from 'react-router-dom';
import { listFilmNotScreened } from '~/services/FilmService';
import { listTheater } from '~/services/TheaterService';
import { useDispatch, useSelector } from 'react-redux';
import { filmValue, stepNext } from '~/features/showTime/showTimeSlice';

const SelectFilm = () => {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch()
    const theater = useSelector((state) => state.showTime.theater);

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

    const handleFilm = (id) => {
        dispatch(filmValue(id))
        dispatch(stepNext(2))
    }

    console.log(films);
    return (
        <div>
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
                    <Col className="mt-3" key={item._id} xs={3} onClick={() => handleFilm(item._id)}>
                        <FilmTitle image={item.image} name={item.name} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SelectFilm;
