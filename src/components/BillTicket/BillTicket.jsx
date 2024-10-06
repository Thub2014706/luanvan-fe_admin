import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signAge, standardAge } from '~/constants';
import { detailCombo } from '~/services/ComboService';
import { detailFilm } from '~/services/FilmService';
import { detailOrderTicket } from '~/services/OrderTicketService';
import { detailRoom } from '~/services/RoomService';
import { detailSeat } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';
import Name from '../Name/Name';
import { detailStaff } from '~/services/StaffService';
import moment from 'moment';
import Barcode from 'react-barcode';
import { detailSchedule } from '~/services/ScheduleService';
import { Col, Row } from 'react-bootstrap';
import { detailFood } from '~/services/FoodService';

const BillTicket = ({ componentRef }) => {
    const dispatch = useDispatch();
    const idOrder = useSelector((state) => state.showTime.idOrder);
    const [order, setOrder] = useState(null);
    const [showTime, setShowTime] = useState(null);
    const [theater, setTheater] = useState(null);
    const [room, setRoom] = useState(null);
    const [seats, setSeats] = useState([]);
    const [film, setFilm] = useState(null);
    const [combo, setCombo] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (idOrder !== null) {
                const data1 = await detailOrderTicket(idOrder);
                setOrder(data1);
                // console.log(data1);
                const data2 = await detailShowTimeById(data1.showTime);
                setShowTime(data2);
                const data3 = await detailTheater(data2.theater);
                setTheater(data3);
                const data4 = await detailRoom(data2.room);
                setRoom(data4);
                const data5 = await Promise.all(data1.seat.map(async (item) => await detailSeat(item)));
                setSeats(data5);
                const data8 = await detailSchedule(data2.schedule);
                const data6 = await detailFilm(data8.film);
                setFilm(data6);
                const data7 = await Promise.all(
                    data1.combo.map(async (item) => {
                        const data = (await detailCombo(item.id)) || (await detailFood(item.id));
                        return {
                            data,
                            quantity: item.quantity,
                        };
                    }),
                );
                setCombo(data7);
            }
        };
        fetch();
    }, [idOrder, dispatch]);

    return (
        <div>
            <div style={{ display: 'none' }}>
                <div
                    ref={componentRef}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{
                        margin: 'auto',
                        padding: '30px',
                        fontFamily: 'Courier New, monospace',
                        width: '400px',
                        // height: '700px',
                    }}
                >
                    <h4 className="fw-bold text-center">
                        THE VAO
                        <br /> PHONG CHIEU PHIM
                    </h4>
                    {order !== null &&
                        showTime !== null &&
                        theater !== null &&
                        room !== null &&
                        seats.length !== 0 &&
                        film !== null && (
                            <div>
                                <p className="fw-bold">
                                    {theater.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                </p>
                                <p>
                                    {theater.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
                                    {theater.ward.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
                                    {theater.district.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
                                    {theater.province.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                </p>
                                <p>
                                    Nhan vien:{' '}
                                    <Name
                                        id={order.staff.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                        detail={detailStaff}
                                    />
                                </p>
                                <p>==========================================</p>
                                <p>
                                    <span className="fw-bold fs-4 me-1">
                                        {film.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}{' '}
                                    </span>
                                    <span>
                                        [{standardAge.map((item, index) => item === film.age && signAge[index])}]
                                    </span>
                                </p>
                                <p>
                                    {/* Thoi gian: */}
                                    <span>{moment(showTime.date).format('DD/MM/YYYY')}</span>
                                    <span className="ms-5">
                                        {showTime.timeStart} - {showTime.timeEnd}
                                    </span>
                                </p>
                                <p>
                                    <span className="me-5 fw-bold">
                                        {room.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                    </span>
                                    <span className="fw-bold">
                                        {seats
                                            ?.map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`)
                                            .join(', ')}
                                    </span>
                                    <span className="ms-5">
                                        {seats[0].type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                    </span>
                                </p>
                                {combo.length > 0 && (
                                    <>
                                        <p>------------------------------------------</p>
                                        <p>
                                            Combo:
                                            {combo.map((item) => (
                                                <p className="text-end fw-bold">
                                                    <span className="ms-5">{item.data.name}</span>
                                                    <span className="ms-5">x {item.quantity}</span>
                                                </p>
                                            ))}
                                        </p>
                                    </>
                                )}
                                <p>==========================================</p>
                                {order.usePoint > 0 && (
                                    <>
                                        <Row className="fs-5">
                                            <Col xs={6}>
                                                <span className="float-end">Tong</span>
                                            </Col>
                                            <Col xs={2}>
                                                <span className="float-end">VND</span>
                                            </Col>
                                            <Col xs={4}>
                                                <span className="float-end">
                                                    {(order.price + order.usePoint).toLocaleString('it-IT')}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="fs-5">
                                            <Col xs={6}>
                                                <span className="float-end">Diem thanh toan</span>
                                            </Col>
                                            <Col xs={2}>
                                                <span className="float-end">VND</span>
                                            </Col>
                                            <Col xs={4}>
                                                <span className="float-end">
                                                    -{order.usePoint.toLocaleString('it-IT')}
                                                </span>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                                <Row className="fw-bold fs-5">
                                    <Col xs={6}>
                                        <span className="float-end">Tong thanh toan</span>
                                    </Col>
                                    <Col xs={2}>
                                        <span className="float-end">VND</span>
                                    </Col>
                                    <Col xs={4}>
                                        <span className="float-end">{order.price.toLocaleString('it-IT')}</span>
                                    </Col>
                                </Row>
                                <div className="justify-content-center d-flex">
                                    <Barcode
                                        value={order.idOrder}
                                        height={50}
                                        width={1}
                                        fontSize={10}
                                        fontOptions="Courier New, monospace"
                                    />
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default BillTicket;
