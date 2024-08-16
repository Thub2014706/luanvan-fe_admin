import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
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

    return (
        <div>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Cập nhật ghế phòng chiếu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center fw-bold">Màn hình</p>
                    <div className="screen-modal"></div>
                    <Table className="w-auto mx-auto mt-5">
                        {rows.map((row) => (
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
                                <td>
                                    <FontAwesomeIcon
                                        className="me-4"
                                        icon={faPenToSquare}
                                        style={{ cursor: 'pointer', color: 'green' }}
                                        onClick={() => handleShowRow(row)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </Table>
                    <Row className="d-flex justify-content-center">
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
                {/* <Form onSubmit={handleSubmit}>
                </Form> */}
            </Modal>
            {idSeat !== null && <UpdateSeat show={showSeat} handleClose={handleCloseSeat} id={idSeat} />}
            {numRow !== null && (
                <UpdateRowSeat show={showRow} handleClose={handleCloseRow} row={numRow} room={idRoom} />
            )}
        </div>
    );
};

export default SeatGrid;
