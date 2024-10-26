import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddDiscount from '~/components/AddDiscount/AddDiscount';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allDiscount, deleteDiscount, statusDiscount } from '~/services/DiscountService';

const DiscountPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [discount, setDiscount] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [search, setSearch] = useState('');
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);

    const handleNumber = (num) => {
        setNumber(num);
    };

    // const handleStatus = async (id) => {
    //     await statusDiscount(id, user?.accessToken);
    //     setAction(true);
    // };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allDiscount(search, number, numberPage);
            setDiscount(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action, idDelete, numberPage, search, showAdd]);

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
        await deleteDiscount(idDelete, user?.accessToken);
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

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Mã khuyến mãi</h5>
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
                            <th>Tên</th>
                            <th>Mã</th>
                            <th>Phần trăm</th>
                            <th>Số lượng</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            {/* <th>Trạng thái</th> */}
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discount.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">{item.name}</td>
                                <td className="text-center align-middle">{item.code}</td>
                                <td className="text-center align-middle">{item.percent}%</td>
                                <td className="text-center align-middle">{item.quantity}</td>
                                <td className="text-center align-middle">{moment(item.startDate).format('DD-MM-YYYY')}</td>
                                <td className="text-center align-middle">{moment(item.endDate).format('DD-MM-YYYY')}</td>
                                {/* <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td> */}
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
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>
            <AddDiscount show={showAdd} handleClose={handleCloseAdd} id={idUpdate} />

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

export default DiscountPage;
