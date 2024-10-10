import { faCalculator, faCoins, faSackDollar, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { dailyRevenue, newUser, totalRevenue, totalTicket } from '~/services/StatisticalService';

const BasicStatistics = () => {
    const [revenue1, setRevenue1] = useState();
    const [revenue2, setRevenue2] = useState();
    const [revenue3, setRevenue3] = useState();
    const [revenue4, setRevenue4] = useState();

    useEffect(() => {
        const fetchFilms = async () => {
            const data1 = await dailyRevenue();
            setRevenue1(data1);
            const data2 = await newUser();
            setRevenue2(data2);
            const data3 = await totalTicket();
            setRevenue3(data3);
            const data4 = await totalRevenue();
            setRevenue4(data4);
        };

        fetchFilms();
    }, []);

    return (
        <div>
            <Row>
                <Col xs={3}>
                    <Row className="card-statis" style={{ width: '100%' }}>
                        <Col xs={10}>
                            <p style={{ marginBottom: '5px' }}>DOANH THU TRONG NGÀY</p>
                            <p className="fw-bold">{revenue1?.toLocaleString('it-IT')} VNĐ</p>
                            <p style={{ color: '#6971e1', fontSize: '0.9rem', marginBottom: '5px' }}>
                                {moment().format('DD-MM-YYYY')}
                            </p>
                        </Col>
                        <Col xs={2}>
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: '#6971e1',
                                    width: '30px',
                                    height: '30px',
                                }}
                            >
                                <FontAwesomeIcon color="white" icon={faCoins} />
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col xs={3}>
                    <Row className="card-statis" style={{ width: '100%' }}>
                        <Col xs={10}>
                            <p style={{ marginBottom: '5px' }}>KHÁCH HÀNG MỚI</p>
                            <p className="fw-bold">{revenue2}</p>
                            <p style={{ color: '#1cbca2', fontSize: '0.9rem', marginBottom: '5px' }}>
                                {moment().format('DD-MM-YYYY')}
                            </p>
                        </Col>
                        <Col xs={2}>
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: '#1cbca2',
                                    width: '30px',
                                    height: '30px',
                                }}
                            >
                                <FontAwesomeIcon color="white" icon={faUserGroup} />
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col xs={3}>
                    <Row className="card-statis" style={{ width: '100%' }}>
                        <Col xs={10}>
                            <p style={{ marginBottom: '5px' }}>TỔNG VÉ</p>
                            <p className="fw-bold">{revenue3}</p>
                            <p style={{ color: '#fa524f', fontSize: '0.9rem', marginBottom: '5px' }}>aaaa</p>
                        </Col>
                        <Col xs={2}>
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: '#fa524f',
                                    width: '30px',
                                    height: '30px',
                                }}
                            >
                                <FontAwesomeIcon color="white" icon={faCalculator} />
                            </div>
                        </Col>
                    </Row>
                </Col>

                <Col xs={3}>
                    <Row className="card-statis" style={{ width: '100%' }}>
                        <Col xs={10}>
                            <p style={{ marginBottom: '5px' }}>TỔNG DOANH THU</p>
                            <p className="fw-bold">{revenue4?.toLocaleString('it-IT')} VNĐ</p>
                            <p style={{ color: '#eca846', fontSize: '0.9rem', marginBottom: '5px' }}>aaaa</p>
                        </Col>
                        <Col xs={2}>
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: '#eca846',
                                    width: '30px',
                                    height: '30px',
                                }}
                            >
                                <FontAwesomeIcon color="white" icon={faSackDollar} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default BasicStatistics;
