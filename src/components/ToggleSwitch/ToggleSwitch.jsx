import React from 'react';

const ToggleSwitch = ({ status, handleClick }) => {
    return (
        <div onClick={handleClick} className={`button-status mx-auto my-auto ${status ? 'active' : 'inactive'}`}>
            {status ? 'active' : 'inactive'}
        </div>
    );
};

export default ToggleSwitch;
