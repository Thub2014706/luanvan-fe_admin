import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AddStaff from '~/components/AddStaff/AddStaff';
import AllAccess from '~/components/AllAccess/AllAccess';
import ImageBase from '~/components/ImageBase/ImageBase';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { allStaff, deleteStaff, statusStaff } from '~/services/StaffService';

const StaffPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [staff, setStaff] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [search, setSearch] = useState('');
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showAccess, setShowAccess] = useState(false);
    const [idAccess, setIdAccess] = useState(null);
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleStatus = async (id) => {
        await statusStaff(id, user?.accessToken, axiosJWT);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allStaff(search, number, numberPage);
            setStaff(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action, idDelete, showAdd, numberPage, search]);

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
        await deleteStaff(idDelete, user?.accessToken, axiosJWT);
        handleCloseDelete();
    };

    const handleShowAdd = () => {
        setShowAdd(true);
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

    const handleShowAccess = (id) => {
        setShowAccess(true);
        setIdAccess(id);
    };

    const handleCloseAccess = () => {
        setShowAccess(false);
        setIdAccess(null);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Tài khoản nhân viên</h5>
                </Col>
                <Col>
                    <div className="button add float-end" onClick={handleShowAdd}>
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
                            <th>Avatar</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                            <th>Quyền truy cập</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">
                                    {item.avatar ? (
                                        <ImageBase
                                            pathImg={item.avatar}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <Avatar name={item.username} size="50" round={true} color="gray" />
                                    )}
                                </td>
                                <td className="text-center align-middle">{item.username}</td>
                                <td className="text-center align-middle">{item.email}</td>
                                <td className="text-center align-middle">{item.phone}</td>
                                <td className="text-center align-middle">{item.role === 0 ? 'Admin' : 'Nhân viên'}</td>
                                <td
                                    className="text-center align-middle"
                                    style={{ color: item.role !== 0 ? 'red' : 'rgb(255, 133, 133)' }}
                                >
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => item.role !== 0 && handleShowAccess(item._id)}
                                    >
                                        Quyền truy cập{' '}
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            color="red"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </span>
                                </td>
                                <td className="align-content-center">
                                    <ToggleSwitch
                                        status={item.status}
                                        handleClick={() => item.role !== 0 && handleStatus(item._id)}
                                        none={item.role === 0}
                                    />
                                </td>
                                <td className="text-center align-middle">
                                    <FontAwesomeIcon
                                        color={item.role !== 0 ? 'red' : 'rgb(255, 133, 133)'}
                                        onClick={() => handleShowDelete(item._id, item.username)}
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

            <AddStaff show={showAdd} handleClose={handleCloseAdd} />
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

            {idAccess !== null && <AllAccess show={showAccess} handleClose={handleCloseAccess} id={idAccess} />}
        </div>
    );
};

export default StaffPage;
