import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '~/assets/images/CINETHU.png';
import ImageBase from '~/components/ImageBase/ImageBase';
import { itemMenu } from '~/constants';
import { detailInfomation } from '~/services/InformationService';

const Menu = () => {
    const location = useLocation();
    const [select, setSelect] = useState(location.pathname);
    const user = useSelector((state) => state.auth.login.currentUser);
    const info = useSelector((state) => state.information.data);

    useEffect(() => {
        setSelect(location.pathname); 
    }, [location.pathname]);

    return (
        <div className="col-menu mt-3" style={{ height: '94vh' }}>
            <div className="my-2" style={{ backgroundColor: 'white', position: 'sticky', top: '15px' }}>
                {/* <img src={info?.image} className="mx-auto d-block" alt="" style={{ height: '40px' }} /> */}
                {info && <ImageBase pathImg={info.image} style={{ height: '40px', margin: 'auto', display: 'block' }} />}

                <hr style={{ width: '80%' }} className="mx-auto" />
            </div>
            <div className="element" style={{ height: '85%', overflowX: 'hidden', overflowY: 'auto' }}>
                {itemMenu.map(
                    (item, index) =>
                        (user.data.access.includes(item.name) ||
                            (user.data.role === 0 && item.link !== '/book-tickets' && item.link !== '/order-food')) && (
                            <Link key={index} to={item.link} className="text-decoration-none">
                                <div
                                    className={`mx-2 align-items-center item-menu ${
                                        select && select.startsWith(item.link) && 'select'
                                    }`}
                                    onClick={() => setSelect(item.link)}
                                >
                                    <FontAwesomeIcon className="mb-0 ms-4" icon={item.icon} />
                                    <p className="my-auto ms-3">{item.name}</p>
                                </div>
                            </Link>
                        ),
                )}
            </div>
        </div>
    );
};

export default Menu;
