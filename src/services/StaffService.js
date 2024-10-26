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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/staff/refresh-token`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const loginStaff = async (user, navigate, dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/staff/signin`, user);
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

export const createStaff = async (data, token) => {
    // dispatch(createStart)
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/staff/create`, data, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        });
        // dispatch(createSuccess)
        showToast('Thêm nhân viên thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        // dispatch(createFailed)
        console.log('loi', error);
    }
};

export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/staff/logout`,
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

export const allStaff = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/staff?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusStaff = async (id, token) => {
    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/api/staff/status/${id}`,
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

export const deleteStaff = async (id, token) => {
    try {
        await axios.patch(`${process.env.REACT_APP_API_URL}/api/staff/delete/${id}`, {}, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const detailStaff = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/staff/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const accessStaff = async (id, access, token) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/staff/access/${id}`, access, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm quyền truy cập thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
