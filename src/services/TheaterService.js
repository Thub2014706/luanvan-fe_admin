import axios from 'axios';
import { showToast } from '~/constants';
import { axiosJWT } from './StaffService';

export const allTheater = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/theater?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusTheater = async (id, token) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/theater/status/${id}`,
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

export const deleteTheater = async (id, token) => {
    try {
        await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/theater/delete/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addTheater = async (formData, token) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/theater/`, formData, {
            headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const updateTheater = async (id, formData, token) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/theater/update/${id}`, formData, {
            headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailTheater = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theater/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listTheater = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theater/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
