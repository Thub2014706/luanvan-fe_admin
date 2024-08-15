import axios from 'axios';
import { showToast } from '~/constants';

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

export const statusFilm = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/film/status/${id}`, {});
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

export const addFilm = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/film/`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        showToast('Thêm mới thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const detailFilm = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/film/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateFilm = async (id, formData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/film/update/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        showToast('Cập nhật thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};
