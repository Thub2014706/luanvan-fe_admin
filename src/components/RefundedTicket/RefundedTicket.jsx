import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import ShowPage from '../ShowPage/ShowPage';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';
import DetailOrder from '../DetailOrder/DetailOrder';
import { useSelector } from 'react-redux';
import { allOrderTicketRefund, exportTicketRefund } from '~/services/TicketRefundService';

const RefundedTicket = ({ theater, number, setNumber }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [order, setOrder] = useState([]);
    const [sumPage, setSumPage] = useState(0);
    const [numberPage, setNumberPage] = useState(5);
    const [idShow, setIdShow] = useState(null);
    const [show, setShow] = useState(false);

    const handleNumber = (num) => {
        setNumber(num);
    };

    useEffect(() => {
        const fetch = async () => {
            const data1 = await allOrderTicketRefund(
                user?.data.theater ? user?.data.theater : theater,
                number,
                numberPage,
            );
            setOrder(data1.data);
            setSumPage(data1.sumPage);
        };
        fetch();
    }, [number, numberPage, user, theater]);

    const handleNumberPage = (value) => {
        setNumberPage(value);
        setNumber(1);
    };

    const handlExport = async () => {
        try {
            await exportTicketRefund(theater);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowDetail = (item) => {
        setIdShow(item);
        setShow(true);
    };

    const handleCloseDetail = () => {
        setIdShow(null);
        setShow(false);
    };

    console.log(order);

    return (
        <div>
            <Row className="mb-3 mt-5">
                <Col xs={3}>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                <Col>
                    <div className="button add float-end" style={{ width: '120px' }} onClick={handlExport}>
                        Tải xuống Excel
                    </div>
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
                                <td>{item.order.idOrder}</td>
                                <td>{item.order.showTime && item.order.showTime.schedule.film.name}</td>
                                <td>{item.order.showTime && item.order.showTime.theater.name}</td>
                                <td>{item.order.showTime && item.order.showTime.room.name}</td>
                                <td>
                                    {item.order.seat &&
                                        item.order.seat.map((mini, index) => (
                                            <>
                                                {String.fromCharCode(64 + mini.row)}
                                                {mini.col}
                                                {index + 1 < item.order.seat.length && ', '}
                                            </>
                                        ))}
                                </td>
                                <td>
                                    {item.order.showTime && (
                                        <span>
                                            <span className="type-show ing">
                                                {item.order.showTime.timeStart} - {item.order.showTime.timeEnd}
                                            </span>{' '}
                                            <span className="type-show okk ms-2">
                                                {moment(item.order.showTime.date).format('DD-MM-YYYY')}
                                            </span>
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {item.order.combo.length > 0 &&
                                        item.order.combo.map((mini) => (
                                            <span>
                                                {mini.name} x {mini.quantity}
                                                <br />
                                            </span>
                                        ))}
                                </td>
                                <td>
                                    {(
                                        item.order.price + (item.order.usePoint ? item.order.usePoint : 0)
                                    ).toLocaleString('it-IT')}
                                    đ
                                </td>
                                <td className="text-center align-middle">
                                    <FontAwesomeIcon
                                        onClick={() => handleShowDetail(item.order)}
                                        icon={faCircleInfo}
                                        color="rgb(115, 163, 212)"
                                        style={{ cursor: 'pointer' }}
                                        size="lg"
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
            {idShow !== null && <DetailOrder show={show} handleClose={handleCloseDetail} item={idShow} refund={true} />}
        </div>
    );
};

export default RefundedTicket;
