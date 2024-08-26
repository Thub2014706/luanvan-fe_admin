import axios from 'axios';
import { showToast } from '~/constants';

export const addPrice = async (data, token) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/price/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Đã lưu', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailPrice = async (typeUser, time) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/price/detail?typeUser=${typeUser}&time=${time}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
