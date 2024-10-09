import React from 'react';
import { useLocation } from 'react-router-dom';

const MainContent = ({children}) => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    // console.log(isHomePage);
    
    return (
        <div className={!isHomePage ? "col-main" : ''}>
            {children}
        </div>
    );
};

export default MainContent;
