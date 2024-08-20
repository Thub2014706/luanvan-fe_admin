import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
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
            <Form>
                <Row className="mb-3">
                    <Col>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} thức ăn</h6>
                    </Col>
                    <Col>
                        <div className="button add float-end" onClick={handleSubmit}>
                            Chấp nhận
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label className="fw-bold">
                            Avatar <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="avatar"
                            multiple
                            accept=".jpg, .png"
                            onChange={(e) => handleImage(e)}
                            className="mb-3"
                        />
                        {image && <img src={imageEncode} style={{ height: '200px', marginTop: '20px' }} alt="" />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '200px', marginTop: '20px' }} />}
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">
                            Tên <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Tên"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">
                            Giá tiền <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Giá tiền"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddFoodPage;
