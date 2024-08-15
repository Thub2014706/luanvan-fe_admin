import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addGenre, detailGenre, updateGenre } from '~/services/GenreService';

const AddGenre = ({ show, handleClose, id }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(false);

    // console.log('dd', id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id !== null) {
            await updateGenre(id, { name, status });
            handleClose();
        } else {
            await addGenre({ name });
            handleClose();
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                const data = await detailGenre(id);
                setName(data.name);
                setStatus(data.status);
            } else {
                setName('');
            }
        };
        fetch();
    }, [id, show]);

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>{id !== null ? 'Cập nhật' : 'Thêm mới'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Tên thể loại</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Tên thể loại"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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

export default AddGenre;
