import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allDiscount = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/discount?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusDiscount = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/discount/status/${id}`,
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

export const deleteDiscount = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/discount/${id}`,
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

export const addDiscount = async (data, token, axiosJWT) => {
    console.log(token);
    
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/discount/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const updateDiscount = async (id, data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/discount/update/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailDiscount = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/discount/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listDiscount = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/discount/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
