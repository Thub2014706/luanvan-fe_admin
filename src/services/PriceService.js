import { showToast } from '~/constants';
//import { axios } from './StaffService';
import axios from 'axios';

export const addPrice = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/price/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
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

export const detailPriceByUser = async (typeUser, date, time, room, seat) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/price/detail-by-user?typeUser=${typeUser}&date=${date}&time=${time}&room=${room}&seat=${seat}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
