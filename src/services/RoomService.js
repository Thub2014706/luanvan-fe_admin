import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allRoom = async (idCinema) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/room?idCinema=${idCinema}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const statusRoom = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/room/status/${id}`,
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

export const deleteRoom = async (id, token, axiosJWT) => {
    try {
        await axiosJWT.patch(
            `${process.env.REACT_APP_API_URL}/api/room/delete/${id}`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        showToast('Xóa thành công', 'success');
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const addRoom = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/room/`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Thêm mới thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const updateRoom = async (id, data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/room/update/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
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

export const listRoomByTheater = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/list-by-theater/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const filterRoomByTheater = async (theater, room) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/room/filter-by-theater?theare=${theater}&room=${room}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
