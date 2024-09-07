import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { showToast, typeSeatEnum } from '~/constants';
import { allSeatRoom } from '~/services/SeatService';
import { useDispatch, useSelector } from 'react-redux';
import { preStep2, seatValue, stepNext } from '~/features/showTime/showTimeSlice';
import CardBookTicket from '../CardBookTicket/CardBookTicket';
import { allOrderTicketSelled, OrderTicketSelectSeat } from '~/services/OrderTicketService';
import OffcanvasCombo from '../OffcanvasCombo/OffcanvasCombo';

const SelectSeat = () => {
    const [seats, setSeats] = useState([]);
    const dispatch = useDispatch();
    const idRoom = useSelector((state) => state.showTime.room);
    const [selectSeat, setSelectSeat] = useState([]);
    const [war, setWar] = useState('');
    const idShowTime = useSelector((state) => state.showTime.idShowTime);
    const [selled, setSelled] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await allSeatRoom(idRoom);
            setSeats(data);
        };
        fetch();
    }, [idRoom]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allOrderTicketSelled(idShowTime);
            setSelled(data);
        };
        fetch();
    }, [idShowTime]);
    // console.log('qq', selled);
    const rows = [...new Set(seats.map((item) => item.row))];

    const handlePre = () => {
        dispatch(preStep2());
    };

    const handleSelectSeat = async (seat) => {
        setWar('');
        if (!selectSeat.includes(seat)) {
            const seatArray = [...selectSeat, seat];
            const allSameType = seatArray.every((item) => item.type === seatArray[0].type);

            if (!allSameType) {
                showToast('Hãy chọn ghế cùng loại', 'warning');
            } else {
                setSelectSeat(seatArray); // Cập nhật state với mảng ghế mới
            }
        } else {
            setSelectSeat(selectSeat.filter((item) => item !== seat));
        }
    };

    const handleSelectSeatCouple = (seat) => {
        setWar('');
        const arrayRow = seats.filter((item) => item.row === seat.row);
        const seatIndex = arrayRow.indexOf(seat);
        const nextChair = arrayRow[seatIndex].col % 2 === 0 ? arrayRow[seatIndex - 1] : arrayRow[seatIndex + 1];

        if (!selectSeat.includes(seat && nextChair)) {
            const seatArray = [...selectSeat, seat, nextChair];
            const allSameType = seatArray.every((item) => item.type === seatArray[0].type);

            if (!allSameType) {
                showToast('Hãy chọn ghế cùng loại', 'warning');
            } else {
                setSelectSeat(seatArray);
            }
        } else {
            setSelectSeat(selectSeat.filter((item) => item !== seat && item !== nextChair));
        }
    };
    console.log(selectSeat);

    const handleSubmit = () => {
        // if ()
        if (selectSeat.length === 0) {
            setWar('Vui lòng chọn ghế!');
        } else {
            let hasGap = false;

            selectSeat.forEach((item) => {
                const arrayRow = seats.filter((mini) => mini.row === item.row);
                const seatIndex = arrayRow.indexOf(item);

                // Kiểm tra ghế trống bên trái
                if (
                    arrayRow[seatIndex - 2] &&
                    arrayRow[seatIndex - 1] &&
                    (selled.includes(arrayRow[seatIndex - 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex - 2]) ||
                        arrayRow[seatIndex - 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    arrayRow[seatIndex - 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên phải
                if (
                    arrayRow[seatIndex + 2] &&
                    arrayRow[seatIndex + 1] &&
                    (selled.includes(arrayRow[seatIndex + 2]._id) ||
                        selectSeat.includes(arrayRow[seatIndex + 2]) ||
                        arrayRow[seatIndex + 2].status === false) &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    arrayRow[seatIndex + 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên trái
                if (
                    !arrayRow[seatIndex - 2] &&
                    arrayRow[seatIndex - 1] &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id) &&
                    arrayRow[seatIndex - 1].status === true
                ) {
                    hasGap = true;
                }

                // Kiểm tra ghế trống bên phải
                if (
                    !arrayRow[seatIndex + 2] &&
                    arrayRow[seatIndex + 1] &&
                    !selectSeat.includes(arrayRow[seatIndex + 1]) &&
                    !selled.includes(arrayRow[seatIndex + 1]._id) &&
                    arrayRow[seatIndex + 1].status === true
                ) {
                    hasGap = true;
                }

                if (
                    arrayRow[seatIndex - 1] &&
                    arrayRow[seatIndex - 1].left > 0 &&
                    arrayRow[seatIndex - 1].status === true &&
                    !selectSeat.includes(arrayRow[seatIndex - 1]) &&
                    !selled.includes(arrayRow[seatIndex - 1]._id)
                ) {
                    hasGap = true;
                }

                if (
                    arrayRow[seatIndex + 2] &&
                    arrayRow[seatIndex + 2].left > 0 &&
                    arrayRow[seatIndex + 2].status === true &&
                    !selectSeat.includes(arrayRow[seatIndex + 2]) &&
                    !selled.includes(arrayRow[seatIndex + 2]._id)
                ) {
                    hasGap = true;
                }
            });

            if (hasGap) {
                showToast('Vui lòng không bỏ trống ghế bên trái hoặc bên phải của các ghế bạn đã chọn', 'warning');
            } else {
                dispatch(seatValue(selectSeat));
                dispatch(stepNext(4));
            }
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                                } ${selectSeat.find((item) => item === seat) && 'select'}
                                                ${selled.includes(seat._id) && 'selled'}
                                                `}
                                                style={{
                                                    marginBottom: `${seat.bottom * 17.5}px`,
                                                    marginLeft: `${seat.left * 17.5 + seat.left * 2 + 2}px`,
                                                    marginRight: `${seat.right * 17.5 + seat.right * 2 + 2}px`,
                                                }}
                                                onClick={() =>
                                                    !selled.includes(seat._id) &&
                                                    seat.status === true &&
                                                    (seat.type !== typeSeatEnum[2]
                                                        ? handleSelectSeat(seat)
                                                        : handleSelectSeatCouple(seat))
                                                }
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
                <div className="d-flex mt-5 mb-4" style={{ display: 'inline-block', position: 'relative' }}>
                    <div className="standard seat"></div>
                    <p className="my-auto ms-2">Ghế thường</p>
                    <div className="vip seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế VIP</p>
                    <div className="couple seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế Couple</p>
                    <div className="inaction seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế đang bảo trì</p>
                    <div className="selled seat ms-4"></div>
                    <p className="my-auto ms-2">Ghế đã mua</p>
                </div>
                <p style={{ color: 'red', position: 'absolute' }}>{war}</p>
                <div className="float-end d-flex">
                    <div className="mt-5 button add me-3" onClick={handlePre}>
                        Quay lại
                    </div>
                    <div className="mt-5 button add me-3" style={{ width: '120px' }} onClick={handleShow}>
                        Thêm combo
                    </div>
                    <div className="mt-5 button add" onClick={handleSubmit}>
                        Tiếp theo
                    </div>
                </div>
            </Col>
            <OffcanvasCombo show={show} handleClose={handleClose} />
        </Row>
    );
};

export default SelectSeat;
