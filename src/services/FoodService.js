import axios from "axios";
import { showToast } from "~/constants";

export const allFood = async (search, number, show) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/food?search=${search}&number=${number}&show=${show}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusFood = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/food/status/${id}`, {});
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const deleteFood = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/food/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addFood = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/food/`, formData, {
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

export const updateFood = async (id, formData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/food/update/${id}`, formData, {
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

export const detailFood = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const listFood = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/list`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};