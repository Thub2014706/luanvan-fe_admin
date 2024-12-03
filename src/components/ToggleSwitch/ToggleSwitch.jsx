import React from 'react';

const ToggleSwitch = ({ status, handleClick, none }) => {
    return (
        <div onClick={handleClick} className={`button-status mx-auto my-auto ${none ? 'none' : status ? 'active' : 'inactive'}`}>
            {status ? 'active' : 'inactive'}
        </div>
    );
};

export default ToggleSwitch;
