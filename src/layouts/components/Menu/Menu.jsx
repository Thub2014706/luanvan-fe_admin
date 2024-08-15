import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/CINETHU.png';
import { itemMenu } from '~/constants';

const Menu = () => {
    const [select, setSelect] = useState(0);
    return (
        <div className="col-menu mt-3 pt-2">
            <img src={logo} className="mx-auto d-block" alt="" style={{ height: '40px' }} />
            <hr style={{ width: '80%' }} className="mx-auto" />
            {itemMenu.map((item) => (
                <Link to={item.link} className="text-decoration-none">
                    <div
                        className={`mx-2 align-items-center item-menu ${select === item.index && 'select'}`}
                        onClick={() => setSelect(item.index)}
                    >
                        <FontAwesomeIcon className="mb-0 ms-4" icon={item.icon} />
                        <p className="my-auto ms-3">{item.name}</p>
                    </div>
                </Link>
            ))}
            {/* <Link to={'/film'} className="text-decoration-none">
                <div className="mx-2 item-menu">
                    <p className="ms-5 my-auto">Phim</p>
                </div>
            </Link> */}
        </div>
    );
};

export default Menu;
