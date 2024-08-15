import axios from "axios";
import { showToast } from "~/constants";

export const allTheater = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/theater?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusTheater = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/theater/status/${id}`, {});
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const deleteTheater = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/theater/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addTheater = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/theater/`, data);
        showToast('Thêm mới thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const updateTheater = async (id, data) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/theater/update/${id}`, data);
        showToast('Cập nhật thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const detailTheater = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/theater/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
