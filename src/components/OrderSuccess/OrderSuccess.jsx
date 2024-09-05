import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { removeAll, stepNext } from '~/features/showTime/showTimeSlice';
import ImageBase from '../ImageBase/ImageBase';
import { detailOrderTicket } from '~/services/OrderTicketService';
import Barcode from 'react-barcode';
import Name from '../Name/Name';
import { detailTheater } from '~/services/TheaterService';
import { detailShowTimeById } from '~/services/ShowTimeService';
import { detailFilm } from '~/services/FilmService';
import { detailStaff } from '~/services/StaffService';
import moment from 'moment';
import { detailRoom } from '~/services/RoomService';
import { detailSeat } from '~/services/SeatService';
import { signAge, standardAge } from '~/constants';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // dispatch(stepNext(4))
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const idOrder = useSelector((state) => state.showTime.idOrder);
    const [order, setOrder] = useState(null);
    const [showTime, setShowTime] = useState(null);
    const [theater, setTheater] = useState(null);
    const [room, setRoom] = useState(null);
    const [seats, setSeats] = useState([]);
    const [film, setFilm] = useState(null);
    
    useEffect(() => {
        const fetch = async () => {
            const data1 = await detailOrderTicket(idOrder);
            setOrder(data1);
            console.log(data1)
            const data2 = await detailShowTimeById(data1.showTime);
            setShowTime(data2);
            const data3 = await detailTheater(data2.theater);
            setTheater(data3);
            const data4 = await detailRoom(data2.room);
            setRoom(data4);
            const data5 = await Promise.all(data1.seat.map(async (item) => await detailSeat(item)));
            setSeats(data5);
            const data6 = await detailFilm(data2.film);
            setFilm(data6);
            // console.log(data5);
        };
        fetch();
    }, [idOrder]);

    const handleBook = () => {
        dispatch(removeAll());
        navigate('/book-tickets')
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <h4 className="text-center">Đặt vé thành công!</h4>
            <div>
                <Button onClick={handleBook}>Tiếp tục đặt vé</Button>
                <Button className="ms-2" onClick={handlePrint}>
                    In vé
                </Button>
            </div>
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
                                    <span className="me-5 fw-bold">{room.name}</span>
                                    <span className="fw-bold">
                                        {seats
                                            ?.map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`)
                                            .join(', ')}
                                    </span>
                                    <span className="ms-5">
                                        {seats[0].type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                    </span>
                                </p>
                                <p>==========================================</p>
                                <p className="text-end fw-bold fs-5">
                                    <span className="me-5">Tong</span>
                                    <span className="me-5">VND</span>
                                    <span>{order.price.toLocaleString('it-IT')}</span>
                                </p>
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

export default OrderSuccess;
