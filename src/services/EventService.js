import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allEvent = async (number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/event/all?&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusEvent = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/event/status/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addEvent = async (formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/event/`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailEvent = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/event/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateEvent = async (id, formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/event/update/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const deleteEvent = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/event/delete/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};
