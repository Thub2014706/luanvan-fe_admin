import axios from "axios";

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

export const sDayRevenueTicket = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/seven-day-revenue-ticket`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const sDayRevenueCombo = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/seven-day-revenue-combo`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const sDayTicket = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/seven-day-ticket`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
export const sDayCombo = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/seven-day-combo`);
        return response.data;
    } catch (error) {
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/theater-revenue?theater=${theater}`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};
