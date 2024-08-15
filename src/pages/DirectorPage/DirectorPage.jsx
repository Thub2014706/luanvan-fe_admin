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
import { allDirector, deleteDirector } from '~/services/DirectorService';
import { Link, useNavigate } from 'react-router-dom';

const DirectorPage = () => {
    const navigate = useNavigate();
    const [directors, setDirectors] = useState([]);
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState(1);
    const [numberPage, setNumberPage] = useState(5);
    const [length, setLength] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await allDirector(search, number, numberPage);
            setDirectors(data.data);
            setLength(data.sumPage);
        };
        fetch();
    }, [number]);

    const handleNumberPage = (value) => {
        setNumberPage(value);
    };

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
        await deleteDirector(idDelete);
        handleCloseDelete();
    };

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleShowAdd = () => {
        navigate('/director/add');
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Đạo diễn</h5>
            <Row className="mb-3">
                <Col xs={6}>
                    <div className="button add" onClick={handleShowAdd}>
                        {/* <FontAwesomeIcon icon={faPlus} className='me-1' /> */}
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
                            <th>Avatar</th>
                            <th>Tên</th>
                            <th>Ngày sinh</th>
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
                                        <Avatar name={item.name} size="50" round={true} />
                                    )}
                                </td>
                                <td className="text-center align-middle">{item.name}</td>
                                <td className="text-center align-middle">{moment(item.birth).format('DD-MM-YYYY')}</td>
                                <td className="text-center align-middle">
                                    <Link to={`/director/update/${item._id}`}>
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
                <Pagination length={length} selectNumber={handleNumber} currentPage={number} />
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

export default DirectorPage;
