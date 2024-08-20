import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createStaff } from '~/services/StaffService';
import ImageBase from '../ImageBase/ImageBase';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';

const AddStaff = ({ show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarCode, setAvatarCode] = useState();

    const handleAvatar = (e) => {
        const avar = e.target.files[0];
        setAvatar(avar);
        setAvatarCode(URL.createObjectURL(avar));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('avatar', avatar);
        if (await createStaff(formData, user?.accessToken)) {
            handleClose();
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Thêm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="fw-bold">
                            Tên nhân viên <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tên nhân viên"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Email <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Số điện thoại <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Mật khẩu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Mật khẩu"
                            name="pasword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="fw-bold">
                            Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label className="fw-bold">Avatar</Form.Label>
                        <Form.Control multiple accept=".jpg, .png" type="file" onChange={handleAvatar} />
                    </Form.Group>
                    <Avatar src={avatarCode} round={true} color="gray" alt="" />
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

export default AddStaff;
