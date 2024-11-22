import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import MainContent from '../components/MainContent/MainContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/services/StaffService';
import { createAxios } from '~/createInstance';
import { loginSuccess, logoutSuccess } from '~/features/auth/authSlice';

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [show, setShow] = useState(false);
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
    };

    const handleLogout = async () => {
        await logout(dispatch, user?.accessToken, axiosJWT);
    };

    return (
        <Container fluid className="background">
            <Row>
                <Col xs={2}>
                    <Menu />
                </Col>
                <Col xs={10}>
                    <Row className="m-4">
                        <div className="d-flex justify-content-end align-items-center" style={{ position: 'relative' }}>
                            <FontAwesomeIcon icon={faAddressCard} color="white" />
                            <p className="text-white my-auto ms-2" onMouseEnter={handleShow} onMouseLeave={handleHide}>
                                {user.data.username}
                            </p>
                            {show && (
                                <div
                                    className="ms-1"
                                    onMouseEnter={handleShow}
                                    onMouseLeave={handleHide}
                                    style={{
                                        position: 'absolute',
                                        zIndex: '10000',
                                        cursor: 'pointer',
                                        top: '50%',
                                    }}
                                >
                                    <ul
                                        style={{
                                            backgroundColor: 'white',
                                            listStyle: 'none',
                                        }}
                                        className="p-3 mt-2 shadow"
                                    >
                                        <li className="mt-2" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} color="black" />
                                            <span className="ms-1 text-black">Đăng xuất</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Row>
                    <Row className="m-2">
                        <MainContent children={children} />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default MainLayout;
