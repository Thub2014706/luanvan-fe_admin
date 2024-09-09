import { CCol, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import React, { useEffect, useRef, useState } from 'react';
import { typeUserPrice } from '~/constants';
import momo from '~/assets/images/Logo-MoMo-Circle.webp';
import { useDispatch, useSelector } from 'react-redux';
import { idOrderValue, preStep1, priceValue, removeAll } from '~/features/comboCart/comboCart';
import { momoPaymentCombo } from '~/services/MomoService';
import { addOrderCombo } from '~/services/OrderComboService';
import { useNavigate } from 'react-router-dom';
import { detailUserByPhone } from '~/services/UserService';
import { Button } from 'react-bootstrap';
import { Html5QrcodeScanner } from 'html5-qrcode';

const PayCombo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [selectUser, setSelectUser] = useState('different');
    const [war, setWar] = useState('');
    const [showReader, setShowReader] = useState(false);
    const [phone, setPhone] = useState('');
    const [userInfo, setUserInfo] = useState({
        _id: '',
        username: '',
        point: 0,
        email: '',
    });
    const combo = useSelector((state) => state.comboCart.combo);
    const price = useSelector((state) => state.comboCart.price);
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

    const handleSelectUser = (value) => {
        setWar('');
        setSelectUser(value);
        if (value !== typeUserPrice[3]) {
            setPhone('');
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

    const handlePre = () => {
        dispatch(preStep1());
    };

    const handleSubmit = async () => {
        if (selectUser === typeUserPrice[3] && phone === '') {
            setWar('Nhập số điện thoại thành viên');
        } else if (selectUser === typeUserPrice[3] && phone !== '' && userInfo.username === '') {
            setWar('Thành viên không tồn tại');
        } else if (war === '') {
            if (selectPay === 'momo') {
                const data = await momoPaymentCombo({ amount: price });
                await addOrderCombo(
                    {
                        idOrder: data.orderId,
                        staff: user?.data.id,
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
                const data = await addOrderCombo(
                    {
                        staff: user?.data.id,
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
                    navigate('/order-food/success');
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
        <div>
            <div className="d-flex mb-5">
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
        </div>
    );
};

export default PayCombo;
