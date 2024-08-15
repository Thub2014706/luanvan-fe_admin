import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Table } from 'react-bootstrap';
import QrUser from '~/components/QrUser/QrUser';
import SearchBar from '~/components/SearchBar/SearchBar';
import ShowPage from '~/components/ShowPage/ShowPage';
import ToggleSwitch from '~/components/ToggleSwitch/ToggleSwitch';
import { allUser } from '~/services/UserService';

const UserPage = () => {
    const [user, setUser] = useState([]);
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
        // await statususer(id);
        setAction(true);
    };

    useEffect(() => {
        setAction(false);
    }, [action]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allUser(search, number, numberPage);
            setUser(data.data);
            setSumPage(data.sumPage);
        };
        fetch();
    }, [number, action]);

    const handleNumberPage = (value) => {
        setNumberPage(value);
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
            <h5 className="mb-4 fw-bold">Thức ăn</h5>
            <Row className="mb-3">
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
                            <th>Tên</th>
                            <th>E-mail</th>
                            <th>Số điện thoại</th>
                            <th>Mã vạch</th>
                            {/* <th>Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">{item.isername}</td>
                                <td className="text-center align-middle">{item.email}</td>
                                <td className="text-center align-middle">{item.phone}</td>
                                <td>
                                    <FontAwesomeIcon
                                        className="me-4"
                                        icon={faPenToSquare}
                                        color="green"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleShowQr(item.qrCode)}
                                    />
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
