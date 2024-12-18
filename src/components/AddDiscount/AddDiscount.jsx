import {
    CButton,
    CCol,
    CDatePicker,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { addDiscount, detailDiscount, updateDiscount } from '~/services/DiscountService';

const AddDiscount = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [code, setCode] = useState();
    const [minium, setMinium] = useState();
    const [level, setLevel] = useState(2);
    const [percent, setPercent] = useState();
    const [quantity, setQuantity] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                const data = await detailDiscount(id);
                setName(data.name);
                setCode(data.code);
                setPercent(data.percent);
                setMinium(data.minium);
                setLevel(data.level);
                setQuantity(data.quantity);
                setStartDate(data.startDate);
                setEndDate(data.endDate);
            } else {
                setName('');
                setCode();
                setPercent();
                setMinium();
                setLevel(2);
                setQuantity();
                setStartDate();
                setEndDate();
            }
        };
        fetch();
    }, [id]);
    console.log(id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            if (
                await updateDiscount(
                    id,
                    { name, code, percent, minium, level, quantity, startDate, endDate },
                    user?.accessToken,
                    axiosJWT,
                )
            ) {
                handleClose();
            }
        } else {
            if (
                await addDiscount(
                    { name, code, percent, minium, level, quantity, startDate, endDate },
                    user?.accessToken,
                    axiosJWT,
                )
            ) {
                handleClose();
            }
        }
    };
    console.log(minium, level);

    return (
        <CModal alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} mã khuyến mãi</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CFormLabel className="fw-bold" htmlFor="name">
                            Tên <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            required
                            type="text"
                            placeholder="Tên"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="code">
                            Mã <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="code"
                            type="text"
                            placeholder="Mã"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="percent">
                            Phần trăm <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="percent"
                            type="number"
                            placeholder="Phần trăm"
                            name="percent"
                            value={percent}
                            onChange={(e) => {
                                const value = Math.min(Math.max(e.target.value, 1), 100);
                                setPercent(value);
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="minium">
                            Tổng đơn tối thiểu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="minium"
                            type="number"
                            placeholder="Tổng đơn tối thiểu"
                            name="minium"
                            value={minium}
                            onChange={(e) => {
                                const value = Math.max(e.target.value, 0);
                                setMinium(value);
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="level">
                            Cấp độ thành viên hưởng ưu đãi <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <div className="d-flex">
                            <CFormCheck
                                type="radio"
                                name="level"
                                value={level}
                                id="flexRadioDefault1"
                                onChange={() => setLevel(0)}
                                label="Member"
                                checked={level === 0}
                            />
                            <CFormCheck
                                className="ms-4"
                                type="radio"
                                name="level"
                                value={level}
                                id="flexRadioDefault2"
                                onChange={() => setLevel(1)}
                                label="VIP"
                                checked={level === 1}
                            />
                            <CFormCheck
                                className="ms-4"
                                type="radio"
                                name="level"
                                value={level}
                                id="flexRadioDefault3"
                                onChange={() => setLevel(2)}
                                label="Cả hai"
                                checked={level === 2}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="quantity">
                            Số lượng <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="quantity"
                            type="number"
                            placeholder="Số lượng"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(e.target.value, 1))}
                        />
                    </div>
                    <CRow className="mt-3">
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="startDate">
                                Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CDatePicker
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                date={startDate}
                                onDateChange={(date) => setStartDate(moment(date).format('YYYY-MM-DD'))}
                                placeholder="Ngày bắt đầu"
                            />
                        </CCol>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="endDate">
                                Ngày kết thúc <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CDatePicker
                                id="endDate"
                                name="endDate"
                                value={endDate}
                                date={endDate}
                                onDateChange={(date) => setEndDate(moment(date).format('YYYY-MM-DD'))}
                                placeholder="Ngày kết thúc"
                            />
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleClose}>
                        Đóng
                    </CButton>
                    <CButton type="submit" color="primary">
                        Lưu
                    </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default AddDiscount;
