import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Step = ({ step, length, name }) => {
    const array = [];
    for (let i = 1; i <= length; i++) {
        array.push(i);
    }
    return (
        <div className="d-flex align-items-center mb-3">
            {array.map((item) => (
                <>
                    <p className={`step ${step >= item ? 'select' : 'not'}`}>
                        {item > step - 1 ? item : <FontAwesomeIcon icon={faCheck} />}
                    </p>
                    <p className="my-auto ms-1">{name[item - 1]}</p>
                    {item !== length && <span className={`mx-2 line ${step >= item + 1 ? 'select' : 'not'}`}></span>}
                </>
            ))}
        </div>
    );
};

export default Step;
