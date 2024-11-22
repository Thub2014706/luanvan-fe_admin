import { CFormCheck, CModal } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { itemMenu } from '~/constants';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { accessStaff, detailStaff } from '~/services/StaffService';

const AllAccess = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [array, setArray] = useState([]);
    const [all, setAll] = useState(false);
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

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
        if (await accessStaff(id, { access: array }, user?.accessToken, axiosJWT)) {
            handleClose();
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSave}>
                <Modal.Header>
                    <Modal.Title>Thêm quyền truy cập nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {itemMenu.map((item) => (
                        <CFormCheck
                            label={item.name}
                            id={item.name}
                            value={item.name}
                            defaultChecked={array.includes(item.name)}
                            onClick={() => handleSelect(item.name)}
                            className='mb-2 ms-3'
                        />
                    ))}
                </Modal.Body>
                <Modal.Footer>

                    <CFormCheck id="flexCheckDefault" label="Chọn tất cả" defaultChecked={all} onClick={handleAll} />
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
