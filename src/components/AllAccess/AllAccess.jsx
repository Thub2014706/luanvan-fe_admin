import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { itemMenu } from '~/constants';
import { accessStaff, detailStaff } from '~/services/StaffService';

const AllAccess = ({ show, handleClose, id }) => {
    const [array, setArray] = useState([]);
    const [all, setAll] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailStaff(id);
            setArray(data.access);
        };
        fetch();
    }, [show, id]);

    const handleSelect = (name) => {
        if (!array.includes(name)) {
            setArray((pre) => [...pre, name]);
        } else {
            setArray(array.filter((item) => item !== name));
        }
    };
    console.log(array);

    const handleSave = async (e) => {
        e.preventDefault();
        if (await accessStaff(id, { access: array })) {
            handleClose();
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSave}>
                <Modal.Header>
                    <Modal.Title>Cập nhật quyền truy cập nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {itemMenu.map((item) => (
                        <div className="d-flex">
                            <div
                                style={{
                                    background: array.includes(item.name)
                                        ? 'linear-gradient(#4e337a, #264c9a)'
                                        : 'initial',
                                }}
                                className="button-check mt-1"
                                onClick={() => handleSelect(item.name)}
                            >
                                {array.includes(item.name) && (
                                    <FontAwesomeIcon icon={faCheck} size="sm" className="icon" color="white" />
                                )}
                            </div>
                            <p className="ms-1 name-check" onClick={() => handleSelect(item.name)}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex">
                        <div
                            style={{
                                background: all ? 'linear-gradient(#4e337a, #264c9a)' : 'initial',
                            }}
                            className="button-check mt-1"
                            onClick={() => setAll(!all)}
                        >
                            {all && <FontAwesomeIcon icon={faCheck} size="sm" className="icon" color="white" />}
                        </div>
                        <p className="ms-1 name-check" onClick={() => setAll(!all)}>
                            Chọn tất cả
                        </p>
                    </div>
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

export default AllAccess;
