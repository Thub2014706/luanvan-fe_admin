import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Row, Table } from 'react-bootstrap';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCouch, faPenToSquare, faTableCells, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ModalQuestion from '../../components/ModalQuestion/ModalQuestion';
import { allRoom, deleteRoom, statusRoom } from '~/services/RoomService';
import AddRoom from '../../components/AddRoom/AddRoom';
import SeatGrid from '../../components/SeatGrid/SeatGrid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';

const RoomPage = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [room, setRoom] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [action, setAction] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);
    const [showSeat, setShowSeat] = useState(false);
    const [idRoomSeat, setIdRoomSeat] = useState(null);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleStatus = async (id) => {
        await statusRoom(id, user?.accessToken, axiosJWT);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    const handleShowDelete = (id, name) => {
        setShowDelete(true);
        setIdDelete(id);
        setNameDelete(name);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setIdDelete(null);
        setNameDelete(null);
    };

    const handleDelete = async () => {
        await deleteRoom(idDelete, user?.accessToken, axiosJWT);
        handleCloseDelete();
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await allRoom(id);
            setRoom(data);
        };
        fetch();
    }, [action, room, id]);

    const handleShowAdd = (id) => {
        setShowAdd(true);
        setIdUpdate(id);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
        setIdUpdate(null);
    };

    const handleShowSeat = (id) => {
        setShowSeat(true);
        setIdRoomSeat(id);
    };

    const handleCloseSeat = () => {
        setShowSeat(false);
        setIdRoomSeat(null);
    };

    return (
        <div className="p-4">
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => window.history.back()}>Danh sách rạp</Breadcrumb.Item>
                <Breadcrumb.Item active>Danh sách phòng chiếu</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Danh sách phòng chiếu</h5>
                </Col>
                <Col>
                    <div className="button add float-end" onClick={() => handleShowAdd(null)}>
                        Thêm mới
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Loại phòng chiếu</th>
                            <th>Số hàng</th>
                            <th>Số cột</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {room.length > 0 ? (
                            room.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="text-center align-middle">{index + 1}</td>
                                    <td className="text-center align-middle">{item.name}</td>
                                    <td className="text-center align-middle">{item.type}</td>
                                    <td className="text-center align-middle">
                                        {item.numRow} (A <FontAwesomeIcon icon={faArrowRight} />{' '}
                                        {String.fromCharCode(64 + item.numRow)})
                                    </td>
                                    <td className="text-center align-middle">
                                        {item.numCol} (1 <FontAwesomeIcon icon={faArrowRight} /> {item.numCol})
                                    </td>
                                    <td className="align-content-center">
                                        <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                    </td>
                                    <td className="text-center align-middle">
                                        <FontAwesomeIcon
                                            icon={faCouch}
                                            className="me-4"
                                            color="rgb(164, 156, 11)"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleShowSeat(item._id)}
                                        />
                                        <FontAwesomeIcon
                                            className="me-4"
                                            icon={faPenToSquare}
                                            color="green"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleShowAdd(item._id)}
                                        />
                                        <FontAwesomeIcon
                                            color="red"
                                            onClick={() => handleShowDelete(item._id, item.name)}
                                            icon={faTrashCan}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    Chưa có phòng chiếu nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            <AddRoom show={showAdd} handleClose={handleCloseAdd} id={idUpdate} idTheater={id} />
            {idRoomSeat !== null && <SeatGrid show={showSeat} handleClose={handleCloseSeat} idRoom={idRoomSeat} />}
            {idDelete !== null && (
                <ModalQuestion
                    text={
                        <span>
                            Bạn có chắc muốn xóa <strong>{nameDelete}</strong>?
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

export default RoomPage;
