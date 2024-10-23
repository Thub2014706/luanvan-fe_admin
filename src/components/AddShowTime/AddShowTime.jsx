import { CCol, CDatePicker, CForm, CFormLabel, CFormSelect, CMultiSelect, CRow, CTimePicker } from '@coreui/react-pro';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { allTranslate } from '~/constants';
import { detailFilm } from '~/services/FilmService';
import { detailSchedule, listSchedule } from '~/services/ScheduleService';
import { addShowTime } from '~/services/ShowTimeService';
import Name from '../Name/Name';
import { detailTheater } from '~/services/TheaterService';
import { detailRoom } from '~/services/RoomService';

const AddShowTime = ({ show, handleClose, dateAdd, room, theater, onAddSuccess }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [films, setFilms] = useState([]);
    const [film, setFilm] = useState([]);
    const [translate, setTranslate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await listSchedule(dateAdd);
            setFilms(data);
        };
        fetch();
    }, [dateAdd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            await addShowTime(
                { theater, room, schedule: film[0].value, date: dateAdd, translate, timeStart, timeEnd },
                user?.accessToken,
            )
        ) {
            handleClose();
            onAddSuccess();
        }
    };

    const handleTimeStart = async (time) => {
        const initialTime = moment.tz(time, 'HH:mm', 'Asia/Ho_Chi_Minh');
        setTimeStart(initialTime.format('HH:mm'));
    };

    const handleTimeEnd = async (time) => {
        const initialTime = moment.tz(time, 'HH:mm', 'Asia/Ho_Chi_Minh');
        setTimeEnd(initialTime.format('HH:mm'));
    };

    useEffect(() => {
        const fetch = async () => {
            if (timeStart !== '' && film.length > 0) {
                const schedule = await detailSchedule(film[0].value)
                console.log(schedule);
                const data = await detailFilm(schedule.film);
                const initialTime = moment.tz(timeStart, 'HH:mm', 'Asia/Ho_Chi_Minh');
                const modMinute = initialTime.minutes() % 5 === 0 ? 0 : 5 - (initialTime.minutes() % 5);
                setTimeStart(initialTime.format('HH:mm'));
                const newTime = initialTime.add(data.time + 10 + 5 - ((data.time + 10) % 5) + modMinute, 'minutes');
                setTimeEnd(newTime.format('HH:mm'));
            } else {
                setTimeEnd('');
            }
        };
        fetch();
    }, [timeStart, film]);


    useEffect(() => {
        const fetch = () => {
            if (show) {
                setTimeStart('');
                setTimeEnd('');
                setTranslate('');
            }
        };
        fetch();
    }, [show]);

    return (
        <Modal centered show={show} onHide={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>
                        <h4>
                            Thêm suất chiếu (<Name id={theater} detail={detailTheater} /> -{' '}
                            <Name id={room} detail={detailRoom} />)
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <CFormLabel className="fw-bold">
                            Phim chiếu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>

                        <CMultiSelect
                            id="film"
                            multiple={false}
                            optionsStyle="text"
                            clearSearchOnSelect
                            options={
                                films &&
                                films.map((item) => ({
                                    value: item.schedule._id,
                                    label: `${item.nameFilm} (${item.schedule.type})`,
                                }))
                            }
                            value={film}
                            onChange={(value) => setFilm(value)}
                            placeholder="Phim chiếu"
                        />
                        {/* <Select
                            id="film"
                            options={films.map((item) => ({
                                value: item.schedule.film,
                                label: `${item.nameFilm} (${item.schedule.type})`,
                            }))}
                            value={film}
                            onChange={(value) => setFilm(value)}
                            classNamePrefix="bootstrap"
                            placeholder="Chọn phim chiếu"
                        /> */}
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="date">
                            Ngày chiếu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CDatePicker disabled cleaner={false} id="date" name="date" date={dateAdd} />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Hình thức dịch <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="translate"
                            value={translate}
                            name="translate"
                            onChange={(e) => setTranslate(e.target.value)}
                        >
                            <option>Hình thức dịch</option>
                            {allTranslate.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="my-3">
                        <CFormLabel className="fw-bold">
                            Thời gian chiếu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CRow>
                            <CCol>
                                <CTimePicker
                                    seconds={false}
                                    hours={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                                    minutes={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59]}
                                    placeholder="Bắt đầu"
                                    disabled={film.length === 0}
                                    inputReadOnly
                                    cleaner={false}
                                    onTimeChange={(time) => handleTimeStart(time)}
                                />
                            </CCol>

                            <CCol>
                                <CTimePicker
                                    seconds={false}
                                    hours={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                                    minutes={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 59]}
                                    disabled
                                    placeholder="Kết thúc"
                                    cleaner={false}
                                    time={timeEnd}
                                    onTimeChange={(time) => handleTimeEnd(time)}
                                />
                            </CCol>
                        </CRow>
                        {/* <CFormInput
                            type="time"
                            placeholder="Số cột"
                            name="numCol"
                            step="24"
                            // value={numCol}
                            // onChange={(e) => setNumCol(Math.max(e.target.value, 0))}
                        /> */}
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

export default AddShowTime;
