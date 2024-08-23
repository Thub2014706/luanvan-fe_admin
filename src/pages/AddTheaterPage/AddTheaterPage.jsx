import { CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
// import { CCol, Form, CRow } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from 'sub-vn';
import RoomList from '~/components/RoomList/RoomList';
import { addTheater, detailTheater, updateTheater } from '~/services/TheaterService';

const AddTheaterPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
    const [name, setName] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [nameProvince, setNameProvince] = useState('');
    const [nameDistrict, setNameDistrict] = useState('');
    const [nameWard, setNameWard] = useState('');
    const [address, setAddress] = useState('');
    const [idAdd, setIdAdd] = useState();

    const provinces = getProvinces();
    const districts = getDistrictsByProvinceCode(province);
    const wards = getWardsByDistrictCode(district);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
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
            }
        };
        fetch();
    }, [id]);

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

    console.log(nameProvince);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
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
            );
        } else {
            const data = await addTheater(
                {
                    name,
                    province: nameProvince,
                    district: nameDistrict,
                    ward: nameWard,
                    address,
                },
                user?.accessToken,
            );
            setIdAdd(data._id);
        }
    };

    return (
        <div>
            <div className="p-4">
                <h5 className="mb-4 fw-bold">Rạp phim</h5>
                <CForm>
                    <CRow className="mb-3">
                        <CCol>
                            <h6>{id ? 'Cập nhật' : 'Thêm'} rạp phim</h6>
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
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-3"
                                placeholder="Tên"
                            />
                        </CCol>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="province">
                                Tỉnh <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CFormSelect id="province" value={province} onChange={handleProvince} required>
                                <option value="">---Chọn Tỉnh---</option>
                                {provinces.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </CFormSelect>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="district">
                                Quận/Huyện <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CFormSelect id="district" value={district} onChange={handleDistrict} required>
                                <option value="">---Chọn Quận/Huyện---</option>
                                {districts.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol>
                            <CFormLabel className="fw-bold" htmlFor="ward">
                                Phường/Xã <span style={{ color: 'red' }}>*</span>
                            </CFormLabel>
                            <CFormSelect id="ward" value={ward} onChange={handleWard} required>
                                <option value="">---Chọn Phường/Xã---</option>
                                {wards.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol>
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
                        </CCol>
                    </CRow>
                </CForm>
            </div>
            <hr />
            {id && <RoomList idTheater={id} />}
            {idAdd && <RoomList idTheater={idAdd} />}
        </div>
    );
};

export default AddTheaterPage;
