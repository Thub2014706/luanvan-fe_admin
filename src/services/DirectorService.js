import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allDirector = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/director?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addDirector = async (formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/director/`, formData, {
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

export const detailDirector = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/director/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateDirector = async (id, formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/director/${id}`, formData, {
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

export const deleteDirector = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/director/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const listDirector = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/director/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const statusDirector = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/director/status/${id}`,
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