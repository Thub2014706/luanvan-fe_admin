import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BarCode from '~/components/BarCode/BarCode';
import Name from '~/components/Name/Name';
import NameSeat from '~/components/NameSeat/NameSeat';
import Pagination from '~/components/Pagination/Pagination';
import SearchOrder from '~/components/SearchOrder/SearchOrder';
import ShowPage from '~/components/ShowPage/ShowPage';
import { detailCombo } from '~/services/ComboService';
import { detailFilm } from '~/services/FilmService';
import { detailFood } from '~/services/FoodService';
import { allOrderTicket } from '~/services/OrderTicketService';
import { detailRoom } from '~/services/RoomService';
import { detailSchedule } from '~/services/ScheduleService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailStaff } from '~/services/StaffService';
import { detailTheater } from '~/services/TheaterService';
import { detailUserById } from '~/services/UserService';

const ListOrderPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [order, setOrder] = useState([]);
    const [number, setNumber] = useState(1);
    const [sumPage, setSumPage] = useState(0);
    const [numberPage, setNumberPage] = useState(5);
    const [idShow, setIdShow] = useState(null);
    const [theater, setTheater] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = (id) => {
        setIdShow(id);
        setShow(true);
    };

    const handleClose = () => {
        setIdShow(null);
        setShow(false);
    };

    console.log(order);

    const handleNumber = (num) => {
        setNumber(num);
    };

    useEffect(() => {
        const fetch = async () => {
            const data1 = await allOrderTicket(user?.data.theater ? user?.data.theater : theater, number, numberPage);
            const detail = await Promise.all(
                data1.data.map(async (item) => {
                    const comboFood = await Promise.all(
                        item.combo.map(async (mini) => {
                            const data = (await detailCombo(mini.id)) || (await detailFood(mini.id));
                            return {
                                data,
                                quantity: mini.quantity,
                            };
                        }),
                    );
                    if (item.showTime) {
                        const showTime = await detailShowTimeById(item.showTime);
                        const schedule = await detailSchedule(showTime.schedule)
                        const film = await detailFilm(schedule.film);
                        const theater = await detailTheater(showTime.theater);
                        const room = await detailRoom(showTime.room);
                        const timeStart = showTime.timeStart;
                        const timeEnd = showTime.timeEnd;
                        const date = showTime.date;
                        return { ...item, film, theater, room, timeStart, timeEnd, date, comboFood };
                    } else return { ...item, comboFood };
                }),
            );
            setOrder(detail);
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

    return (
        <div className="p-4" style={{ overflowX: 'auto', minWidth: '100%' }}>
            <h5 className="mb-4 fw-bold">Danh sách vé</h5>
            <Row className="mt-4">
                <SearchOrder handleSearchAll={handleSearchAll} />
            </Row>
            <Row className="my-3">
                <Col xs={3}>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                {/* <Col xs={3}>
                    <SearchBar handleSubmit={handleSearch} />
                </Col> */}
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
                            <th>Thành viên</th>
                            <th>Nhân viên bán</th>
                            <th>Mã vạch</th>
                            <th>Thời gian đặt vé</th>
                            <th>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => (
                            <tr key={item._id} className="text-center">
                                <td>{index + 1}</td>
                                <td>{item.idOrder}</td>
                                <td>{item.showTime && item.film.name}</td>
                                <td>{item.showTime && item.theater.name}</td>
                                <td>{item.showTime && item.room.name}</td>
                                <td>
                                    {item.showTime &&
                                        item.seat.map((mini, index) => (
                                            <>
                                                <NameSeat id={mini} />
                                                {index + 1 < item.seat.length && ', '}
                                            </>
                                        ))}
                                </td>
                                <td>
                                    {item.showTime && (
                                        <span>
                                            <span className="type-show ing">
                                                {item.timeStart} - {item.timeEnd}
                                            </span>{' '}
                                            <span className="type-show okk ms-2">
                                                {moment(item.date).format('DD-MM-YYYY')}
                                            </span>
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {item.comboFood.length > 0 &&
                                        item.comboFood.map((mini) => (
                                            <span>
                                                {mini.data.name} x {mini.quantity}
                                                <br />
                                            </span>
                                        ))}
                                </td>
                                <td>
                                    {item.member && (
                                        <Name id={item.member} detail={detailUserById} />
                                    )}
                                </td>
                                <td>
                                    <Name id={item.staff} detail={detailStaff} />
                                </td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faBarcode}
                                        onClick={() => handleShow(item.idOrder)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td>{moment(item.createdAt).format('HH:mm:ss DD-MM-YYYY')}</td>
                                <td>{(item.price + (item.usePoint ? item.usePoint : 0)).toLocaleString('it-IT')}đ</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row>
            {idShow !== null && <BarCode show={show} handleClose={handleClose} id={idShow} />}
        </div>
    );
};

export default ListOrderPage;
