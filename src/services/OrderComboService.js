import axios from "axios";
import { showToast } from "~/constants";
// import { axios } from "./StaffService";

export const addOrderCombo = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order-combo`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailOrderCombo = async (idOrder) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/order-combo/detail?idOrder=${idOrder}`);
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
