import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { fomarts, modules } from '~/constants';
import ImageBase from '../../components/ImageBase/ImageBase';
import Avatar from 'react-avatar';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { addPerformer, detailPerformer, updatePerformer } from '~/services/PerformerService';
import { useSelector } from 'react-redux';
import { CCol, CDatePicker, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';

const AddPerformerPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [birth, setBirth] = useState();
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarBase, setAvatarBase] = useState();
    const [avatarId, setAvatarId] = useState();

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
            if (await updatePerformer(id, formData, user?.accessToken)) {
                navigate('/performer');
            }
        } else {
            if (await addPerformer(formData, user?.accessToken)) {
                navigate('/performer');
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
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Diễn viên</h5>
            <CForm>
                <CRow className="mb-3">
                    <CCol>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} diễn viên</h6>
                    </CCol>
                    <CCol>
                        <div className="button add float-end" onClick={handleSubmit}>
                            Chấp nhận
                        </div>
                    </CCol>
                </CRow>
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
                <CRow className="mt-3">
                    <CCol>
                        <CFormLabel className="fw-bold">Mô tả</CFormLabel>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            modules={modules}
                            formats={fomarts}
                            placeholder="Viết mô tả..."
                        />
                    </CCol>
                </CRow>
            </CForm>
        </div>
    );
};

export default AddPerformerPage;
