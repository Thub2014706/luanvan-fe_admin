import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addDiscount, detailDiscount, updateDiscount } from '~/services/DiscountService';

const AddDiscountPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [code, setCode] = useState();
    const [percent, setPercent] = useState();
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailDiscount(id);
                setName(data.name);
                setCode(data.code);
                setPercent(data.percent);
                setQuantity(data.quantity);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            if (await updateDiscount(id, { name, code, percent, quantity }, user?.accessToken)) {
                navigate('/discount');
            }
        } else {
            if (await addDiscount({ name, code, percent, quantity }, user?.accessToken)) {
                navigate('/discount');
            }
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Mã khuyến mãi</h5>
            <Form>
                <Row className="mb-3">
                    <Col>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} mã khuyến mãi</h6>
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
                            Mã <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Mã"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">
                            Phần trăm <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Phần trăm"
                            name="percent"
                            value={percent}
                            onChange={(e) => {
                                const value = Math.min(Math.max(e.target.value, 1), 100);
                                setPercent(value);
                            }}
                        />
                    </Col>
                    <Col>
                        <Form.Label className="fw-bold">
                            Số lượng <span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Số lượng"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(e.target.value, 1))}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddDiscountPage;
