import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CardCombo from '~/components/CardCombo/CardCombo';
import Step from '~/components/Step/Step';
import { useSelector } from 'react-redux';
import PayCombo from '~/components/PayCombo/PayCombo';
import SelectCombo from '~/components/SelectCombo/SelectCombo';

const OrderFoodPage = () => {
    const step = useSelector((state) => state.comboCart.step);
    // console.log('qqq', step);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <SelectCombo />;
            case 2:
            return <PayCombo />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4">
            <Row className="mb-5">
                <Col xs={2}>
                    <h5 className="fw-bold">Đặt combo, bắp nước</h5>
                </Col>
                <Col xs={10}>
                    <div className="float-end">
                        <Step
                            length={2}
                            step={step}
                            name={['Chọn combo, bắp nước', 'Thanh toán']}
                        />
                    </div>
                </Col>
            </Row>
            <div>
                <Row className="mt-4">
                    <Col xs={3}>
                        <CardCombo />
                    </Col>
                    <Col xs={9} className="px-3">
                        {renderStep(step)}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default OrderFoodPage;
