import {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/features/auth/authSlice';
import { addGenre, detailGenre, updateGenre } from '~/services/GenreService';

const AddGenre = ({ show, handleClose, id }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [name, setName] = useState('');
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // console.log('dd', id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id !== null) {
            await updateGenre(id, { name }, user?.accessToken, axiosJWT);
            handleClose();
        } else {
            await addGenre({ name }, user?.accessToken, axiosJWT);
            handleClose();
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (id !== null) {
                const data = await detailGenre(id);
                setName(data.name);
            } else {
                setName('');
            }
        };
        fetch();
    }, [id]);

    return (
        <CModal alignment="center" visible={show} onClose={handleClose}>
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle>{id !== null ? 'Cập nhật' : 'Thêm mới'} thể loại phim</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <CFormLabel className="fw-bold">
                        Tên thể loại <span style={{ color: 'red' }}>*</span>
                    </CFormLabel>
                    <CFormInput
                        type="text"
                        placeholder="Tên thể loại"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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

export default AddGenre;
