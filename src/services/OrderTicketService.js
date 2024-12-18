import axios from 'axios';
import FileSaver from 'file-saver';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const addOrderTicket = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order-ticket`, data, {
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
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/order-ticket/all-selled?showTime=${showTime}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const allOrderTicket = async (theater, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/order-ticket?theater=${theater}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const exportOrderTicket = async (theater) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/order-ticket/export?theater=${theater}`,
            {
                responseType: 'blob',
            },
        );

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver.saveAs(blob, 'danh_sach_ve_da_hoan_tat.xlsx');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
