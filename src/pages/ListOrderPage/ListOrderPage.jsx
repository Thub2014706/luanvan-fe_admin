import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BarCode from '~/components/BarCode/BarCode';
import DetailOrder from '~/components/DetailOrder/DetailOrder';
import Pagination from '~/components/Pagination/Pagination';
import SearchOrder from '~/components/SearchOrder/SearchOrder';
import ShowPage from '~/components/ShowPage/ShowPage';
import { allOrderTicket, exportOrderTicket } from '~/services/OrderTicketService';

const ListOrderPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [order, setOrder] = useState([]);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [numberPage, setNumberPage] = useState(5);
    const [idShow, setIdShow] = useState(null);
    const [theater, setTheater] = useState([]);
    const [show, setShow] = useState(false);

    const handleNumber = (num) => {
        setNumber(num);
    };

    useEffect(() => {
        const fetch = async () => {
            const data1 = await allOrderTicket(user?.data.theater ? user?.data.theater : theater, number, numberPage);
            setOrder(data1.data);
            setSumPage(data1.sumPage);
        };
        fetch();
    }, [number, numberPage, user, theater]);

    const handleSearchAll = async (value) => {
        setTheater(value);
        setNumber(1);
    };

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    const handlExport = async () => {
        try {
            await exportOrderTicket(theater);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowDetail = (item) => {
        setIdShow(item)
        setShow(true)
    }

    const handleCloseDetail = () => {
        setIdShow(null)
        setShow(false)
    }

    return (
        <div className="p-4" style={{ overflowX: 'auto', minWidth: '100%' }}>
            <h5 className="mb-4 fw-bold">Danh sách vé</h5>
            <Row className="mt-4">
                <Col xs="auto">
                    <SearchOrder handleSearchAll={handleSearchAll} />
                </Col>
                <Col>
                    <div className="button add" style={{ width: '120px' }} onClick={handlExport}>
                        Xuất báo cáo
                    </div>
                </Col>
            </Row>
            <Row className="my-3">
                <Col xs={3}>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
            </Row>
            <Row className="my-3">
                <Table responsive striped bordered hover style={{ minWidth: '1500px' }}>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Mã vé</th>
                            <th>Tên phim</th>
                            <th>Rạp chiếu</th>
                            <th>Phòng chiếu</th>
                            <th>Ghế</th>
                            <th>Suất chiếu</th>
                            <th>Combo</th>
                            <th>Tổng tiền</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td>{index + 1}</td>
                                <td>{item.idOrder}</td>
                                <td>{item.showTime && item.showTime.schedule.film.name}</td>
                                <td>{item.showTime ? item.showTime.theater.name : item.theater.name}</td>
                                <td>{item.showTime && item.showTime.room.name}</td>
                                <td>
                                    {item.seat &&
                                        item.seat.map((mini, index) => (
                                            <>
                                                {String.fromCharCode(64 + mini.row)}{mini.col}
                                                {index + 1 < item.seat.length && ', '}
                                            </>
                                        ))}
                                </td>
                                <td>
                                    {item.showTime && (
                                        <span>
                                            <span className="type-show ing">
                                                {item.showTime.timeStart} - {item.showTime.timeEnd}
                                            </span>{' '}
                                            <span className="type-show okk ms-2">
                                                {moment(item.showTime.date).format('DD-MM-YYYY')}
                                            </span>
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {item.combo.length > 0 &&
                                        item.combo.map((mini) => (
                                            <span>
                                                {mini.name} x {mini.quantity}
                                                <br />
                                            </span>
                                        ))}
                                </td>
                                <td>{(item.price + (item.usePoint ? item.usePoint : 0)).toLocaleString('it-IT')}đ</td>
                                <td className='d-flex justify-content-center'>
                                    <div
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: 'rgb(115, 163, 212)',
                                            width: '23px',
                                            height: '23px',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleShowDetail(item)}
                                    >
                                        <FontAwesomeIcon icon={faInfo} color='white' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>
            {idShow !== null && <DetailOrder show={show} handleClose={handleCloseDetail} item={idShow} />}
        </div>
    );
};

export default ListOrderPage;
