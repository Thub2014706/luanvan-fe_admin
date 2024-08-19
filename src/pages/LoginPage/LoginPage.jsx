import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import img1 from '~/assets/images/CINEMA_login.webp';
import { loginStaff } from '~/services/StaffService';

const LoginPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [eye, setEye] = useState(false);

    const [data, setData] = useState({
        info: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginStaff({ ...data }, navigate, dispatch);
    };

    return (
        <Container fluid className="min-vh-100">
            <Row>
                <Col xs={6}>
                    <div className="card-login">
                        <h5 className="fw-bold">Đăng nhập</h5>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="form-login">
                                <Form.Control
                                    type="text"
                                    name="info"
                                    value={data.info}
                                    placeholder="Tài khoản, email hoặc số điện thoại"
                                    className="input-login mt-4"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon className="icon-login" icon={faUser} />
                            </Form.Group>
                            <Form.Group className="form-login mt-4">
                                <Form.Control
                                    type={eye ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="Mật khẩu"
                                    className="input-login"
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    onClick={() => setEye(!eye)}
                                    className="icon-login"
                                    icon={eye ? faEyeSlash : faEye}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                className="mt-5"
                                style={{
                                    width: '100%',
                                    color: 'white',
                                    border: 'none',
                                    background: 'linear-gradient(#4e337a, #264c9a)',
                                    height: '40px',
                                }}
                            >
                                Đăng nhập
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col xs={6} className='col-login'>
                    <img src={img1} className='img' alt="" />
                    <p className='text'>"You may delay, but time will not"</p>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
