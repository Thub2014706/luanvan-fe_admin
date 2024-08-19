import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Table } from 'react-bootstrap';
import UpdateRowSeat from '../UpdateRowSeat/UpdateRowSeat';
import { allSeatRoom } from '~/services/SeatService';
import { typeSeatEnum } from '~/constants';
import UpdateSeat from '../UpdateSeat/UpdateSeat';
// import screen from '~/assets/images/screen-modal.png';

const SeatGrid = ({ show, handleClose, idRoom }) => {
    const [seats, setSeats] = useState([]);
    const [showRow, setShowRow] = useState(false);
    const [numRow, setNumRow] = useState(null);
    const [showSeat, setShowSeat] = useState(false);
    const [idSeat, setIdSeat] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const data = await allSeatRoom(idRoom);
            setSeats(data);
        };
        fetch();
    }, [showRow, showSeat]);

    const handleShowRow = (row) => {
        setShowRow(true);
        setNumRow(row);
    };

    const handleCloseRow = () => {
        setShowRow(false);
        setNumRow(null);
    };

    const handleShowSeat = (id) => {
        setShowSeat(true);
        setIdSeat(id);
    };

    const handleCloseSeat = () => {
        setShowSeat(false);
        setIdSeat(null);
    };

    const rows = [...new Set(seats.map((item) => item.row))];

    // console.log(seats);

    // const renderSeat = (row) => {
    //     const cells = [];

    //     return cells;
    // };
    return (
        <div>
            <Modal size="lg" className='py-2' centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Cập nhật ghế phòng chiếu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                                    onClick={() => handleShowSeat(seat._id)}
                                                >
                                                    <p className="text-white">
                                                        {String.fromCharCode(64 + row)}
                                                        {seat.col}
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                {/* {renderSeat(row)} */}
                                <td>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        style={{ cursor: 'pointer', color: 'green' }}
                                        onClick={() => handleShowRow(row)}
                                    />
                                </td>
                            </tr>
                        </Table>
                    ))}
                    <Row className="mt-5 d-flex justify-content-center">
                        <Col className="d-flex align-items-center justify-content-end">
                            <div className="seat standard"></div>
                            <p className="ms-2 mb-0">Ghế thường</p>
                        </Col>

                        <Col className="d-flex align-items-center ms-5">
                            <div className="seat vip"></div>
                            <p className="ms-2 mb-0">Ghế VIP</p>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center mt-2">
                        <Col className="d-flex align-items-center justify-content-end">
                            <div className="seat couple"></div>
                            <p className="ms-2 mb-0">Ghế Couple</p>
                        </Col>

                        <Col className="d-flex align-items-center ms-5">
                            <div className="seat inaction"></div>
                            <p className="ms-2 mb-0">Ghế không khả dụng</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {idSeat !== null && <UpdateSeat show={showSeat} handleClose={handleCloseSeat} id={idSeat} />}
            {numRow !== null && (
                <UpdateRowSeat show={showRow} handleClose={handleCloseRow} row={numRow} room={idRoom} />
            )}
        </div>
    );
};

export default SeatGrid;
