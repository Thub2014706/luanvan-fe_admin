import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allCombo, deleteCombo, statusCombo } from '~/services/ComboService';
import { detailFood } from '~/services/FoodService';

const ComboPage = () => {
    const navigate = useNavigate();
    const [combo, setCombo] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [search, setSearch] = useState('');
    const [numberPage, setNumberPage] = useState(5);
    const [nameFood, setNameFood] = useState({});
    const [action, setAction] = useState(false);

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleStatus = async (id) => {
        await statusCombo(id);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allCombo(search, number, numberPage);
            setCombo(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action]);

    useEffect(() => {
        const fetch = async () => {
            const data = combo.flatMap((item) => item.variants.flatMap((mini) => mini.food));

            const uniqueData = [...new Set(data)];
            const nameFoodMap = {};

            await Promise.all(
                uniqueData.map(async (id) => {
                    const food = await detailFood(id);
                    nameFoodMap[id] = food.name;
                }),
            );
            setNameFood(nameFoodMap);
        };

        if (combo.length > 0) {
            fetch();
        }
    }, [combo]);

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
        await deleteCombo(idDelete);
        handleCloseDelete();
    };

    const handleShowAdd = () => {
        navigate('/combo/add');
    };

    const handleNumberPage = (value) => {
        setNumberPage(value);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Combo</h5>
            <Row className="mb-3">
                <Col xs={6}>
                    <div className="button add" onClick={handleShowAdd}>
                        Thêm mới
                    </div>
                </Col>
                <Col xs={3}>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                <Col xs={3}>
                    <SearchBar handleSubmit={handleSearch} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Hình ảnh</th>
                            <th>TênCombo</th>
                            <th>Chi tiết</th>
                            <th>Giá tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combo.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">
                                    <ImageBase pathImg={item.image} style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td className="text-center align-middle">{item.name}</td>
                                <td className="text-center align-middle">
                                    {item.variants.map((com) => (
                                        <p>
                                            {nameFood[com.food]} x {com.quantity}
                                        </p>
                                    ))}
                                </td>
                                <td className="text-center align-middle">
                                    {item.price.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </td>
                                <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td>
                                <td className="text-center align-middle">
                                    <Link to={`/combo/update/${item._id}`}>
                                        <FontAwesomeIcon
                                            className="me-4"
                                            icon={faPenToSquare}
                                            color="green"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Link>
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

export default ComboPage;
