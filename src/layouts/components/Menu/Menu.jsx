import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/CINETHU.png';
import { itemMenu } from '~/constants';

const Menu = () => {
    const [select, setSelect] = useState(0);
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <div className="col-menu mt-3 pt-2">
            <img src={logo} className="mx-auto d-block" alt="" style={{ height: '40px' }} />
            <hr style={{ width: '80%' }} className="mx-auto" />
            {itemMenu.map(
                (item) =>
                    (user.data.access.includes(item.name) || user.data.role === 0) && (
                        <Link to={item.link} className="text-decoration-none">
                            <div
                                className={`mx-2 align-items-center item-menu ${select === item.index && 'select'}`}
                                onClick={() => setSelect(item.index)}
                            >
                                <FontAwesomeIcon className="mb-0 ms-4" icon={item.icon} />
                                <p className="my-auto ms-3">{item.name}</p>
                            </div>
                        </Link>
                    ),
            )}
        </div>
    );
};

export default Menu;
