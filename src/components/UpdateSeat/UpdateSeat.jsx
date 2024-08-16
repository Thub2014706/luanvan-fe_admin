import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { typeSeat } from '~/constants';
import { deleteSeat, updateSeat } from '~/services/SeatService';

const UpdateSeat = ({ show, handleClose, id }) => {
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSeat(id, { type, status });
        handleClose()
        // console.log({numRow: row, room, type, status})
    };

    const handleDelete = async () => {
        await deleteSeat(id)
        handleClose()
    }

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Cập nhật ghế</Modal.Title>
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
                            <option value={true}>Kích hoạt</option>
                            <option value={false}>Chưa kích hoạt</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateSeat;
