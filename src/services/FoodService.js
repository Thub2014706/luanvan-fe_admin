import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allFood = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/food?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusFood = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/food/status/${id}`,
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

export const deleteFood = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/food/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const addFood = async (formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/food/`, formData, {
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

export const updateFood = async (id, formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/food/update/${id}`, formData, {
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

export const detailFood = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listFood = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
