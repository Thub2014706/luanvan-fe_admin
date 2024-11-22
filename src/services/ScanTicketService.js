import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const addScanTicket = async (order, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/scan-ticket/`, order, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const testScanTicket = async (order, token, axiosJWT) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/scan-ticket/test/${order}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
