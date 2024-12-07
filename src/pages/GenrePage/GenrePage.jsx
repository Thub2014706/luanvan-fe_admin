import { faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import AddGenre from '~/components/AddGenre/AddGenre';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import { allGenre, deleteGenre, statusGenre } from '~/services/GenreService';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';

const GenrePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [genre, setGenre] = useState([]);
    const [length, setLength] = useState(0);
    const [number, setNumber] = useState(1);
    const [search, setSearch] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [numberPage, setNumberPage] = useState(5);
    const dispatch = useDispatch()
    const [action, setAction] = useState(false);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    const handleStatus = async (id) => {
        await statusGenre(id, user?.accessToken, axiosJWT);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allGenre(search, number, numberPage);
            setGenre(data.data);
            setLength(data.length);
        };
        fetch();
    }, [idDelete, showAdd, action, search, number, numberPage]);

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
        await deleteGenre(idDelete, user?.accessToken, axiosJWT);
        handleCloseDelete();
    };

    const handleShowAdd = (id) => {
        setIdUpdate(id);
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
        setIdUpdate(null);
    };

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Thể loại phim</h5>
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
                            <th>Thể loại</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genre.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{item.name}</td>
                                <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td>
                                <td className="text-center">
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

            <AddGenre show={showAdd} handleClose={handleCloseAdd} id={idUpdate} />
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

export default GenrePage;
