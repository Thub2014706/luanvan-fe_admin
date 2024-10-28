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
import { useSelector } from 'react-redux';
import { addNews, detailNews, updateNews } from '~/services/NewsService';
import ImageBase from '../ImageBase/ImageBase';
import ReactQuill from 'react-quill';
import { fomarts, modules } from '~/constants';

const AddNews = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [staff, setStaff] = useState('')
    const [image, setImage] = useState();
    const [imageId, setImageId] = useState();
    const [imageEncode, setImageEncode] = useState();

    const handleImage = (e) => {
        const newImg = e.target.files[0];
        setImage(newImg);
        setImageEncode(URL.createObjectURL(newImg));
        setImageId();
    };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailNews(id);
                setTitle(data.title);
                setContent(data.content);
                setImageId(data.image);
                setStaff(data.staff)
            } else {
                setTitle('');
                setContent('');
                setImageId();
                setStaff(user?.data.id)
            }
        };
        fetch();
    }, [id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('staff', staff);
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        if (id) {
            if (await updateNews(id, formData, user?.accessToken)) {
                handleClose();
            }
        } else {
            if (await addNews(formData, user?.accessToken)) {
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

export default AddNews;
