import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allGenre = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/genre?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateGenre = async (id, data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/genre/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const deleteGenre = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/genre/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error, id, token);
    }
};

export const detailGenre = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addGenre = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/genre`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const listGenre = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genre/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusGenre = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/genre/status/${id}`,
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