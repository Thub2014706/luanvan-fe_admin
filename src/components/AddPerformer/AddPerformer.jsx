import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { fomarts, modules } from '~/constants';
import ImageBase from '../ImageBase/ImageBase';
import Avatar from 'react-avatar';
import moment from 'moment';
import { addPerformer, detailPerformer, updatePerformer } from '~/services/PerformerService';
import { useDispatch, useSelector } from 'react-redux';
import {
    CButton,
    CCol,
    CDatePicker,
    CForm,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react-pro';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';

const AddPerformer = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState();
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarBase, setAvatarBase] = useState();
    const [avatarId, setAvatarId] = useState();
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // console.log('dd', id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (birth) {
            formData.append('birth', birth);
        }
        if (description) {
            formData.append('description', description);
        }
        if (avatarId) {
            formData.append('avatarId', avatarId);
        } else {
            formData.append('avatar', avatar);
        }
        if (id) {
            if (await updatePerformer(id, formData, user?.accessToken, axiosJWT)) {
                handleClose();
            }
        } else {
            if (await addPerformer(formData, user?.accessToken, axiosJWT)) {
                handleClose();
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailPerformer(id);
                setName(data.name);
                data.birth && setBirth(moment(data.birth).format('YYYY-MM-DD'));
            }
        };
        fetch();
    }, [id]);

    const handleAvatar = (e) => {
        const img = e.target.files[0];
        setAvatar(img);
        setAvatarBase(URL.createObjectURL(img));
        setAvatarId();
    };

    return (
        <CModal size='lg' alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} thể loại phim</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <CRow>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="avatar">
                                Avatar
                            </CFormLabel>
                            <CFormInput
                                id="avatar"
                                type="file"
                                name="avatar"
                                accept=".jpg, .png"
                                onChange={(e) => handleAvatar(e)}
                                className="mb-3"
                            />
                            {avatar && <Avatar src={avatarBase} color="gray" round={true} alt="" />}
                            {avatarId && (
                                <ImageBase
                                    pathImg={avatarId}
                                    style={{ height: '100px', width: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            )}
                        </CCol>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="name">
                                Họ Tên <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CFormInput
                                id="name"
                                required
                                type="text"
                                placeholder="Họ tên"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CCol>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="birth">
                                Ngày sinh
                            </CFormLabel>
                            <CDatePicker
                                id="birth"
                                placeholder="Ngày sinh"
                                name="birth"
                                date={birth}
                                value={birth}
                                onDateChange={(date) => setBirth(date)}
                            />
                        </CCol>
                    </CRow>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold">Mô tả</CFormLabel>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                            formats={fomarts}
                            placeholder="Viết mô tả..."
                        />
                    </div>
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

export default AddPerformer;
