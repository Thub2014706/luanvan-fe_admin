import axios from "axios";
import { showToast } from "~/constants";

export const allCombo = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/combo?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusCombo = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/combo/status/${id}`, {});
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const deleteCombo = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/combo/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addCombo = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/combo/`, formData, {
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

export const updateCombo = async (id, formData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/combo/update/${id}`, formData, {
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

export const detailCombo = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/combo/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};