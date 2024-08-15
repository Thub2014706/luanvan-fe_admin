import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { typeSeat } from '~/constants';
import { updateRowSeat } from '~/services/SeatService';

const UpdateRowSeat = ({ show, handleClose, row, room, col }) => {
    const [type, setType] = useState('');
    const [status, setStatus] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateRowSeat({colLength: col, numRow: row, room, type, status})
        console.log(data)
    }
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Cập nhật hàng ghế</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Loại ghế <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Select id="type" value={type} name="age" onChange={(e) => setType(e.target.value)}>
                            <option>Loại ghế</option>
                            {typeSeat.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Trạng thái <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Select id="type" value={status} name="age" onChange={(e) => setStatus(e.target.value)}>
                            <option>Trạng thái</option>
                            <option value={0}>Kích hoạt</option>
                            <option value={1}>Chưa kích hoạt</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateRowSeat;
