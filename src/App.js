import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, routes } from './routes';
import { Fragment } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

function App() {
    // const isAuthenticated = false;
    const user = useSelector(state => state.auth.login.currentUser)
    console.log('aaa', user)
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
                                    <MainLayout>
                                        <route.component />
                                    </MainLayout>
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
