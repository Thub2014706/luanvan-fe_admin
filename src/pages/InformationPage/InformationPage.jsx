import { CCol, CFormInput, CFormLabel, CRow, CTimePicker } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import ImageBase from '~/components/ImageBase/ImageBase';
import moment from 'moment-timezone';
import { addInfomation, detailInfomation } from '~/services/InformationService';
import { useDispatch, useSelector } from 'react-redux';

const InformationPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [youtube, setYoutube] = useState('');
    const [timeStart, setTimeStart] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [copy, setCopy] = useState('');
    const [image, setImage] = useState();
    const [imageId, setImageId] = useState();
    const [imageEncode, setImageEncode] = useState();
    const info = useSelector((state) => state.information.data);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            if (info) {
                setName(info.name);
                setPhone(info.phone);
                setEmail(info.email);
                setFacebook(info.facebook);
                setInstagram(info.instagram);
                setTiktok(info.tiktok);
                setYoutube(info.youtube);
                setCopy(info.copy);
                setTimeStart(info.timeStart);
                setTimeEnd(info.timeEnd);
                setImageId(info.image);
            }
        };
        fetch();
    }, [info]);

    const handleImage = (e) => {
        e.preventDefault();
        const newImg = e.target.files[0];
        setImage(newImg);
        setImageEncode(URL.createObjectURL(newImg));
        setImageId();
    };

    const handleTimeStart = async (time) => {
        const initialTime = moment.tz(time, 'HH:mm', 'Asia/Ho_Chi_Minh');
        setTimeStart(initialTime.format('HH:mm'));
    };

    const handleTimeEnd = async (time) => {
        const initialTime = moment.tz(time, 'HH:mm', 'Asia/Ho_Chi_Minh');
        setTimeEnd(initialTime.format('HH:mm'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('facebook', facebook);
        formData.append('instagram', instagram);
        formData.append('tiktok', tiktok);
        formData.append('youtube', youtube);
        formData.append('copy', copy);
        formData.append('timeStart', timeStart);
        formData.append('timeEnd', timeEnd);
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        if (await addInfomation(formData, user?.accessToken, dispatch)) {
            setImage()
        }
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Thông tin</h5>
            <CRow>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="image">
                        Logo <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="image"
                        type="file"
                        name="image"
                        accept=".jpg, .png"
                        onChange={handleImage}
                        className="mb-3"
                    />
                    {image && <img src={imageEncode} style={{ height: '100px', marginTop: '5px' }} alt="" />}
                    {imageId && <ImageBase pathImg={imageId} style={{ height: '100px', marginTop: '5px' }} />}
                </CCol>
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
                    <CFormLabel className="fw-bold" htmlFor="phone">
                        Số điện thoại <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="phone"
                        required
                        type="text"
                        placeholder="Số điện thoại"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="email">
                        Email <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="email"
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </CCol>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="facebook">
                        Facebook <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="facebook"
                        required
                        type="text"
                        placeholder="Facebook"
                        name="facebook"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />
                </CCol>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="instagram">
                        Instagram <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="instagram"
                        required
                        type="text"
                        placeholder="Instagram"
                        name="instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                </CCol>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="tiktok">
                        Tiktok <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="tiktok"
                        required
                        type="text"
                        placeholder="Tiktok"
                        name="tiktok"
                        value={tiktok}
                        onChange={(e) => setTiktok(e.target.value)}
                    />
                </CCol>
            </CRow>
            <CRow className="mt-3">
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="youtube">
                        Youtube <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="youtube"
                        required
                        type="text"
                        placeholder="Youtube"
                        name="youtube"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                    />
                </CCol>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="timeStart">
                        Thời gian làm việc <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <div className="d-flex">
                        <CTimePicker
                            id="timeStart"
                            seconds={false}
                            placeholder="Bắt đầu"
                            inputReadOnly
                            cleaner={false}
                            time={timeStart}
                            onTimeChange={(time) => handleTimeStart(time)}
                        />
                        <CTimePicker
                            seconds={false}
                            placeholder="Kết thúc"
                            className="ms-3"
                            cleaner={false}
                            time={timeEnd}
                            onTimeChange={(time) => handleTimeEnd(time)}
                        />
                    </div>
                </CCol>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="copy">
                        Copyright <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="copy"
                        required
                        type="text"
                        placeholder="Copyright"
                        name="copy"
                        value={copy}
                        onChange={(e) => setCopy(e.target.value)}
                    />
                </CCol>
            </CRow>
            <div className="button add mt-3" onClick={handleSubmit}>
                Lưu
            </div>
        </div>
    );
};

export default InformationPage;
