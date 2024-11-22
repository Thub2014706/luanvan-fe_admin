import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, routes } from './routes';
import { Fragment, useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { itemMenu } from './constants';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { detailInfomation } from './services/InformationService';
import { loginSuccess } from './features/auth/authSlice';
import { axiosJWT, refreshToken, logout } from './services/StaffService';
import { jwtDecode } from 'jwt-decode';

function App() {
    // const isAuthenticated = false;
    const user = useSelector((state) => state.auth.login.currentUser);
    const idOrder = useSelector((state) => state.showTime.idOrder);
    console.log('aaa', user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            await detailInfomation(dispatch);
        };
        fetch();
    }, [dispatch]);

    // axiosJWT.interceptors.request.use(
    //     //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
    //     async (config) => {
    //         let decodedToken = jwtDecode(user?.accessToken);
    //         if (decodedToken.exp - 3000 < new Date().getTime() / 1000) {
    //             try {
    //                 const newToken = await refreshToken();
    //                 // console.log(newToken.accessToken)
    //                 if (newToken) {
    //                     const newData = user?.data;

    //                     const refreshUser = {
    //                         data: newData,
    //                         accessToken: newToken.accessToken,
    //                     };
    //                     // console.log("thu nghiem", refreshUser)
    //                     dispatch(loginSuccess(refreshUser));
    //                     config.headers.Authorization = 'Bearer ' + newToken.accessToken;
    //                 }
    //                 //  else {
    //                 //     logout(dispatch, user?.accessToken);
    //                 // }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         return config;
    //     },
    //     (err) => {
    //         return Promise.reject(err);
    //     },
    // );

    return (
        <Router>
            <div className="App">
                <ToastContainer />
                <Routes>
                    {authRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                // !user ? (
                                //     route.layout === null ? (
                                //         <Fragment>
                                //             <route.component />
                                //         </Fragment>
                                //     ) : (
                                //         <MainLayout>
                                //             <route.component />
                                //         </MainLayout>
                                //     )
                                // ) : (
                                //     <Navigate to="/" replace />
                                // )
                                route.layout === null ? (
                                    <Fragment>
                                        <route.component />
                                    </Fragment>
                                ) : (
                                    <MainLayout>
                                        <route.component />
                                    </MainLayout>
                                )
                            }
                        />
                    ))}
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.layout === null ? (
                                    <Fragment>
                                        <route.component />
                                    </Fragment>
                                ) : user ? (
                                    (user.data.role === 0 &&
                                        route.path !== '/book-tickets' &&
                                        route.path !== '/order-food') ||
                                    route.path === '/' ||
                                    itemMenu.some(
                                        (item) =>
                                            (route.path.startsWith(item.link) &&
                                                user.data.access.includes(item.name) &&
                                                route.path !== '/book-tickets/success' &&
                                                route.path !== '/order-food/success') ||
                                            ((route.path === '/book-tickets/success' ||
                                                route.path === '/order-food/success') &&
                                                idOrder !== null),
                                    ) ? (
                                        <MainLayout>
                                            <route.component />
                                        </MainLayout>
                                    ) : (
                                        <Fragment>
                                            <NotFoundPage />
                                        </Fragment>
                                    )
                                ) : (
                                    <Navigate to="/sign-in" replace />
                                )
                            }
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
