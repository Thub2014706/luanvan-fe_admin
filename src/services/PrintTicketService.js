import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const addPrintTicket = async (order, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/print-ticket/`, order, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const testPrintTicket = async (order, token, axiosJWT, staff) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/print-ticket/test/${order}?staff=${staff}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
