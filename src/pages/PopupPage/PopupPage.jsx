import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageBase from '~/components/ImageBase/ImageBase';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { addPopup, deletePopup, detailPopup } from '~/services/PopupService';

const PopupPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [image, setImage] = useState();
    const [imageId, setImageId] = useState();
    const [imageEncode, setImageEncode] = useState();
    const [action, setAction] = useState(false);
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailPopup();
            if (data) {
                setImageId(data.image);
            }
            setAction(false);
        };
        fetch();
    }, [action]);

    const handleImage = (e) => {
        e.preventDefault();
        const newImg = e.target.files[0];
        setImage(newImg);
        setImageEncode(URL.createObjectURL(newImg));
        setImageId();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imageId) {
            formData.append('imageId', imageId);
        } else {
            formData.append('image', image);
        }
        if (image || imageId) {
            await addPopup(formData, user?.accessToken, axiosJWT);
        } else {
            await deletePopup(user?.accessToken, axiosJWT);
            setAction(true);
        }
    };

    const handleDelete = async () => {
        setImage();
        setImageId();
        setImageEncode();
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Cửa sổ chào mừng</h5>
            <CRow>
                <CCol>
                    <CFormLabel className="fw-bold" htmlFor="image">
                        Hình ảnh <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        id="image"
                        type="file"
                        name="image"
                        accept=".jpg, .png"
                        onChange={handleImage}
                        className="mb-3"
                    />
                    {/* {(image || imageId) && (
                        <div className="button delete mt-3 me-3" onClick={handleDelete}>
                            Xoá ảnh
                        </div>
                    )} */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        {image && <img src={imageEncode} style={{ height: '400px', marginTop: '5px' }} alt="" />}
                        {imageId && <ImageBase pathImg={imageId} style={{ height: '400px', marginTop: '5px' }} />}
                        <div
                            style={{
                                position: 'absolute',
                                right: '5px',
                                top: '5px',
                                backgroundColor: 'transparent',
                            }}
                        >
                            {(image || imageId) && (
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size="2xl"
                                    // color="white"
                                    onClick={handleDelete}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                </CCol>
            </CRow>

            <div className="button add mt-4" onClick={handleSubmit}>
                Lưu
            </div>
        </div>
    );
};

export default PopupPage;
