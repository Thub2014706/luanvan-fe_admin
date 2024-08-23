import axios from 'axios';
import { showToast } from '~/constants';

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

export const addShowTime = async (data, token) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/showtime`, data, {
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
