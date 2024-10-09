import axios from "axios";

export const dailyRevenue = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/statistical/daily-revenue`);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};