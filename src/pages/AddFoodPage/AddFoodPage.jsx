import { CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import { addFood, detailFood, updateFood } from '~/services/FoodService';

const AddFoodPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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
                const data = await detailFood(id);
                setName(data.name);
                setPrice(data.price);
                setImageId(data.image);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                navigate('/food');
            }
        } else {
            if (await addFood(formData, user?.accessToken)) {
                navigate('/food');
            }
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Thức ăn</h5>
            <CForm>
                <CRow className="mb-3">
                    <CCol>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} thức ăn</h6>
                    </CCol>
                    <CCol>
                        <div className="button add float-end" onClick={handleSubmit}>
                            Chấp nhận
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormLabel className="fw-bold" htmlFor="image">
                            Hình ảnh <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="image"
                            type="file"
                            name="image"
                            accept=".jpg, .png"
                            onChange={(e) => handleImage(e)}
                            className="mb-3"
                        />
                        {image && <img src={imageEncode} style={{ height: '200px', marginTop: '20px' }} alt="" />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '200px', marginTop: '20px' }} />}
                    </CCol>
                    <CCol>
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
                    </CCol>
                    <CCol>
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
                    </CCol>
                </CRow>
            </CForm>
        </div>
    );
};

export default AddFoodPage;
