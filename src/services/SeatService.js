import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const updateRowSeat = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/seat/update-row`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        console.log(response.data);
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const allSeatRoom = async (room) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seat?room=${room}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateSeat = async (id, data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(`${process.env.REACT_APP_API_URL}/api/seat/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const deleteSeat = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/seat/delete-seat/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        showToast('Xóa thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailSeat = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seat/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const allHold = async (showTime) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/redis/all-hold?showTime=${showTime}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const testHold = async (showTime, seatId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/redis/test-hold?showTime=${showTime}&seatId=${seatId}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
