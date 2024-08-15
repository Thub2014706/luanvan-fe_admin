import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Menu from '../components/Menu/Menu';
import MainContent from '../components/MainContent/MainContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/services/UserService';

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);

    const handleLogout = async () => {
        await logout(dispatch, user?.accessToken);
    };

    return (
        <Container fluid className="background">
            <Row>
                <Col xs={2}>
                    <Menu />
                </Col>
                <Col xs={10}>
                    <Row className="m-4">
                        <div className="d-flex justify-content-end align-items-center">
                            <FontAwesomeIcon icon={faAddressCard} color="white" />
                            <p className="text-white my-auto ms-2" onClick={handleLogout}>
                                {user.data.username}
                            </p>
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
