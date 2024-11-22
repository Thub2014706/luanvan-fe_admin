import { Html5QrcodeScanner } from 'html5-qrcode';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { statusTicket } from '~/constants';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { detailFilmBySchedule } from '~/services/FilmService';
import { detailOrderCombo } from '~/services/OrderComboService';
import { detailOrderTicket } from '~/services/OrderTicketService';
import { detailRoom } from '~/services/RoomService';
import { addScanTicket, testScanTicket } from '~/services/ScanTicketService';
import { detailSeat } from '~/services/SeatService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const ScanTicketPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const componentRef = useRef();

    const [showReader, setShowReader] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [orderTicket, setOrderTicket] = useState();
    const [orderCombo, setOrderCombo] = useState();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (showReader) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 500,
                    height: 250,
                },
                fps: 10,
            });

            const success = (result) => {
                setIdOrder(result);
            };

            const error = (err) => {
                console.log(err);
            };

            scanner.render(success, error);
        }
    }, [showReader]);

    useEffect(() => {
        const fetch = async () => {
            if (idOrder !== '') {
                const data1 = await detailOrderTicket(idOrder);
                const data2 = await detailOrderCombo(idOrder);
                if (data1) {
                    const showTime = await detailShowTimeById(data1.showTime);
                    const film = await detailFilmBySchedule(showTime.schedule);
                    const theater = await detailTheater(showTime.theater);
                    const room = await detailRoom(showTime.room);
                    const seats = await Promise.all(data1.seat.map(async (item) => await detailSeat(item)));
                    const test = await testScanTicket(data1._id, user?.accessToken, axiosJWT);
                    if (test.message === statusTicket[1]) {
                        await addScanTicket({ order: data1._id, type: 'OrderTicket' }, user?.accessToken, axiosJWT);
                    }
                    setOrderTicket({ data: data1, showTime, film, theater, room, seats, test });
                } else if (data2) {
                    const theater = await detailTheater(data2.theater);
                    const test = await testScanTicket(data2._id, user?.accessToken, axiosJWT);
                    if (test.message === statusTicket[1]) {
                        await addScanTicket({ order: data2._id, type: 'OrderCombo' }, user?.accessToken, axiosJWT);
                    }
                    setOrderCombo({ data: data2, theater, test });
                } else {
                    setOrderTicket();
                    setOrderCombo();
                }
            } else {
                setOrderTicket();
                setOrderCombo();
            }
        };
        fetch();
    }, [idOrder, user]);
    console.log(orderCombo);

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });

    return (
        <div className="p-4">
            <Row className="mb-4">
                <h5 className="fw-bold">Quét vé</h5>
            </Row>
            <div>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Phim</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={orderTicket ? orderTicket.film.name : ''}
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Phim"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Rạp</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={`${orderTicket ? orderTicket.theater.name : ''}${
                                    orderCombo ? orderCombo.theater.name : ''
                                }`}
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Rạp"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Phòng</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={orderTicket ? `${orderTicket.room.name} [${orderTicket.room.type}]` : ''}
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Phòng"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Ghế</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={
                                    orderTicket
                                        ? orderTicket.seats
                                              .map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`)
                                              .join(', ')
                                        : ''
                                }
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Ghế"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Suất chiếu</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={
                                    orderTicket
                                        ? `${moment(orderTicket.showTime.date).format('DD-MM-YYYY')} | ${
                                              orderTicket.showTime.timeStart
                                          } - ${orderTicket.showTime.timeEnd}`
                                        : ''
                                }
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Suất chiếu"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label className="fw-bold">Trạng thái</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                value={`${orderTicket ? orderTicket.test.message : ''}${
                                    orderCombo ? orderCombo.test.message : ''
                                }`}
                                onChange={(e) => setIdOrder(e.target.value)}
                                placeholder="Trạng thái"
                                style={{
                                    color:
                                        (orderTicket && orderTicket.test.message === statusTicket[0]) ||
                                        (orderCombo && orderCombo.test.message === statusTicket[0])
                                            ? 'red'
                                            : 'green',
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Form.Group>
                        <Form.Label className="fw-bold">Combo</Form.Label>
                        <Form.Control
                            disabled
                            type="text"
                            value={`${
                                orderTicket && orderTicket.data.combo.length > 0
                                    ? orderTicket.data.combo.map((item) => `${item.quantity} ${item.name}`)
                                    : ''
                            }${
                                orderCombo && orderCombo.data.combo.length > 0
                                    ? orderCombo.data.combo.map((item) => `${item.quantity} ${item.name}`)
                                    : ''
                            }`}
                            onChange={(e) => setIdOrder(e.target.value)}
                            placeholder="Combo"
                        />
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group>
                        <Form.Label className="fw-bold">Mã vé</Form.Label>
                        <Form.Control type="text" value={idOrder} onChange={(e) => setIdOrder(e.target.value)} />
                    </Form.Group>
                </Row>

                <div className="d-flex">
                    <Button
                        className="my-3"
                        onClick={() => {
                            setShowReader(!showReader);
                        }}
                    >
                        {showReader ? 'Ẩn máy quét' : 'Hiển thị máy quét'}
                    </Button>
                    {/* {order && order.test.message === statusTicket[1] && (
                        <>
                            <Button className="ms-3 my-3" onClick={handlePrint}>
                                In vé
                            </Button>
                            {idOrder !== '' && <BillTicket componentRef={componentRef} idOrder={idOrder} />}
                        </>
                    )} */}
                </div>
                {showReader && <div id="reader"></div>}
            </div>
        </div>
    );
};

export default ScanTicketPage;
