import axios from 'axios';
import { showToast } from '~/constants';

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

export const statusDiscount = async (id, token) => {
    try {
        const response = await axios.patch(
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

export const deleteDiscount = async (id, token) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/discount/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addDiscount = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/discount/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const updateDiscount = async (id, data, token) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/discount/update/${id}`, data, {
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
