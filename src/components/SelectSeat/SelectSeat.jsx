import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { showToast, typeSeatEnum } from '~/constants';
import { allSeatRoom } from '~/services/SeatService';
import { useDispatch, useSelector } from 'react-redux';
import { preStep2 } from '~/features/showTime/showTimeSlice';
import CardBookTicket from '../CardBookTicket/CardBookTicket';

const SelectSeat = () => {
    const [seats, setSeats] = useState([]);
    const dispatch = useDispatch();
    const idRoom = useSelector((state) => state.showTime.room);

    useEffect(() => {
        const fetch = async () => {
            const data = await allSeatRoom(idRoom);
            setSeats(data);
        };
        fetch();
    }, [idRoom]);
    // console.log('qq', idRoom);
    const rows = [...new Set(seats.map((item) => item.row))];

    const handlePre = () => {
        dispatch(preStep2());
    };

    const handleSelectSeat = (seat) => {
        const seatIndex = seats.indexOf(seat);
        const leftSeat = seats[seatIndex - 1];
        const rightSeat = seats[seatIndex + 1];
        console.log(leftSeat);
        if (leftSeat.col === 1 || rightSeat.col === seats[seats.length - 1].col) {
            showToast(
                'Vui lòng không được để trống 1 ghế ở bên trái, giữa hoặc bên phải trên cùng một hàng ghế mà bạn vừa chọn!',
                'warning',
            );
        }
    };

    return (
        <Row className="mt-4">
            <Col xs={3}>
                <CardBookTicket />
            </Col>
            <Col xs={9}>
                <p className="text-center fw-bold">Màn hình</p>
                <div className="screen-modal mb-5"></div>
                {rows.map((row) => (
                    <Table className="w-auto mx-auto my-1">
                        <tr key={row}>
                            {seats
                                .filter((seat) => seat.row === row)
                                .map((seat) => (
                                    <td className="text-center align-middle">
                                        {!seat.isDelete && (
                                            <div
                                                className={`seat ${seat.type === typeSeatEnum[0] && 'standard'} ${
                                                    seat.type === typeSeatEnum[1] && 'vip'
                                                } ${seat.type === typeSeatEnum[2] && 'couple'} ${
                                                    !seat.status && 'inaction'
                                                } `}
                                                style={{
                                                    marginBottom: `${seat.bottom * 17.5}px`,
                                                    marginLeft: `${seat.left * 17.5 + seat.left * 2 + 2}px`,
                                                    marginRight: `${seat.right * 17.5 + seat.right * 2 + 2}px`,
                                                }}
                                                onClick={() => handleSelectSeat(seat)}
                                            >
                                                <p className="text-white">
                                                    {String.fromCharCode(64 + row)}
                                                    {seat.col}
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                ))}
                        </tr>
                    </Table>
                ))}
                <div className="d-flex mt-5" style={{ display: 'inline-block' }}>
                    <div className="standard seat"></div>
                    <p className="my-auto ms-2">Ghế thường</p>
                    <div className="vip seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế VIP</p>
                    <div className="couple seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế Couple</p>
                    <div className="inaction seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế đang bảo trì</p>
                </div>
                <div className="float-end d-flex">
                    <div className="mt-5 button add me-3" onClick={handlePre}>
                        Quay lại
                    </div>
                    <div className="mt-5 button add">Tiếp theo</div>
                </div>
            </Col>
        </Row>
    );
};

export default SelectSeat;
