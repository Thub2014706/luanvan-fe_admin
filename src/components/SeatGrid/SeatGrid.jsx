import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { detailRoom } from '~/services/RoomService';
import UpdateRowSeat from '../UpdateRowSeat/UpdateRowSeat';
// import screen from '~/assets/images/screen-modal.png';

const SeatGrid = ({ show, handleClose, idRoom }) => {
    const [room, setRoom] = useState(null);
    const [showRow, setShowRow] = useState(false);
    const [numRow, setNumRow] = useState(null);

    const arrayRow = [];
    const arrayCol = [];

    useEffect(() => {
        const fetch = async () => {
            const data = await detailRoom(idRoom);
            setRoom(data);
        };
        fetch();
    }, []);

    if (room !== null) {
        for (let i = 1; i <= room.numRow; i++) {
            arrayRow.push(i);
        }

        for (let i = 1; i <= room.numCol; i++) {
            arrayCol.push(i);
        }
    }

    const handleShowRow = (row) => {
        setShowRow(true);
        setNumRow(row);
    };

    const handleCloseRow = () => {
        setShowRow(false);
        setNumRow(null);
    };

    return (
        <div>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Cập nhật ghế phòng chiếu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <img src={screen} alt="" style={{width: '90%'}} /> */}
                    <p className="text-center fw-bold">Màn hình</p>
                    <div className="screen-modal"></div>
                    <Table className="w-auto mx-auto mt-5">
                        {arrayRow.map((row) => (
                            <tr>
                                {arrayCol.map((col) => (
                                    <td className="text-center align-middle">
                                        <div className="seat standard">
                                            <p className="text-white">
                                                {String.fromCharCode(64 + row)}
                                                {col}
                                            </p>
                                        </div>
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
            <UpdateRowSeat show={showRow} handleClose={handleCloseRow} row={numRow} room={idRoom} col={arrayCol.length} />
        </div>
    );
};

export default SeatGrid;
