import axios from 'axios';
import { showToast } from '~/constants';
import { axiosJWT } from './StaffService';

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
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/schedule/`, data, {
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
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/schedule/update/${id}`, data, {
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

export const listSchedule = async (date) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/list?date=${date}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listScheduleNotScreened = async (search) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/schedule/list-schedule-not-screened?search=${search}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
