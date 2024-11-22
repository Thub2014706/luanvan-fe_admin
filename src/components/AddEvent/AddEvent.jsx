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
} from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, detailEvent, updateEvent } from '~/services/EventService';
import ImageBase from '../ImageBase/ImageBase';
import ReactQuill from 'react-quill';
import { fomarts, modules } from '~/constants';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';

const AddEvent = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState();
    const [imageId, setImageId] = useState();
    const [imageEncode, setImageEncode] = useState();
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleImage = (e) => {
        const newImg = e.target.files[0];
        setImage(newImg);
        setImageEncode(URL.createObjectURL(newImg));
        setImageId();
    };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailEvent(id);
                setTitle(data.title);
                setContent(data.content);
                setImageId(data.image);
            } else {
                setTitle('');
                setContent('');
                setImageId();
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        if (id) {
            if (await updateEvent(id, formData, user?.accessToken, axiosJWT)) {
                handleClose();
            }
        } else {
            if (await addEvent(formData, user?.accessToken, axiosJWT)) {
                handleClose();
            }
        }
    };

    // console.log(link, image)
    return (
        <CModal alignment="center" size='lg' visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} sự kiện</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Tiêu đề <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            required
                            type="text"
                            placeholder="Tiêu đề"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Hình ảnh <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            type="file"
                            name="image"
                            accept=".jpg, .png"
                            onChange={handleImage}
                            className="mb-3"
                        />
                        {image && <img src={imageEncode} style={{ height: '100px', marginTop: '20px' }} alt="" />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '100px', marginTop: '20px' }} />}
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold">
                            Nội dung <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={fomarts}
                            placeholder="Viết nội dung..."
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

export default AddEvent;
