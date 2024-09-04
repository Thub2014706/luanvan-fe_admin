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