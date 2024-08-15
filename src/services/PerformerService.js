import axios from 'axios';
import { showToast } from '~/constants';

export const allPerformer = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/performer?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addPerformer = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/performer/`, formData, {
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

export const detailPerformer = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/performer/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updatePerformer = async (id, formData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/performer/${id}`, formData, {
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

export const deletePerformer = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/performer/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const listPerformer = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/performer/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
