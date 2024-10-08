import axios from 'axios';
import { showToast } from '~/constants';

export const addPrintTicket = async (order, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/print-ticket/`, order, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const testPrintTicket = async (order, token) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/print-ticket/test/${order}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
