import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from 'sub-vn';
import { addTheater, detailTheater, updateTheater } from '~/services/TheaterService';

const AddTheater = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [nameProvince, setNameProvince] = useState('');
    const [nameDistrict, setNameDistrict] = useState('');
    const [nameWard, setNameWard] = useState('');
    const [address, setAddress] = useState('');

    const provinces = getProvinces();
    const districts = getDistrictsByProvinceCode(province);
    const wards = getWardsByDistrictCode(district);

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                const data = await detailTheater(id);
                setName(data.name);
                const getProvince = provinces.find((item) => item.name === data.province);
                setProvince(getProvince.code);
                const getDistrict = getDistrictsByProvinceCode(getProvince.code).find(
                    (item) => item.name === data.district,
                );
                setDistrict(getDistrict.code);
                const getWard = getWardsByDistrictCode(getDistrict.code).find((item) => item.name === data.ward);
                setWard(getWard.code);
                setAddress(data.address);
                setNameProvince(data.province);
                setNameDistrict(data.district);
                setNameWard(data.ward);
            } else {
                setName('');
                setProvince('');
                setDistrict('');
                setWard('');
                setAddress('');
                setNameProvince('');
                setNameDistrict('');
                setNameWard('');
            }
        };
        fetch();
    }, [id, provinces, show]);

    const handleProvince = (e) => {
        const code = e.target.value;
        setProvince(code);
        const findValue = provinces.find((item) => item.code === code);
        setNameProvince(findValue.name);
    };

    const handleDistrict = (e) => {
        const code = e.target.value;
        setDistrict(code);
        const findValue = districts.find((item) => item.code === code);
        setNameDistrict(findValue.name);
    };

    const handleWard = (e) => {
        const code = e.target.value;
        setWard(code);
        const findValue = wards.find((item) => item.code === code);
        setNameWard(findValue.name);
    };

    // console.log(nameProvince);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            if (
                await updateTheater(
                    id,
                    {
                        name,
                        province: nameProvince,
                        district: nameDistrict,
                        ward: nameWard,
                        address,
                    },
                    user?.accessToken,
                )
            ) {
                handleClose();
            }
        } else {
            if (
                await addTheater(
                    {
                        name,
                        province: nameProvince,
                        district: nameDistrict,
                        ward: nameWard,
                        address,
                    },
                    user?.accessToken,
                )
            ) {
                handleClose();
            }
        }
    };

    return (
        <CModal alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} rạp phim</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <CFormLabel className="fw-bold" htmlFor="name">
                            Tên <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-3"
                            placeholder="Tên"
                        />
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="province">
                            Tỉnh <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect id="province" value={province} onChange={handleProvince} required>
                            <option value="">---Chọn Tỉnh---</option>
                            {provinces.map((item) => (
                                <option value={item.code}>{item.name}</option>
                            ))}
                        </CFormSelect>
                    </div>

                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="district">
                            Quận/Huyện <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect id="district" value={district} onChange={handleDistrict} required>
                            <option value="">---Chọn Quận/Huyện---</option>
                            {districts.map((item) => (
                                <option value={item.code}>{item.name}</option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="ward">
                            Phường/Xã <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormSelect id="ward" value={ward} onChange={handleWard} required>
                            <option value="">---Chọn Phường/Xã---</option>
                            {wards.map((item) => (
                                <option value={item.code}>{item.name}</option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="mt-3">
                        <CFormLabel className="fw-bold" htmlFor="address">
                            Số nhà <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CFormInput
                            id="address"
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Số nhà"
                            onChange={(e) => setAddress(e.target.value)}
                            className="mb-3"
                        />
                    </div>
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

export default AddTheater;
