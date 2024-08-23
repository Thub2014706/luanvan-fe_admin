import { CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addDiscount, detailDiscount, updateDiscount } from '~/services/DiscountService';

const AddDiscountPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [code, setCode] = useState();
    const [percent, setPercent] = useState();
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const data = await detailDiscount(id);
                setName(data.name);
                setCode(data.code);
                setPercent(data.percent);
                setQuantity(data.quantity);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            if (await updateDiscount(id, { name, code, percent, quantity }, user?.accessToken)) {
                navigate('/discount');
            }
        } else {
            if (await addDiscount({ name, code, percent, quantity }, user?.accessToken)) {
                navigate('/discount');
            }
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Mã khuyến mãi</h5>
            <CForm>
                <CRow className="mb-3">
                    <CCol>
                        <h6>{id ? 'Cập nhật' : 'Thêm'} mã khuyến mãi</h6>
                    </CCol>
                    <CCol>
                        <div className="button add float-end" onClick={handleSubmit}>
                            Chấp nhận
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
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
                    </CCol>
                    <CCol>
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
                    </CCol>
                    <CCol>
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
                    </CCol>
                    <CCol>
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
                    </CCol>
                </CRow>
            </CForm>
        </div>
    );
};

export default AddDiscountPage;
