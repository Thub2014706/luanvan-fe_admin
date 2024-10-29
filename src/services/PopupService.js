import axios from 'axios';
import { showToast } from '~/constants';
import { axiosJWT } from './StaffService';

export const addPopup = async (formData, token) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/popup`, formData, {
            headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` },
        });
        showToast('Đã lưu', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const deletePopup = async (token) => {
    try {
        const response = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/popup/delete`, {
            headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` },
        });
        showToast('Đã lưu', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const detailPopup = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/popup/detail`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
