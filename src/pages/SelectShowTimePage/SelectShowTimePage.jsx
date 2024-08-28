import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageBase from '~/components/ImageBase/ImageBase';
import Name from '~/components/Name/Name';
import SelectSeat from '~/components/SelectSeat/SelectSeat';
import SelectShowTime from '~/components/SelectShowTime/SelectShowTime';
import Step from '~/components/Step/Step';
import { roomValue, stepNext } from '~/features/showTime/showTimeSlice';
import { detailFilm } from '~/services/FilmService';
import { detailRoom } from '~/services/RoomService';
import { detailShowTimeByTime } from '~/services/ShowTimeService';
import { detailTheater } from '~/services/TheaterService';

const SelectShowTimePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
    const dispatch = useDispatch();
    const theater = user?.data.theater;
    const [film, setFilm] = useState(null);
    // const [step, setStep] = useState(1);
    const step = useSelector((state) => state.showTime.step);
    // const [idRoom, setIdRoom] = useState(useSelector((state) => state.showTime.room));
    const idRoom = useSelector((state) => state.showTime.room);
    const [time, setTime] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(id);
            setFilm(data);
        };
        fetch();
    }, [id]);

    const handleNext1 = async (date, timeStart, timeEnd) => {
        setTime({ date, timeStart, timeEnd });
        const data = await detailShowTimeByTime(theater, timeStart, timeEnd, date);
        // console.log('wedw', data, date, timeStart, timeEnd);
        // setIdRoom(data.room);
        dispatch(roomValue(data.room));
        dispatch(stepNext(2));
    };

    console.log(idRoom, step);

    const renderStep = (step) => {
        switch (step) {
            case 1:
                return <SelectShowTime id={id} theater={theater} handleNext={handleNext1} />;
            case 2:
                return <SelectSeat idRoom={idRoom} />;
            //   case 2:
            //     return <Review />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Chọn suất chiếu</h5>
            <Row>
                <Col xs={3}>
                    <h6 className="fw-bold" style={{ textTransform: 'uppercase' }}>
                        Phim: <Name detail={detailFilm} id={id} />
                    </h6>
                </Col>
                <Col xs={9}>
                    <Step length={3} step={step} name={['Chọn suất chiếu', 'Chọn ghế', 'Thanh toán']} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={3}>
                    <div className="card-book">
                        {film !== null && (
                            <>
                                <ImageBase
                                    pathImg={film.image}
                                    style={{
                                        height: '200px',
                                        width: '100%',
                                        borderRadius: '5px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'flex',
                                        objectFit: 'cover',
                                    }}
                                />
                                <p className="fw-bold mt-3 mx-2">{film.name.toUpperCase()}</p>
                                <p className="mt-3 mx-2">
                                    Giới hạn độ tuổi: <span className="fw-bold">{film.age}</span>
                                </p>
                                <p className="mt-3 mx-2">
                                    Rạp:{' '}
                                    <span className="fw-bold">
                                        <Name detail={detailTheater} id={theater} />
                                    </span>
                                </p>
                                {idRoom !== '' && (
                                    <p className="mt-3 mx-2">
                                        Phòng:{' '}
                                        <span className="fw-bold">
                                            <Name detail={detailRoom} id={idRoom} />
                                        </span>
                                    </p>
                                )}
                                {time && (
                                    <p className="mt-3 mx-2">
                                        Suất chiếu:{' '}
                                        <span className="fw-bold">
                                            {time.timeStart} {moment(time.date).format('DD-MM-YYYY')}
                                        </span>
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </Col>
                <Col xs={9}>{renderStep(step)}</Col>
            </Row>
        </div>
    );
};

export default SelectShowTimePage;
