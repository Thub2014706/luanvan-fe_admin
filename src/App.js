import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, routes } from './routes';
import { Fragment } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import useUser from './hooks/useUser';
import { itemMenu } from './constants';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
    // const isAuthenticated = false;
    const user = useSelector((state) => state.auth.login.currentUser);
    // console.log('aaa', itemMenu.some((item) => user.data.access.includes(item.name)));
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
                                    user.data.role === 0 ||
                                    route.path === '/' ||
                                    itemMenu.some(
                                        (item) => item.link === route.path && user.data.access.includes(item.name),
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
