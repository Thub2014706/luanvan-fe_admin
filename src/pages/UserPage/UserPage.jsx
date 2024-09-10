import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ImageBase from '~/components/ImageBase/ImageBase';
import Pagination from '~/components/Pagination/Pagination';
import QrUser from '~/components/QrUser/QrUser';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allUser, statusUser } from '~/services/UserService';

const UserPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [users, setUsers] = useState([]);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [search, setSearch] = useState('');
    const [numberPage, setNumberPage] = useState(5);
    const [action, setAction] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [qrCode, setQrCode] = useState(null);

    const handleNumber = (num) => {
        setNumber(num);
    };

    const handleStatus = async (id) => {
        await statusUser(id, user?.accessToken);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allUser(search, number, numberPage);
            setUsers(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action, numberPage, search]);

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setNumber(1);
    };

    const handleShowQr = (qr) => {
        setShowQr(true);
        setQrCode(qr);
    };

    const handleCloseQr = () => {
        setShowQr(false);
        setQrCode(null);
    };

    return (
        <div className="p-4">
            <Row className="mb-4">
                <Col>
                    <h5 className="fw-bold">Tài khoản người dùng</h5>
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
                            <th>E-mail</th>
                            <th>Số điện thoại</th>
                            <th>Mã QR</th>
                            <th>Trạng thái</th>
                            <th>Điểm</th>
                            <th>Ngày tạo</th>
                            {/* <th>Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => (
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
                                        <Avatar name={item.username.charAt(0)} size="50" round={true} color="gray" />
                                    )}
                                </td>
                                <td className="text-center align-middle">{item.username}</td>
                                <td className="text-center align-middle">{item.email}</td>
                                <td className="text-center align-middle">{item.phone}</td>
                                <td className="text-center align-middle">
                                    <FontAwesomeIcon
                                        icon={faQrcode}
                                        // color="gray"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleShowQr(item.qrCode)}
                                    />
                                </td>
                                <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td>
                                <td className="text-center align-middle">{item.point}</td>
                                <td className="text-center align-middle">
                                    {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                                </td>
                                {/* <td className="align-content-center">
                                    <ToggleSwitch status={item.status} handleClick={() => handleStatus(item._id)} />
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>

            <QrUser show={showQr} handleClose={handleCloseQr} img={qrCode} />
        </div>
    );
};

export default UserPage;
