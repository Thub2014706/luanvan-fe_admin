import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { preStep3 } from '~/features/showTime/showTimeSlice';
import CardBookTicket from '../CardBookTicket/CardBookTicket';
import { CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { detailUserByPhone } from '~/services/UserService';
import momo from '~/assets/images/Logo-MoMo-Circle.webp';

const PaymentStaff = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [phone, setPhone] = useState('');
    const [userInfo, setUserInfo] = useState({
        username: '',
        point: 0,
        email: '',
    });
    const [typeUser, setTypeUser] = useState('flexRadioDefault2');
    const [showReader, setShowReader] = useState(false);

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
    // console.log(userInfo);

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

    console.log(typeUser);
    // if (scanResult !== null) {
    //     const info = JSON.parse(scanResult);
    //     setUserInfo(info);
    // }

    const handlePre = () => {
        dispatch(preStep3());
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
                        name="typeUser"
                        value="flexRadioDefault1"
                        id="flexRadioDefault1"
                        onChange={(e) => setTypeUser(e.target.value)}
                        label="Học sinh, sinh viên"
                        checked={typeUser === 'flexRadioDefault1'}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="typeUser"
                        value="flexRadioDefault2"
                        id="flexRadioDefault2"
                        onChange={(e) => setTypeUser(e.target.value)}
                        label="Người lớn"
                        checked={typeUser === 'flexRadioDefault2'}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="typeUser"
                        value="flexRadioDefault3"
                        id="flexRadioDefault3"
                        onChange={(e) => setTypeUser(e.target.value)}
                        label="Người già, trẻ em"
                        checked={typeUser === 'flexRadioDefault3'}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="typeUser"
                        value="flexRadioDefault4"
                        id="flexRadioDefault4"
                        onChange={(e) => setTypeUser(e.target.value)}
                        label="Thành viên"
                        checked={typeUser === 'flexRadioDefault4'}
                    />
                    <CFormCheck
                        className="ms-4"
                        type="radio"
                        name="typeUser"
                        value="flexRadioDefault5"
                        id="flexRadioDefault5"
                        onChange={(e) => setTypeUser(e.target.value)}
                        label="Khác"
                        checked={typeUser === 'flexRadioDefault5'}
                    />
                </div>
                {typeUser === 'flexRadioDefault4' && (
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
                {typeUser === 'flexRadioDefault5' && (
                    <div className="mb-5">
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput type="number" id="inputPassword" />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Học sinh, sinh viên
                            </CFormLabel>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput type="number" id="inputPassword" />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Người lớn
                            </CFormLabel>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol sm={1}>
                                <CFormInput type="number" id="inputPassword" />
                            </CCol>
                            <CFormLabel htmlFor="inputPassword" className="col-sm-11 col-form-label">
                                Người già, trẻ em
                            </CFormLabel>
                        </CRow>
                    </div>
                )}
                <div className="card-pay">
                    <h6 className="fw-bold">CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
                    <div className="momo mt-3">
                        Ví MoMo <img src={momo} height={30} width={30} alt="" />
                    </div>
                    <div className="money mt-3">Thanh toán bằng tiền mặt</div>
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
