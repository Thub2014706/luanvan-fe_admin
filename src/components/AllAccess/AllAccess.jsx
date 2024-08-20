import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { itemMenu } from '~/constants';
import { accessStaff, detailStaff } from '~/services/StaffService';

const AllAccess = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
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

    const handleAll = () => {
        if (all) {
            setArray([]);
            setAll(false);
        } else {
            setArray(itemMenu.map((item) => item.name));
            setAll(true);
        }
    };
    // console.log(array);

    const handleSave = async (e) => {
        e.preventDefault();
        if (await accessStaff(id, { access: array }, user?.accessToken)) {
            handleClose();
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSave}>
                <Modal.Header>
                    <Modal.Title>Thêm quyền truy cập nhân viên</Modal.Title>
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
                    <span
                        style={{
                            background: all ? 'linear-gradient(#4e337a, #264c9a)' : 'initial',
                        }}
                        className="button-check mt-1"
                        onClick={() => setAll(!all)}
                    >
                        {all && <FontAwesomeIcon icon={faCheck} size="sm" className="icon" color="white" />}
                    </span>
                    <p className="ms-1 name-check" onClick={handleAll}>
                        Chọn tất cả
                    </p>
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
