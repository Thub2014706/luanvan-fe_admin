import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allFilm = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/film?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusFilm = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/film/status/${id}`,
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

export const getImage = async (name) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/image/${name}`);
        return response.config.url;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addFilm = async (formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/film/`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const detailFilm = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailFilmBySchedule = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/detail-by-schedule/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateFilm = async (id, formData, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/film/update/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const listFilm = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
