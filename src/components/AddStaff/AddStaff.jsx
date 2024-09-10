import React, { useEffect, useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';
import { createStaff } from '~/services/StaffService';
import ImageBase from '../ImageBase/ImageBase';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormSelect,
} from '@coreui/react-pro';
import { listTheater } from '~/services/TheaterService';

const AddStaff = ({ show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [theaters, setTheaters] = useState([]);
    const [theater, setTheater] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarCode, setAvatarCode] = useState();

    const handleAvatar = (e) => {
        const avar = e.target.files[0];
        setAvatar(avar);
        setAvatarCode(URL.createObjectURL(avar));
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
        };
        fetch();
    }, []);
    // console.log(theaters);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('avatar', avatar);
        formData.append('theater', theater);
        if (await createStaff(formData, user?.accessToken)) {
            console.log('sao z')
            handleClose();
        }
    };

    return (
        <CModal alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>Thêm mới</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CFormLabel className="fw-bold">
                            Tên nhân viên <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Tên nhân viên"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Email <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Số điện thoại <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Mật khẩu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="password"
                            placeholder="Mật khẩu"
                            name="pasword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Nhập lại mật khẩu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold col-sm-4 mt-1" htmlFor="theater">
                            Rạp <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect
                            id="theater"
                            value={theater}
                            onChange={(e) => setTheater(e.target.value)}
                            // placeholder="Rạp chiếu"
                        >
                            <option>Chọn rạp</option>
                            {theaters.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>

                    <div className="my-3">
                        <CFormLabel className="fw-bold">Avatar</CFormLabel>
                        <CFormInput accept=".jpg, .png" type="file" onChange={handleAvatar} />
                    </div>
                    {avatarCode && <Avatar src={avatarCode} round={true} color="gray" alt="" />}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Đóng
                    </CButton>
                    <CButton type="submit" color="primary">
                        Lưu
                    </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default AddStaff;
