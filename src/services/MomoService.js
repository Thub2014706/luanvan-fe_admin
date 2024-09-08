import axios from 'axios';

export const momoPaymentTicket = async (amount) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/momo/payment-ticket`, amount);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const momoPaymentCombo = async (amount) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/momo/payment-combo`, amount);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const checkStatus = async (orderId) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/momo/check-status-transaction`,
            orderId,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
