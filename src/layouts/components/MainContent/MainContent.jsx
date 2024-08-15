import React from 'react';

const MainContent = ({children}) => {
    return (
        <div className="col-main">
            {children}
        </div>
    );
};

export default MainContent;
