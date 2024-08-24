import { CDatePicker, CForm, CFormLabel, CMultiSelect } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { listFilm } from '~/services/FilmService';
import { addSchedule, detailSchedule } from '~/services/ScheduleService';

const AddSchedule = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [films, setFilms] = useState([]);
    const [film, setFilm] = useState([]);
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
            await addSchedule({ film: film[0].value, startDate, endDate }, user?.accessToken);
        }
    };

    // console.log(film.value)
    return (
        <Modal centered show={show} onHide={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{id !== null ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <CFormLabel className="fw-bold" htmlFor="film">
                            Phim chiếu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CMultiSelect
                            id="film"
                            multiple={false}
                            optionsStyle="text"
                            clearSearchOnSelect
                            options={films.map((item) => ({
                                value: item._id,
                                label: item.name,
                                // selected: genre.find((mini) => mini.value === item._id),
                            }))}
                            // value={film}
                            onChange={(value) => setFilm(value)}
                            placeholder="Phim chiếu"
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="startDate">
                            Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CDatePicker
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            date={startDate}
                            onDateChange={(date) => setStartDate(moment(date).format('YYYY-MM-DD'))}
                            placeholder="Ngày bắt đầu"
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="endDate">
                            Ngày kết thúc <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CDatePicker
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            date={endDate}
                            onDateChange={(date) => setEndDate(moment(date).format('YYYY-MM-DD'))}
                            placeholder="Ngày kết thúc"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
            </CForm>
        </Modal>
    );
};

export default AddSchedule;