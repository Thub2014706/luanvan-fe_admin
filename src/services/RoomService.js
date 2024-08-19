import axios from "axios";
import { showToast } from "~/constants";

export const allRoom = async (idCinema) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/room?idCinema=${idCinema}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusRoom = async (id) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/room/status/${id}`, {});
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const deleteRoom = async (id) => {
    try {
        await axios.patch(`${process.env.REACT_APP_API_URL}/api/room/delete/${id}`);
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast('Xóa không thành công', 'error');
        console.log(error);
    }
};

export const addRoom = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/room/`, data);
        showToast('Thêm mới thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const updateRoom = async (id, data) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/room/update/${id}`, data);
        showToast('Cập nhật thành công', 'success')
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};

export const detailRoom = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/detail/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
