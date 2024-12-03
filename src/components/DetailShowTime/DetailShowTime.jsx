import React, { useEffect, useState } from 'react';
import AddShowTime from '../AddShowTime/AddShowTime';
import { Table } from 'react-bootstrap';
import { detailFilm } from '~/services/FilmService';
import { statusShowTime, typeShowTime } from '~/constants';
import { detailSchedule } from '~/services/ScheduleService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ModalQuestion from '../ModalQuestion/ModalQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { deleteShowTime } from '~/services/ShowTimeService';

const DetailShowTime = ({ props, theater, room, date, onAddSuccess }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [showAdd, setShowAdd] = useState(false);
    const [detailProps, setDetailProps] = useState([]);
    const [idDelete, setIdDelete] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

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

    const handleShowDelete = (id, name) => {
        setShowDelete(true);
        setIdDelete(id);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setIdDelete(null);
    };

    const handleDelete = async () => {
        await deleteShowTime(idDelete, user?.accessToken, axiosJWT);
        setDetailProps((prev) => prev.filter((item) => item._id !== idDelete));
        handleCloseDelete();
    };

    // console.log('e', detailProps);
    return (
        <div>
            <Table bordered>
                <thead>
                    <tr className="text-center">
                        <th style={{ width: '490px' }}>Phim chiếu</th>
                        <th>Hình thức dịch</th>
                        <th>Thời gian chiếu</th>
                        <th>Loại suất chiếu</th>
                        <th>Trạng thái</th>
                        {new Date(date).getTime() >= new Date(now).setUTCHours(0, 0, 0, 0) && <th>Thao tác</th>}
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
                                {new Date(date).getTime() >= new Date(now).setUTCHours(0, 0, 0, 0) && (
                                    <td className="text-center align-middle">
                                        {!(item.status === statusShowTime[0] || item.status === statusShowTime[1]) && (
                                            <FontAwesomeIcon
                                                color="red"
                                                onClick={() => handleShowDelete(item._id, item.name)}
                                                icon={faTrashCan}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
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
            {idDelete !== null && (
                <ModalQuestion
                    text={<span>Bạn có chắc muốn xóa suất chiếu này?</span>}
                    accept="Đồng ý"
                    cancel="Hủy"
                    show={showDelete}
                    handleAction={handleDelete}
                    handleClose={handleCloseDelete}
                />
            )}
        </div>
    );
};

export default DetailShowTime;
