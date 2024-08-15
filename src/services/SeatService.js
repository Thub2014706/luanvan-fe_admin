import axios from "axios";
import { showToast } from "~/constants";

export const updateRowSeat = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/seat/update-row`, data);
        showToast('Cập nhật thành công', 'success')
        console.log(response.data)
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error')
        console.log('loi', error);
    }
};