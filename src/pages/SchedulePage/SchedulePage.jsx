import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AddSchedule from '~/components/AddSchedule/AddSchedule';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Name from '~/components/Name/Name';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import { statusShowTime } from '~/constants';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { detailFilm } from '~/services/FilmService';
import { allSchedule, deleteSchedule } from '~/services/ScheduleService';

const SchedulePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [schedule, setSchedule] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [search, setSearch] = useState('');
    const [numberPage, setNumberPage] = useState(5);
    const [showAdd, setShowAdd] = useState(false);
    const [idAdd, setIdAdd] = useState(null);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleNumber = (num) => {
        setNumber(num);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await allSchedule(search, number, numberPage);
            setSchedule(data.data);
            setSumPage(data.sumPage);
            console.log(data);
        };
        fetch();
    }, [number, idDelete, showAdd, numberPage, search]);

    const handleShowDelete = async (id, idFilm) => {
        setShowDelete(true);
        setIdDelete(id);
        const film = await detailFilm(idFilm);
        setNameDelete(film.name);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setIdDelete(null);
        setNameDelete(null);
    };

    const handleDelete = async () => {
        await deleteSchedule(idDelete, user?.accessToken, axiosJWT);
        handleCloseDelete();
    };

    const handleShowAdd = (id) => {
        setShowAdd(true);
        setIdAdd(id);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Lịch chiếu</h5>
                </Col>
                <Col>
                    <div className="button add float-end" onClick={() => handleShowAdd(null)}>
                        Thêm mới
                    </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                <Col>
                    <SearchBar handleSubmit={handleSearch} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Phim chiếu</th>
                            <th>Thời gian chiếu</th>
                            <th>Phân loại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">
                                    <Name id={item.film} detail={detailFilm} />
                                    {/* {item.film} */}
                                </td>
                                <td className="text-center align-middle">
                                    {moment(item.startDate).format('DD-MM-YYYY')} -{' '}
                                    {moment(item.endDate).format('DD-MM-YYYY')}
                                </td>
                                <td className="text-center align-middle">
                                    <p
                                        className={`type-show 
                                            ${item.type === statusShowTime[0] ? 'ing' : ''}
                                            ${item.type === statusShowTime[1] ? 'early' : ''}
                                            ${item.type === statusShowTime[2] ? 'okk' : ''}
                                          `}
                                    >
                                        {item.type}
                                    </p>
                                </td>

                                <td className="text-center align-middle">
                                    <FontAwesomeIcon
                                        color="red"
                                        onClick={() => handleShowDelete(item._id, item.film)}
                                        icon={faTrashCan}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>
            <AddSchedule show={showAdd} handleClose={handleCloseAdd} id={idAdd} />
            {idDelete !== null && (
                <ModalQuestion
                    text={
                        <span>
                            Bạn có chắc muốn xóa lịch chiếu <strong>{nameDelete}</strong>?
                        </span>
                    }
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

export default SchedulePage;
