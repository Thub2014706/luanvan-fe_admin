import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddNews from '~/components/AddNews/AddNews';
import ImageBase from '~/components/ImageBase/ImageBase';
import ModalQuestion from '~/components/ModalQuestion/ModalQuestion';
import Name from '~/components/Name/Name';
import Pagination from '~/components/Pagination/Pagination';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allNews, deleteNews, statusNews } from '~/services/NewsService';
import { detailStaff } from '~/services/StaffService';

const NewsPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [news, setNews] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleStatus = async (id) => {
        await statusNews(id, user?.accessToken);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allNews(number, numberPage);
            setNews(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action, idDelete, numberPage, showAdd]);

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
        await deleteNews(idDelete, user?.accessToken);
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

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const convertToPlainText = (htmlContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Tin tức</h5>
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
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Tiêu đề</th>
                            <th>Hình ảnh</th>
                            <th>Nội dung</th>
                            <th>Nhân viên</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="align-middle">{item.title}</td>
                                <td className="text-center align-middle">
                                    <ImageBase
                                        pathImg={item.image}
                                        style={{ width: '80px', height: '100px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td className="text-center align-middle" style={{maxWidth: '400px'}}>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: convertToPlainText(truncateText(item.content, 200)),
                                        }}
                                    ></p>
                                </td>
                                <td className="align-content-center">
                                    <Name id={item.staff} detail={detailStaff} />
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
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>

            <AddNews show={showAdd} handleClose={handleCloseAdd} id={idUpdate} />
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

export default NewsPage;
