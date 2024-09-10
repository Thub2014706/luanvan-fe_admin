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
import ImageBase from '~/components/ImageBase/ImageBase';
import { addFood, detailFood, updateFood } from '~/services/FoodService';

const AddFood = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState();
    const [imageId, setImageId] = useState();
    const [imageEncode, setImageEncode] = useState();

    const handleImage = (e) => {
        e.preventDefault();
        const newImg = e.target.files[0];
        setImage(newImg);
        setImageEncode(URL.createObjectURL(newImg));
        setImageId();
    };

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailFood(id);
                setName(data.name);
                setPrice(data.price);
                setImageId(data.image);
            } else {
                setName('');
                setPrice();
                setImageId();
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        if (id) {
            if (await updateFood(id, formData, user?.accessToken)) {
                handleClose();
            }
        } else {
            if (await addFood(formData, user?.accessToken)) {
                handleClose();
            }
        }
    };

    return (
        <CModal alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} thức ăn</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CFormLabel className="fw-bold" htmlFor="name">
                            Tên <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            required
                            type="text"
                            placeholder="Tên"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="price">
                            Giá tiền <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="price"
                            type="number"
                            placeholder="Giá tiền"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="image">
                            Hình ảnh <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="image"
                            type="file"
                            name="image"
                            accept=".jpg, .png"
                            onChange={handleImage}
                            className="mb-3"
                        />
                        {image && <img src={imageEncode} style={{ height: '100px', marginTop: '20px' }} alt="" />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '100px', marginTop: '5px' }} />}
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

export default AddFood;
