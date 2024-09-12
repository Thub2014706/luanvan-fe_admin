import React, { useEffect, useState } from 'react';
import ScheduleMini from '../ScheduleMini/ScheduleMini';
import { detailShowTimeById, listShowTimeByDay, soldOutSeat } from '~/services/ShowTimeService';
import moment from 'moment';
import { nameDay, statusShowTime } from '~/constants';
import { useDispatch, useSelector } from 'react-redux';
import { idShowTimeValue, preStep1, roomValue, stepNext, timeValue } from '~/features/showTime/showTimeSlice';
import { Col, Row } from 'react-bootstrap';
import CardBookTicket from '../CardBookTicket/CardBookTicket';

const SelectShowTime = () => {
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);
    const [idShowTime, setIdShowTime] = useState(null);
    const [war, setWar] = useState('');
    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.showTime.schedule);
    const theater = useSelector((state) => state.showTime.theater);

    const now = new Date();
    const array = [0, 1, 2, 3, 4, 5, 6];
    const week = [];

    array.forEach((item) => {
        const date = new Date(now);
        date.setDate(date.getDate() + item);
        week.push({ date: date.getDate(), day: date.getDay(), full: moment(date).format('YYYY-MM-DD') });
    });

    useEffect(() => {
        const fetch = async () => {
            const data = await listShowTimeByDay(theater, date, schedule);
            console.log(data);
            const newData = await Promise.all(
                data.map(async (item) => {
                    const showTime = await detailShowTimeById(item._id);
                    const test = await soldOutSeat(item._id, showTime.room);
                    return { ...item, test };
                }),
            );
            setShowTimes(newData);
        };
        fetch();
    }, [theater, date, schedule]);

    const handleSelect = async (index, date) => {
        setSelectDay(index);
        setDate(date);
    };

    const handleSubmit = async () => {
        if (idShowTime !== null) {
            const data = await detailShowTimeById(idShowTime);
            dispatch(roomValue(data.room));
            dispatch(timeValue({ timeStart: data.timeStart, date: data.date }));
            dispatch(idShowTimeValue(idShowTime));
            dispatch(stepNext(3));
        } else {
            setWar('Vui lòng chọn suất chiếu!');
        }
    };

    const handleShowTime = (id) => {
        if (idShowTime !== id) {
            setIdShowTime(id);
            setWar('');
        } else {
            setIdShowTime(null);
        }
    };

    const handlePre = () => {
        dispatch(preStep1());
    };

    return (
        <Row className="mt-4">
            <Col xs={3}>
                <CardBookTicket />
            </Col>
            <Col xs={9}>
                <div className="d-flex">
                    {week.map((item, index) => (
                        <ScheduleMini
                            date={item.date}
                            day={now.getDay() === item.day ? 'Hôm nay' : nameDay[item.day]}
                            handleSelectDay={() => handleSelect(index, item.full)}
                            selectDay={selectDay === index ? true : false}
                        />
                    ))}
                </div>
                <div className="mt-5">
                    {showTimes.length > 0 ? (
                        <>
                            {showTimes.map((item, index) => (
                                <span
                                    style={{ display: 'inline-block' }}
                                    onClick={() =>
                                        item.status === statusShowTime[2] && item.test === 1 && handleShowTime(item._id)
                                    }
                                    className={`time-mini me-3 mb-3 ${
                                        item.status === statusShowTime[2] && item.test === 1
                                            ? `yes ${item._id === idShowTime ? 'select' : ''}`
                                            : 'no'
                                    }`}
                                >
                                    {item.timeStart}
                                </span>
                            ))}
                            <p style={{ color: 'red', position: 'absolute' }}>{war}</p>
                        </>
                    ) : (
                        <p>Chưa có suất chiếu nào!</p>
                    )}
                    <div className="float-end d-flex">
                        <div className="mt-5 button add me-3" onClick={handlePre}>
                            Quay lại
                        </div>
                        {showTimes.length !== 0 && (
                            <div className="mt-5 button add float-end" onClick={handleSubmit}>
                                Tiếp theo
                            </div>
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default SelectShowTime;
