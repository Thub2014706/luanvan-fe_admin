import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemMenu } from '~/constants';

const HomePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.data.role === 0 || user.data.access.includes(itemMenu[1].name)) {
            navigate('/statistical');
        }
    });

    return <div>{/* <Chair /> */}</div>;
};

export default HomePage;
