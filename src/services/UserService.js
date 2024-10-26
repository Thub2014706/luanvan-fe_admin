import axios from 'axios';
import { showToast } from '~/constants';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} from '~/features/auth/authSlice';

axios.defaults.withCredentials = true;

export const axiosJWT = axios.create();

export const refreshToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

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
        const response = await axios.patch(
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