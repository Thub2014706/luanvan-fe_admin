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

export const login = async (user, navigate, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user);
        dispatch(loginSuccess(response.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed);
        if (error.response) {
            showToast(error.response.data.message, 'error');
        } else {
            console.log(error);
            alert('Lỗi mạng');
        }
    }
};

export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/user/logout`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailed());
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