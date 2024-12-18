import axios from 'axios';
import { showToast } from '~/constants';
//import { axios } from './StaffService';

export const allShowTime = async (theater, room, date) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/showtime?theater=${theater}&room=${room}&date=${date}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const addShowTime = async (data, token, axiosJWT) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/showtime`, data, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        showToast('Thêm suất chiếu thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

// export const detailShowTimeByRoom = async (theater, room, date) => {
//     console.log(theater, room, date);
//     try {
//         const response = await axios.get(
//             `${process.env.REACT_APP_API_URL}/api/showtime/all-by-room?theater=${theater}&room=${room}&date=${date}`,
//         );
//         return response.data;
//     } catch (error) {
//         console.log('loi', error);
//     }
// };

export const listShowTimeByDay = async (theater, date, schedule) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/showtime/list-by-day?theater=${theater}&date=${date}&schedule=${schedule}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const detailShowTimeById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/showtime/detail-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const soldOutSeat = async (showTime, room) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/showtime/check-seat?showTime=${showTime}&room=${room}`,
        );
        return response.data.message;
    } catch (error) {
        console.log('loi', error);
    }
};

export const deleteShowTime = async (id, token, axiosJWT) => {
    try {
        const response = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/showtime/delete-showtime/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        showToast('Xóa thành công', 'success');
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
