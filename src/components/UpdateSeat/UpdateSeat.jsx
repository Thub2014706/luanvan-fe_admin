import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { typeSeat } from '~/constants';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { deleteSeat, detailSeat, updateSeat } from '~/services/SeatService';

const UpdateSeat = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true);
    const [col, setCol] = useState();
    const [row, setRow] = useState();
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailSeat(id);
            setType(data.type);
            setStatus(data.status);
            setCol(data.col);
            setRow(data.row);
            setLeft(data.left);
            setRight(data.right);
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSeat(id, { type, status, left, right }, user?.accessToken, axiosJWT);
        handleClose();
        // console.log({numRow: row, room, type, status})
    };

    const handleDelete = async () => {
        await deleteSeat(id, user?.accessToken, axiosJWT);
        handleClose();
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>
                        Cập nhật ghế {String.fromCharCode(64 + row)}
                        {col}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Loại ghế <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Select id="type" value={type} name="age" onChange={(e) => setType(e.target.value)}>
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

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">Căn trái</Form.Label>
                        <Form.Control
                            name="left"
                            value={left}
                            type="number"
                            onChange={(e) => setLeft(Math.max(e.target.value, 0))}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">Căn phải</Form.Label>
                        <Form.Control
                            name="right"
                            value={right}
                            type="number"
                            onChange={(e) => setRight(Math.max(e.target.value, 0))}
                        />
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
