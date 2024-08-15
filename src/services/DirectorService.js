import axios from 'axios';
import { showToast } from '~/constants';

export const allDirector = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/director?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addDirector = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/director/`, formData, {
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

export const detailDirector = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/director/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const updateDirector = async (id, formData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/director/${id}`, formData, {
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

export const deleteDirector = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/director/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const listDirector = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/director/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
