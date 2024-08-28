import React, { useEffect, useState } from 'react';
import ScheduleMini from '../ScheduleMini/ScheduleMini';
import { listShowTimeByDay } from '~/services/ShowTimeService';
import moment from 'moment';
import { nameDay, statusShowTime } from '~/constants';

const SelectShowTime = ({ id, theater, handleNext }) => {
    const [selectDay, setSelectDay] = useState(0);
    const [date, setDate] = useState(moment(Date()).format('YYYY-MM-DD'));
    const [showTimes, setShowTimes] = useState([]);
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [war, setWar] = useState('');

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
    // console.log(showTimes);

    const handleSubmit = () => {
        if (timeStart !== null) {
            handleNext(date, timeStart, timeEnd);
        } else {
            setWar('Vui lòng chọn suất chiếu!');
        }
    };

    const handleTime = (start, end) => {
        if (timeStart !== start) {
            setTimeStart(start);
            setTimeEnd(end);
            setWar('')
        } else {
            setTimeStart(null);
            setTimeEnd(null);
        }
    };

    return (
        <>
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
                        {showTimes.map((item) => (
                            <span
                                style={{ display: 'inline-block' }}
                                onClick={() =>
                                    item.status === statusShowTime[2] && handleTime(item.timeStart, item.timeEnd)
                                }
                                className={`time-mini me-3 mb-3 ${
                                    item.status === statusShowTime[2]
                                        ? `yes ${item.timeStart === timeStart ? 'select' : ''}`
                                        : 'no'
                                }`}
                            >
                                {item.timeStart} - {item.timeEnd}
                            </span>
                        ))}
                        <p style={{ color: 'red', position: 'absolute' }}>{war}</p>
                    </>
                ) : (
                    <p>Chưa có suất chiếu nào!</p>
                )}
                <div className="mt-5 button add float-end" onClick={handleSubmit}>
                    Tiếp theo
                </div>
            </div>
        </>
    );
};

export default SelectShowTime;
