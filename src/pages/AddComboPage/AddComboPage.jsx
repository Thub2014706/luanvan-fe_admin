import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import { addCombo, detailCombo, updateCombo } from '~/services/ComboService';
import { listFood } from '~/services/FoodService';

const AddComboPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [foods, setFoods] = useState([]);
    const [food, setFood] = useState(['']);
    const [quantity, setQuantity] = useState(['']);
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
            const data = await listFood();
            setFoods(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailCombo(id);
                setName(data.name);
                setPrice(data.price);
                setImageId(data.image);
                setFood(data.variants.map((item) => item.food));
                setQuantity(data.variants.map((item) => item.quantity));
            }
        };
        fetch();
    }, [id]);

    const handleAddFood = () => {
        setFood([...food, '']);
        setQuantity([...quantity, '']);
    };

    const handleDeleteFood = (i) => {
        setFood([...food].filter((item, index) => index !== i));
        setQuantity([...quantity].filter((item, index) => index !== i));
    };

    const handleFood = (e, i) => {
        const copyFood = [...food];
        copyFood[i] = e.target.value;
        setFood(copyFood);
    };

    const handleQuantity = (e, i) => {
        const copyQuantity = [...quantity];
        copyQuantity[i] = Math.max(e.target.value, 1);
        setQuantity(copyQuantity);
    };

    const variants = [];

    for (let i = 0; i < food.length; i++) {
        variants.push({
            food: food[i],
            quantity: quantity[i],
        });
    }

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
        formData.append('variants', JSON.stringify(variants));
        if (id) {
            if (await updateCombo(id, formData)) {
                navigate('/combo');
            }
        } else {
            if (await addCombo(formData)) {
                navigate('/combo');
            }
        }
    };

    console.log(variants);

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Combo</h5>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} Combo</h6>
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
                <Row className="mt-3">
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
                            Chi tiết <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        {food.map((mini, index) => (
                            <Form.Group as={Row} className="d-flex align-items-center mb-2">
                                <Col className="pe-0">
                                    <Form.Select
                                        id="food"
                                        value={mini}
                                        name="food"
                                        onChange={(e) => handleFood(e, index)}
                                    >
                                        <option>Thức ăn</option>
                                        {foods
                                            .filter((item) => !food.includes(item._id) || item._id === mini)
                                            .map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Col>
                                <Col className="p-0">
                                    <Form.Control
                                        value={quantity[index]}
                                        type="number"
                                        name="quantity"
                                        onChange={(e) => handleQuantity(e, index)}
                                        placeholder="Số lượng"
                                    />
                                </Col>
                                <Col xs="auto" className="ps-0">
                                    <Button variant="danger" onClick={() => handleDeleteFood(index)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                </Col>
                            </Form.Group>
                        ))}
                        <div className="button select" onClick={handleAddFood}>
                            Thêm
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddComboPage;
