import axios from "axios";
import { showToast } from "~/constants";

export const addOrderTicket = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order-ticket`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailOrderTicket = async (idOrder) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order-ticket/detail?idOrder=${idOrder}`);
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const allOrderTicketSelled = async (showTime) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order-ticket/all-selled?showTime=${showTime}`);
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
