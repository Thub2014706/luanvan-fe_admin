import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { listFilm } from '~/services/FilmService';
import { addSchedule, detailSchedule } from '~/services/ScheduleService';

const AddSchedule = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [films, setFilms] = useState([]);
    const [film, setFilm] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await listFilm();
            setFilms(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                const data = await detailSchedule(id);
                setFilms(data.film);
                setStartDate(data.startDate);
                setEndDate(data.endDate);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id === null) {
            await addSchedule({ film, startDate, endDate }, user?.accessToken);
        }
    };

    console.log(film)
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{id !== null ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="fw-bold" htmlFor="endDate">
                            Phim chiếu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Select
                            id="film"
                            // isMulti
                            options={films.map((item) => ({ value: item._id, label: item.name }))}
                            value={film.va}
                            onChange={(value) => setFilm(value.value)}
                            classNamePrefix="bootstrap"
                            placeholder=""
                        />
                        {/* <Form.Select value={film} name="film" onChange={(e) => setFilm(e.target.value)}>
                            <option value="">Phim chiếu</option>
                            {films.map((item) => (
                                <option value={item._id}>{item.name}</option>
                            ))}
                        </Form.Select> */}
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold" htmlFor="endDate">
                            Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            placeholder="Ngày kết thúc"
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold" htmlFor="endDate">
                            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="date"
                            placeholder="Ngày kết thúc"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddSchedule;
