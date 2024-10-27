import axios from 'axios';
import { showToast } from '~/constants';
import { setInformation } from '~/features/information/informationSlide';

export const addInfomation = async (formData, token, dispatch) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/information`, formData, {
            headers: { 'content-type': 'multipart/form-data', authorization: `Bearer ${token}` },
        });
        showToast('Cập nhật thành công', 'success');
        detailInfomation(dispatch)
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log(error);
    }
};

export const detailInfomation = async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/information/detail`);
        dispatch(setInformation(response.data))
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
