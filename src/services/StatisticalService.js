import axios from 'axios';
import { showToast } from '~/constants';

export const dailyRevenue = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/daily-revenue`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const totalTicket = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/total-ticket`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const totalRevenue = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/total-revenue`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const newUser = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/new-user`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const sDayRevenueTicket = async (type, start, end) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/seven-day-revenue-ticket?type=${type}&start=${start}&end=${end}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const sDayRevenueCombo = async (type, start, end) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/seven-day-revenue-combo?type=${type}&start=${start}&end=${end}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const sDayTicket = async (type, start, end) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/seven-day-ticket?type=${type}&start=${start}&end=${end}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};
export const sDayCombo = async (type, start, end) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/seven-day-combo?type=${type}&start=${start}&end=${end}`,
        );
        return response.data;
    } catch (error) {
        showToast(error.response.data.message, 'error');
        console.log('loi', error);
    }
};

export const filmRevenue = async (film) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/film-revenue?film=${film}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const theaterRevenue = async (theater) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/theater-revenue?theater=${theater}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const theaterComboRevenue = async (theater) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/statistical/theater-combo-revenue?theater=${theater}`,
        );
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
