import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import FilmTitle from '../FilmTitle/FilmTitle';
import { listTheater } from '~/services/TheaterService';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleValue, stepNext } from '~/features/showTime/showTimeSlice';
import { listScheduleNotScreened } from '~/services/ScheduleService';

const SelectFilm = () => {
    const [schedule, setSchedule] = useState([]);
    const [search, setSearch] = useState('');
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch()
    const theater = useSelector((state) => state.showTime.theater);

    useEffect(() => {
        const fetch = async () => {
            const data = await listScheduleNotScreened(search);
            setSchedule(data);
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
        dispatch(scheduleValue(id))
        dispatch(stepNext(2))
    }

    // console.log(schedule);
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
                {schedule.map((item) => (
                    <Col className="mt-3" key={item._id} xs={3} onClick={() => handleFilm(item._id)}>
                        <FilmTitle id={item.film} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SelectFilm;
