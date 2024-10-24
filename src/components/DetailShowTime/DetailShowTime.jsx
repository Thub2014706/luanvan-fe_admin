import React, { useEffect, useState } from 'react';
import AddShowTime from '../AddShowTime/AddShowTime';
import { Table } from 'react-bootstrap';
import { detailFilm } from '~/services/FilmService';
import { statusShowTime, typeShowTime } from '~/constants';
import { detailSchedule } from '~/services/ScheduleService';

const DetailShowTime = ({ props, theater, room, date, onAddSuccess }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [detailProps, setDetailProps] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await Promise.all(
                props.map(async (item) => {
                    const schedule = await detailSchedule(item.schedule);
                    const film = await detailFilm(schedule.film);
                    return { ...item, film: film.name };
                }),
            );
            setDetailProps(data);
            // console.log('dd', data);
        };
        fetch();
    }, [props]);

    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    let now = Date.now();
    console.log('e', detailProps);
    return (
        <div>
            <Table bordered>
                <thead>
                    <tr className="text-center">
                        <th style={{width: '490px'}}>Phim chiếu</th>
                        <th>Hình thức dịch</th>
                        <th>Thời gian chiếu</th>
                        <th>Loại suất chiếu</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {detailProps.length > 0 ? (
                        detailProps.map((item) => (
                            <tr key={item._id}>
                                <td>{item.film}</td>
                                <td className="text-center align-middle">{item.translate}</td>
                                <td className="text-center align-middle">
                                    <p className="time-show">
                                        {item.timeStart.slice(0, 5)} - {item.timeEnd.slice(0, 5)}
                                    </p>
                                </td>
                                <td className="text-center align-middle">
                                    <p className={`type-show ${item.type === typeShowTime[0] ? 'early' : 'okk'}`}>
                                        {item.type}
                                    </p>
                                </td>
                                <td className="text-center align-middle">
                                    <p
                                        className={`type-show 
                                            ${item.status === statusShowTime[0] ? 'okk' : ''}
                                            ${item.status === statusShowTime[1] ? 'early' : ''}
                                            ${item.status === statusShowTime[2] ? 'ing' : ''}
                                          `}
                                    >
                                        {item.status}
                                    </p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Chưa có lịch chiếu
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {new Date(date).getTime() >= new Date(now).setUTCHours(0, 0, 0, 0) && (
                <div className="button add" style={{ width: '130px' }} onClick={() => handleShowAdd()}>
                    Thêm suất chiếu
                </div>
            )}
            {date && (
                <AddShowTime
                    show={showAdd}
                    handleClose={handleCloseAdd}
                    dateAdd={date}
                    room={room}
                    theater={theater}
                    onAddSuccess={onAddSuccess}
                />
            )}
        </div>
    );
};

export default DetailShowTime;
