import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getDistrictsByProvinceCode, getProvinces, getWardsByDistrictCode } from 'sub-vn';
import RoomList from '~/components/RoomList/RoomList';
import { addTheater, detailTheater, updateTheater } from '~/services/TheaterService';

const AddTheaterPage = () => {
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
            await updateTheater(id, {
                name,
                province: nameProvince,
                district: nameDistrict,
                ward: nameWard,
                address,
            });
        } else {
            const data = await addTheater({
                name,
                province: nameProvince,
                district: nameDistrict,
                ward: nameWard,
                address,
            });
            setIdAdd(data._id);
        }
    };

    return (
        <div>
            <div className="p-4">
                <h5 className="mb-4 fw-bold">Rạp phim</h5>
                <Form>
                    <Row className="mb-3">
                        <Col>
                            <h6>{id ? 'Cập nhật' : 'Thêm'} rạp phim</h6>
                        </Col>
                        <Col>
                            <div className="button add float-end" onClick={handleSubmit}>
                                Chấp nhận
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label className="fw-bold">
                                Tên <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-3"
                                placeholder="Tên"
                            />
                        </Col>
                        <Col>
                            <Form.Label className="fw-bold">
                                Tỉnh <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select value={province} onChange={handleProvince} required>
                                <option value="">---Chọn Tỉnh---</option>
                                {provinces.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label className="fw-bold">
                                Quận/Huyện <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select value={district} onChange={handleDistrict} required>
                                <option value="">---Chọn Quận/Huyện---</option>
                                {districts.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className="fw-bold">
                                Phường/Xã <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Select value={ward} onChange={handleWard} required>
                                <option value="">---Chọn Phường/Xã---</option>
                                {wards.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label className="fw-bold">
                                Số nhà <span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={address}
                                placeholder="Số nhà"
                                onChange={(e) => setAddress(e.target.value)}
                                className="mb-3"
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
            <hr />
            {id && <RoomList idTheater={id} />}
            {idAdd && <RoomList idTheater={idAdd} />}
        </div>
    );
};

export default AddTheaterPage;
