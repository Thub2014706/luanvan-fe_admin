import axios from 'axios';
import { showToast } from '~/constants';

export const allSchedule = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/schedule?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addSchedule = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/schedule/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const updateSchedule = async (id, data, token) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/schedule/update/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailSchedule = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listSchedule = async (endDate) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/list?endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};