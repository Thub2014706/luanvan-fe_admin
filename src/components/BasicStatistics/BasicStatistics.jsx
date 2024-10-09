import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { dailyRevenue } from '~/services/StatisticalService';

const BasicStatistics = () => {
    const [revenue1, setRevenue1] = useState()

    useEffect(() => {
        const fetchFilms = async () => {
            const data1 = await dailyRevenue()
            setRevenue1(data1)
        };

        fetchFilms();
    }, []);

    return (
        <div>
            <Row>
                <Col xs={3}>
                    <Row className="card-statis">
                        <Col xs={10}>
                            <p>DOANH THU TRONG NGÀY</p>
                            <p>{revenue1} Vnđ</p>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                </Col>
                
            </Row>
        </div>
    );
};

export default BasicStatistics;
