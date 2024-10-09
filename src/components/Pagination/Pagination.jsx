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
    console.log(length, currentPage);

    return (
        <div className="d-flex justify-content-center">
            <div className="text-center align-middle panigation" onClick={() => handlePre()}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            {length <= 4 ? (
                array.map((item) => (
                    <div
                        key={item}
                        className={`text-center align-middle panigation ${currentPage === item && 'select'}`}
                        onClick={() => handleNumber(item)}
                    >
                        <span className="text-center align-middle">{item}</span>
                    </div>
                ))
            ) : currentPage <= Math.floor(length / 2) - 1 ? (
                <>
                    {array.map(
                        (item) =>
                            (item === currentPage ||
                                item === currentPage + 1 ||
                                item === currentPage - 1 ||
                                item === currentPage - 2) && (
                                <div
                                    key={item}
                                    className={`text-center align-middle panigation ${
                                        currentPage === item && 'select'
                                    }`}
                                    onClick={() => handleNumber(item)}
                                >
                                    <span className="text-center align-middle">{item}</span>
                                </div>
                            ),
                    )}
                    <div
                        // key={item}
                        className={`text-center align-middle panigation`}
                    >
                        ...
                    </div>
                    <div
                        key={length}
                        className={`text-center align-middle panigation ${currentPage === length && 'select'}`}
                        onClick={() => handleNumber(length)}
                    >
                        {length}
                    </div>
                </>
            ) : (
                <>
                    <div
                        key={1}
                        className={`text-center align-middle panigation ${currentPage === 1 && 'select'}`}
                        onClick={() => handleNumber(1)}
                    >
                        {1}
                    </div>
                    <div
                        // key={item}
                        className={`text-center align-middle panigation`}
                    >
                        ...
                    </div>
                    {array.map(
                        (item) =>
                            item >= Math.floor(length / 2) &&
                            (item === currentPage || item === currentPage + 1 || item === currentPage - 1) && (
                                <div
                                    key={item}
                                    className={`text-center align-middle panigation ${
                                        currentPage === item && 'select'
                                    }`}
                                    onClick={() => handleNumber(item)}
                                >
                                    <span className="text-center align-middle">{item}</span>
                                </div>
                            ),
                    )}
                </>
            )}
            <div className="text-center align-middle panigation" onClick={() => handleNext()}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
};

export default Pagination;
