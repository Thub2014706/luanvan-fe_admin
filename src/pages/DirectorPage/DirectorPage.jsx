import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Col, Row, Table } from 'react-bootstrap';
import ImageBase from '~/components/ImageBase/ImageBase';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import { allDirector, deleteDirector, statusDirector } from '~/services/DirectorService';
import { useDispatch, useSelector } from 'react-redux';
import AddDirector from '~/components/AddDirector/AddDirector';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';

const DirectorPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [directors, setDirectors] = useState([]);
    const [search, setSearch] = useState('');
    const [action, setAction] = useState(false);
    const [number, setNumber] = useState(1);
    const [numberPage, setNumberPage] = useState(5);
    const [length, setLength] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        const fetch = async () => {
            const data = await allDirector(search, number, numberPage);
            setDirectors(data.data);
            setLength(data.sumPage);
        };
        fetch();
    }, [number, idDelete, action, numberPage, search, showAdd]);

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    const handleStatus = async (id) => {
        await statusDirector(id, user?.accessToken, axiosJWT);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

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
        await deleteDirector(idDelete, user?.accessToken, axiosJWT);
        handleCloseDelete();
    };

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleShowAdd = (id) => {
        setIdUpdate(id);
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
        setIdUpdate(null);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Đạo diễn</h5>
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
                            <th>Avatar</th>
                            <th>Tên</th>
                            <th>Ngày sinh</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {directors.map((item, index) => (
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
                                        <Avatar name={item.name.charAt(0)} color="gray" size="50" round={true} />
                                    )}
                                </td>
                                <td className="text-center align-middle">{item.name}</td>
                                <td className="text-center align-middle">
                                    {item.birth && moment(item.birth).format('DD-MM-YYYY')}
                                </td>
                                <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td>
                                <td className="text-center align-middle">
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
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={length} selectNumber={handleNumber} currentPage={number} />
            </Row>

            <AddDirector show={showAdd} handleClose={handleCloseAdd} id={idUpdate} />
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

export default DirectorPage;
