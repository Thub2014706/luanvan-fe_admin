import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CompletedTicket from '~/components/CompletedTicket/CompletedTicket';
import RefundedTicket from '~/components/RefundedTicket/RefundedTicket';
import SearchOrder from '~/components/SearchOrder/SearchOrder';

const ListOrderPage = () => {
    const [step, setStep] = useState(1);
    const [theater, setTheater] = useState([]);
    const [number, setNumber] = useState(1);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <CompletedTicket theater={theater} number={number} setNumber={(value) => setNumber(value)} />;
            case 2:
                return <RefundedTicket theater={theater} number={number} setNumber={(value) => setNumber(value)} />;
            default:
                return null;
        }
    };

    console.log(theater);
    
    const handleSearchAll = async (value) => {
        setTheater(value);
        setNumber(1);
    };

    return (
        <div className="p-4" style={{ overflowX: 'auto', minWidth: '100%' }}>
            <Row>
                <Col>
                    <h5 className="mb-4 fw-bold">Danh sách vé</h5>
                </Col>
                <Col xs="auto">
                    <SearchOrder handleSearchAll={handleSearchAll} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col
                    className="pb-2"
                    xs="auto"
                    style={{
                        borderBottom: step === 1 ? '2px solid #264c9a' : '1px solid gray',
                        color: step === 1 ? '#264c9a' : 'black',
                        cursor: 'pointer',
                    }}
                    onClick={() => setStep(1)}
                >
                    Vé đã hoàn tất
                </Col>
                <Col
                    className="pb-2"
                    xs="auto"
                    style={{
                        borderBottom: step === 2 ? '2px solid #264c9a' : '1px solid gray',
                        color: step === 2 ? '#264c9a' : 'black',
                        cursor: 'pointer',
                    }}
                    onClick={() => setStep(2)}
                >
                    Vé đã hoàn trả
                </Col>
                <Col className="pb-2" style={{ borderBottom: '1px solid gray' }}></Col>
            </Row>
            <div>{renderStep(step)}</div>
        </div>
    );
};

export default ListOrderPage;
