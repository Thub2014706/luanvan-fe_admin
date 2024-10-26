import React from 'react';
import { useLocation } from 'react-router-dom';

const MainContent = ({children}) => {
    const location = useLocation();

    const isStatistical = location.pathname === '/statistical';

    // console.log(isHomePage);
    
    return (
        <div className={!isStatistical ? "col-main" : ''}>
            {children}
        </div>
    );
};

export default MainContent;
