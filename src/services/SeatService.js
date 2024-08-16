import axios from 'axios';
import { showToast } from '~/constants';

export const updateRowSeat = async (data) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/seat/update-row`, data);
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

export const updateSeat = async (id, data) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/seat/${id}`, data);
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const deleteSeat = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/seat/delete-seat/${id}`, {});
        showToast('Xóa thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
