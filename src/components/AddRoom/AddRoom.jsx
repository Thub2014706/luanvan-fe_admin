import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { typeRoom } from '~/constants';
import { addRoom, detailRoom, updateRoom } from '~/services/RoomService';

const AddRoom = ({ show, handleClose, id, idTheater }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [numRow, setNumRow] = useState();
    const [numCol, setNumCol] = useState();
    const [type, setType] = useState('');

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                console.log(id);
                
                const data = await detailRoom(id);
                setName(data.name);
                setType(data.type);
                setNumRow(data.numRow);
                setNumCol(data.numCol);
            } else {
                setName('');
                setType('');
                setNumRow('');
                setNumCol('');
            }
        };
        fetch();
    }, [id, show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id !== null) {
            await updateRoom(id, { name, type, numRow, numCol, theater: idTheater }, user?.accessToken);
            handleClose();
        } else {
            await addRoom({ name, type, numRow, numCol, theater: idTheater }, user?.accessToken);
            handleClose();
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{id !== null ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Form.Group>
                        <Form.Label className="fw-bold">
                            Tên phòng chiếu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tên phòng chiếu"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Loại phòng chiếu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Select id="type" value={type} name="age" onChange={(e) => setType(e.target.value)}>
                            <option>Loại phòng chiếu</option>
                            {typeRoom.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Số hàng <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Số hàng"
                            name="numRow"
                            value={numRow}
                            onChange={(e) => setNumRow(Math.max(e.target.value, 0))}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Số cột <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Số cột"
                            name="numCol"
                            value={numCol}
                            onChange={(e) => setNumCol(Math.max(e.target.value, 0))}
                        />
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

export default AddRoom;
