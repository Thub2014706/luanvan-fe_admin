import React  from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SelectFilm from '~/components/SelectFilm/SelectFilm';
import SelectSeat from '~/components/SelectSeat/SelectSeat';
import SelectShowTime from '~/components/SelectShowTime/SelectShowTime';
import Step from '~/components/Step/Step';
import { theaterValue } from '~/features/showTime/showTimeSlice';

const BookTicketsPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch()
    dispatch(theaterValue(user?.data.theater))
    const step = useSelector((state) => state.showTime.step);
    // console.log('qqq', step);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <SelectFilm />;
            case 2:
                return <SelectShowTime />;
            case 3:
                return <SelectSeat />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4">
            <Row className="mb-5">
                <Col xs={2}>
                    <h5 className="fw-bold">Đặt vé</h5>
                </Col>
                <Col xs={10}>
                    <div className="float-end">
                        <Step
                            length={4}
                            step={step}
                            name={['Chọn phim', 'Chọn suất chiếu', 'Chọn ghế', 'Thanh toán']}
                        />
                    </div>
                </Col>
            </Row>
            <div>{renderStep(step)}</div>
        </div>
    );
};

export default BookTicketsPage;
