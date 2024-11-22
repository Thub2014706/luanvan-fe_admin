import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
// import { logoutSuccess } from './features/auth/authSlice';

// const refreshToken = async () => {
//     try {
//         const res = await axios.post('/v1/auth/refresh', {
//             withCredentials: true,
//         });
//         return res.data;
//     } catch (err) {
//         console.log(err);
//     }
// };
axios.defaults.withCredentials = true;

const refreshToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/staff/refresh-token`, {});
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log('aa', data);

                const refreshUser = {
                    data: user?.data,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                // config.headers['token'] = 'Bearer ' + data.accessToken;
                config.headers.Authorization = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
