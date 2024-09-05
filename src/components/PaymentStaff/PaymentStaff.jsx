import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { idOrderValue, preStep3, priceValue, stepNext } from '~/features/showTime/showTimeSlice';
import CardBookTicket from '../CardBookTicket/CardBookTicket';
import { CCol, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { detailUserByPhone } from '~/services/UserService';
import momo from '~/assets/images/Logo-MoMo-Circle.webp';
import { showToast, typeUserPrice, useQueryParams } from '~/constants';
import { detailPriceByUser } from '~/services/PriceService';
import { checkStatus, momoPayment } from '~/services/MomoService';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderTicket } from '~/services/OrderTicketService';

const PaymentStaff = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const time = useSelector((state) => state.showTime.time);
    const price = useSelector((state) => state.showTime.price);
    const [userInfo, setUserInfo] = useState({
        username: '',
        point: 0,
        email: '',
    });
    const [selectUser, setSelectUser] = useState(typeUserPrice[1]);
    const [numUser, setNumUser] = useState([0, 0, 0]);
    const [showReader, setShowReader] = useState(false);
    const room = useSelector((state) => state.showTime.room);
    const seat = useSelector((state) => state.showTime.seat);
    const idShowTime = useSelector((state) => state.showTime.idShowTime);
    const [war, setWar] = useState('');

    useEffect(() => {
        if (showReader) {
            const scanner = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 10,
            });

            const success = (result) => {
                const info = JSON.parse(result);
                setPhone(info.phone);
                // scanner.clear();
            };

            const error = (err) => {
                console.log(err);
            };

            scanner.render(success, error);
        }
    }, [showReader]);

    useEffect(() => {
        const fetch = async () => {
            if (phone !== '') {
                const data = await detailUserByPhone(phone);
                if (data) {
                    setUserInfo(data);
                }
            } else {
                setUserInfo({
                    username: '',
                    point: 0,
                    email: '',
                });
            }
        };
        fetch();
    }, [phone]);

    useEffect(() => {
        const fetch = async () => {
            if (selectUser !== 'different') {
                let data = await Promise.all(
                    seat.map(
                        async (item) => await detailPriceByUser(selectUser, time.date, time.timeStart, room, item._id),
                    ),
                );
                const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                dispatch(priceValue(sum));
            } else {
                let data = await Promise.all(
                    [typeUserPrice[0], typeUserPrice[1], typeUserPrice[2]].map(
                        async (item) => await detailPriceByUser(item, time.date, time.timeStart, room, seat[0]._id),
                    ),
                );
                const sum = data.reduce(
                    (accumulator, currentValue, currentIndex) => accumulator + currentValue * numUser[currentIndex],
                    0,
                );
                dispatch(priceValue(sum));
            }
        };
        fetch();
    }, [numUser, seat, room, selectUser, dispatch, time]);

    // console.log(price);

    const handlePre = () => {
        dispatch(preStep3());
    };

    const handleInputChange = (index, value) => {
        setWar('');
        const newNumUser = [...numUser];
        newNumUser[index] = parseInt(value, 10);
        setNumUser(newNumUser);
    };

    const handleMomo = async () => {
        if (
            selectUser === 'different' &&
            numUser.reduce((accumulator, currentValue) => accumulator + currentValue, 0) !== seat.length
        ) {
            setWar('Số khách hàng chưa đủ với số ghế đã đặt');
        } else {
            const data = await momoPayment({ amount: price });
            await addOrderTicket(
                {
                    idOrder: data.orderId,
                    showTime: idShowTime,
                    staff: user?.data.id,
                    seat: seat.map((item) => item._id),
                    price,
                    paymentMethod: 'momo',
                },
                user?.accessToken,
            );
            dispatch(idOrderValue(data.orderId));
            window.location.href = data.payUrl;
            // console.log(data);
        }
    };

    // useEffect(() => {
    //     const fetch = async () => {
    //         if (query.get('orderId')) {
    //             const data = await checkStatus({ orderId: query.get('orderId') });
    //             dispatch(idOrderValue(data.orderId));
    //         }
    //     };
    //     fetch();
    // }, [dispatch, idOrder]);
    // console.log('iii', idOrder);

    const handleMoney = async () => {
        if (
            selectUser === 'different' &&
            numUser.reduce((accumulator, currentValue) => accumulator + currentValue, 0) !== seat.length
        ) {
            setWar('Số khách hàng chưa đủ với số ghế đã đặt');
        } else {
            const data = await addOrderTicket(
                {
                    showTime: idShowTime,
                    staff: user?.data.id,
                    seat: seat.map((item) => item._id),
                    price,
                    paymentMethod: 'cash',
                },
                user?.accessToken,
            );
            if (data) {
                dispatch(idOrderValue(data.idOrder));
                console.log(data._id)
                navigate('/book-tickets/success');
            }
        }
    };

    return (
        <CRow className="mt-4">
            <CCol xs={3}>
                <CardBookTicket />
            </CCol>
            <CCol xs={9}>
                <div className="d-flex mb-5">
                    <CFormCheck
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[0]}
                        id="flexRadioDefault1"
                        onChange={(e) => setSelectUser(e.target.value)}
                        label="Học sinh, sinh viên"
                        checked={selectUser === typeUserPrice[0]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[1]}
                        id="flexRadioDefault2"
                        onChange={(e) => setSelectUser(e.target.value)}
                        label="Người lớn"
                        checked={selectUser === typeUserPrice[1]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[2]}
                        id="flexRadioDefault3"
                        onChange={(e) => setSelectUser(e.target.value)}
                        label="Người già, trẻ em"
                        checked={selectUser === typeUserPrice[2]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[3]}
                        id="flexRadioDefault4"
                        onChange={(e) => setSelectUser(e.target.value)}
                        label="Thành viên"
                        checked={selectUser === typeUserPrice[3]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value="different"
                        id="flexRadioDefault5"
                        onChange={(e) => setSelectUser(e.target.value)}
                        label="Khác"
                        checked={selectUser === 'different'}
                    />
                </div>
                {selectUser === typeUserPrice[3] && (
                    <div className="mb-5">
                        <Button className="mb-2" onClick={() => setShowReader(!showReader)}>
                            {showReader ? 'Ẩn máy quét' : 'Hiển thị máy quét'}
                        </Button>
                        {showReader && <div id="reader"></div>}
                        <div>
                            <CRow className="mt-3">
                                <CFormLabel className="fw-bold my-auto col-sm-2">Số điện thoại</CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput
                                        value={phone}
                                        name="phone"
                                        placeholder="Số điện thoại"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CFormLabel className="fw-bold my-auto col-sm-2">Tên khách hàng</CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput value={userInfo.username} disabled placeholder="Tên" />
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CFormLabel className="fw-bold my-auto col-sm-2">Điểm</CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput value={userInfo.point} disabled placeholder="Điểm" />
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                )}
                {selectUser === 'different' && (
                    <div className="mb-5">
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput
                                    type="number"
                                    value={numUser[0]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            0,
                                            Math.min(
                                                Math.min(
                                                    Math.max(e.target.value, 0),
                                                    seat.length - numUser[1] - numUser[2],
                                                ),
                                                seat.length - 1,
                                            ),
                                        )
                                    }
                                />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Học sinh, sinh viên
                            </CFormLabel>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput
                                    type="number"
                                    value={numUser[1]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            1,
                                            Math.min(
                                                Math.min(
                                                    Math.max(e.target.value, 0),
                                                    seat.length - numUser[0] - numUser[2],
                                                ),
                                                seat.length - 1,
                                            ),
                                        )
                                    }
                                />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Người lớn
                            </CFormLabel>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput
                                    type="number"
                                    value={numUser[2]}
                                    onChange={(e) =>
                                        handleInputChange(
                                            2,
                                            Math.min(
                                                Math.min(
                                                    Math.max(e.target.value, 0),
                                                    seat.length - numUser[1] - numUser[0],
                                                ),
                                                seat.length - 1,
                                            ),
                                        )
                                    }
                                />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Người già, trẻ em
                            </CFormLabel>
                        </CRow>
                        {war !== '' && <p style={{ color: 'red', position: 'absolute' }}>{war}</p>}
                    </div>
                )}
                <div className="card-pay mt-2">
                    <h6 className="fw-bold">CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
                    <div className="momo mt-3" onClick={() => handleMomo()}>
                        Ví MoMo <img src={momo} height={30} width={30} alt="" />
                    </div>
                    <div className="money mt-3" onClick={() => handleMoney()}>
                        Thanh toán bằng tiền mặt
                    </div>
                </div>
                <div className="float-end d-flex">
                    <div className="mt-5 button add me-3" onClick={handlePre}>
                        Quay lại
                    </div>
                    {/* <div className="mt-5 button add">Thanh toán</div> */}
                </div>
            </CCol>
        </CRow>
    );
};

export default PaymentStaff;
