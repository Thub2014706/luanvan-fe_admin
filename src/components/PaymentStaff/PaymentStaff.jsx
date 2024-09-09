import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { idOrderValue, preStep3, priceValue, removeAll } from '~/features/showTime/showTimeSlice';
import CardBookTicket from '../CardBookTicket/CardBookTicket';
import { CCol, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import { detailUserByPhone } from '~/services/UserService';
import momo from '~/assets/images/Logo-MoMo-Circle.webp';
import { typeUserPrice } from '~/constants';
import { detailPriceByUser } from '~/services/PriceService';
import { momoPaymentTicket } from '~/services/MomoService';
import { useNavigate } from 'react-router-dom';
import { addOrderTicket } from '~/services/OrderTicketService';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from 'react-bootstrap';

const PaymentStaff = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const [showReader, setShowReader] = useState(false);
    const [phone, setPhone] = useState('');
    const time = useSelector((state) => state.showTime.time);
    const price = useSelector((state) => state.showTime.price);
    const [userInfo, setUserInfo] = useState({
        _id: '',
        username: '',
        point: 0,
        email: '',
    });
    const [selectUser, setSelectUser] = useState(typeUserPrice[1]);
    const [numUser, setNumUser] = useState([0, 0, 0]);
    const room = useSelector((state) => state.showTime.room);
    const seat = useSelector((state) => state.showTime.seat);
    const idShowTime = useSelector((state) => state.showTime.idShowTime);
    const [war, setWar] = useState('');
    const combo = useSelector((state) => state.showTime.combo);
    const [point, setPoint] = useState(0);
    const timeoutRef = useRef(null);
    const [copyPrice, setCopyPrice] = useState(price);
    const [selectPay, setSelectPay] = useState('cash');

    useEffect(() => {
        const fetch = async () => {
            if (phone !== '') {
                const data = await detailUserByPhone(phone);
                if (data) {
                    setUserInfo(data);
                } else {
                    setUserInfo({
                        _id: '',
                        username: '',
                        point: 0,
                        email: '',
                    });
                }
            } else {
                setUserInfo({
                    _id: '',
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
                setCopyPrice(sum);
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
                setCopyPrice(sum);
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

    const handleSelectUser = (value) => {
        setWar('');
        setSelectUser(value);
        if (value !== typeUserPrice[3]) {
            setPhone('');
        }
        if (value !== 'different') {
            setNumUser([0, 0, 0]);
        }
    };

    const handlePoint = (e) => {
        setWar('');
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const value = Number(e.target.value);

        setPoint(value);
        timeoutRef.current = setTimeout(() => {
            if (value < 20000 && value > 0) {
                setWar('Điểm thanh toán phải tối thiểu 20000đ.');
            } else if (value > userInfo.point) {
                setWar('Điểm thanh toán đã vượt quá số điểm của bạn.');
            } else if (value > price) {
                setWar('Điểm thanh toán đã vượt quá số tiền thanh toán.');
            } else dispatch(priceValue(copyPrice - value));
        }, 500);
    };
    // console.log();

    const handleSubmit = async () => {
        if (
            selectUser === 'different' &&
            numUser.reduce((accumulator, currentValue) => accumulator + currentValue, 0) !== seat.length
        ) {
            setWar('Số khách hàng chưa đủ với số ghế đã đặt');
        } else if (selectUser === typeUserPrice[3] && phone === '') {
            setWar('Nhập số điện thoại thành viên');
        } else if (selectUser === typeUserPrice[3] && phone !== '' && userInfo.username === '') {
            setWar('Thành viên không tồn tại');
        } else if (war === '') {
            if (selectPay === 'momo') {
                const data = await momoPaymentTicket({ amount: price });
                await addOrderTicket(
                    {
                        idOrder: data.orderId,
                        showTime: idShowTime,
                        staff: user?.data.id,
                        seat: seat.map((item) => item._id),
                        price,
                        paymentMethod: 'momo',
                        member: userInfo._id,
                        combo,
                        usePoint: point,
                    },
                    user?.accessToken,
                );
                dispatch(idOrderValue(data.orderId));
                window.location.href = data.payUrl;
                console.log(data);
            } else {
                const data = await addOrderTicket(
                    {
                        showTime: idShowTime,
                        staff: user?.data.id,
                        seat: seat.map((item) => item._id),
                        price,
                        paymentMethod: 'cash',
                        member: userInfo._id,
                        combo,
                        usePoint: point,
                    },
                    user?.accessToken,
                );
                if (data) {
                    dispatch(idOrderValue(data.idOrder));
                    dispatch(removeAll());
                    console.log(data._id);
                    navigate('/book-tickets/success');
                }
            }
        }
    };

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
                        onChange={(e) => handleSelectUser(e.target.value)}
                        label="Học sinh, sinh viên"
                        checked={selectUser === typeUserPrice[0]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[1]}
                        id="flexRadioDefault2"
                        onChange={(e) => handleSelectUser(e.target.value)}
                        label="Người lớn"
                        checked={selectUser === typeUserPrice[1]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[2]}
                        id="flexRadioDefault3"
                        onChange={(e) => handleSelectUser(e.target.value)}
                        label="Người già, trẻ em"
                        checked={selectUser === typeUserPrice[2]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value={typeUserPrice[3]}
                        id="flexRadioDefault4"
                        onChange={(e) => handleSelectUser(e.target.value)}
                        label="Thành viên"
                        checked={selectUser === typeUserPrice[3]}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="selectUser"
                        value="different"
                        id="flexRadioDefault5"
                        onChange={(e) => handleSelectUser(e.target.value)}
                        label="Khác"
                        checked={selectUser === 'different'}
                    />
                </div>
                {selectUser === typeUserPrice[3] && (
                    <div className="mb-5">
                        <Button
                            className="mb-2"
                            onClick={() => {
                                setWar('');
                                setShowReader(!showReader);
                            }}
                        >
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
                                        onChange={(e) => {
                                            setWar('');
                                            setPhone(e.target.value);
                                        }}
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CCol>
                                    <CRow>
                                        <CFormLabel className="fw-bold my-auto col-sm-4">Tên khách hàng</CFormLabel>
                                        <CCol sm={8}>
                                            <CFormInput value={userInfo.username} disabled placeholder="Tên" />
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol>
                                    <CRow>
                                        <CFormLabel className="fw-bold my-auto col-sm-2">Điểm</CFormLabel>
                                        <CCol sm={10}>
                                            <CFormInput value={userInfo.point} disabled placeholder="Điểm" />
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CRow className="mt-3">
                                <CFormLabel className="fw-bold my-auto col-sm-2">
                                    Sử dụng điểm thanh toán (tối thiểu 20000đ)
                                </CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput
                                        type="number"
                                        value={point}
                                        disabled={
                                            phone === '' ||
                                            (phone !== '' && userInfo.point < 20000) ||
                                            (phone !== '' && price < 20000)
                                                ? true
                                                : false
                                        }
                                        onChange={handlePoint}
                                        placeholder="Sử dụng điểm thanh toán (tối thiểu 20000đ)"
                                    />
                                </CCol>
                            </CRow>
                        </div>
                        {war !== '' && <p style={{ color: 'red', position: 'absolute' }}>{war}</p>}
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
                                                seat.length > 1 ? seat.length - 1 : seat.length,
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
                                                seat.length > 1 ? seat.length - 1 : seat.length,
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
                                                seat.length > 1 ? seat.length - 1 : seat.length,
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
                    <div
                        className={`select-pay mt-3 ${selectPay === 'momo' ? 'select' : 'none'}`}
                        onClick={() => setSelectPay('momo')}
                        style={{ padding: '5px 20px' }}
                    >
                        Ví MoMo <img src={momo} height={30} width={30} alt="" />
                    </div>
                    <div
                        style={{ padding: '10px 20px' }}
                        className={`select-pay mt-3 ${selectPay === 'cash' ? 'select' : 'none'}`}
                        onClick={() => setSelectPay('cash')}
                    >
                        Thanh toán bằng tiền mặt
                    </div>
                </div>
                <div className="float-end d-flex">
                    <div className="mt-5 button add me-3" onClick={handlePre}>
                        Quay lại
                    </div>
                    <div className="mt-5 button add" onClick={handleSubmit}>
                        Thanh toán
                    </div>
                </div>
            </CCol>
        </CRow>
    );
};

export default PaymentStaff;
