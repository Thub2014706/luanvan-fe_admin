import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Pagination = ({ selectNumber, length, currentPage }) => {
    const array = [];
    for (let i = 1; i <= length; i++) {
        array.push(i);
    }
    const handleNumber = (num) => {
        selectNumber(num);
    };
    const handlePre = () => {
        if (currentPage > 1) {
            selectNumber(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < length) {
            selectNumber(currentPage + 1);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="text-center align-middle panigation" onClick={() => handlePre()}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            {array.map((item) => (
                <div
                    key={item}
                    className={`text-center align-middle panigation ${currentPage === item && 'select'}`}
                    onClick={() => handleNumber(item)}
                >
                    <span className="text-center align-middle">{item}</span>
                </div>
            ))}
            <div className="text-center align-middle panigation" onClick={() => handleNext()}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Pagination;