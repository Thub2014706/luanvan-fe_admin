import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import Name from '~/components/Name/Name';
import ScheduleMini from '~/components/ScheduleMini/ScheduleMini';
import { nameDay, statusShowTime } from '~/constants';
import { detailFilm } from '~/services/FilmService';
import { listShowTimeByDay } from '~/services/ShowTimeService';

const SelectShowTimePage = () => {
    const { id } = useParams();
    const [film, setFilm] = useState();
    const [selectDay, setSelectDay] = useState(0);
    const [theater, setTheater] = useState('66c46009f7cb8105efc508f2');
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(id);
            setFilm(data);
        };
        fetch();
    }, [id]);

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
            const data = await listShowTimeByDay(theater, date, id);
            setShowTimes(data);
        };
        fetch();
    }, [theater, date, id]);

    const handleSelect = async (index, date) => {
        setSelectDay(index);
        setDate(date);
    };
    console.log(showTimes);

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Chọn suất chiếu</h5>
            <h6 className="fw-bold" style={{ textTransform: 'uppercase' }}>
                Phim: <Name detail={detailFilm} id={id} />
            </h6>
            <Row className="mt-4">
                <Col xs={3}>
                    <ImageBase pathImg={film?.image} style={{ height: '200px', width: 'auto', borderRadius: '5px' }} />
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
                        {showTimes.map((item) => (
                            <span className={`time-mini mx-3 ${item.status !== statusShowTime[0] ? 'yes' : 'no'}`}>
                                {item.timeStart} - {item.timeEnd}
                            </span>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SelectShowTimePage;
