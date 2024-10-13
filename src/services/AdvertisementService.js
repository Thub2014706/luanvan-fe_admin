import axios from 'axios';
import { showToast } from '~/constants';

export const allAdvertisement = async (number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/advertisement/all?&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusAdvertisement = async (id, token) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/advertisement/status/${id}`, {}, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addAdvertisement = async (formData, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/advertisement/`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`
            },
        });
        showToast('Thêm mới thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const detailAdvertisement = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/advertisement/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateAdvertisement = async (id, formData, token) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/advertisement/update/${id}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${token}`
            },
        });
        showToast('Cập nhật thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const listAdvertisement = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/advertisement/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};