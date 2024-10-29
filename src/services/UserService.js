import { axiosJWT } from './StaffService';
import axios from 'axios';

export const allUser = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusUser = async (id, token) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/user/status/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailUserByPhone = async (phone) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/detail-by-phone?phone=${phone}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailUserById = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/detail-by-id/${id}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};