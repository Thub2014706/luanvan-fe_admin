import React from 'react';
import { useSelector } from 'react-redux';

const CardCombo = () => {
    const data = useSelector((state) => state.comboCart.combo);
    const price = useSelector((state) => state.comboCart.price);
    console.log(data, price)

    return (
        <div className="card-book" style={{ position: 'sticky', top: '20px' }}>
            <p
                className="mt-3 mx-2"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
                <span>Combo:</span>
                <div style={{ textAlign: 'right' }}>
                    {data.map((item) => (
                        <span key={item.id} className="fw-bold" style={{ display: 'block' }}>
                            {item.name} x {item.quantity} <br />
                        </span>
                    ))}
                </div>
            </p>

            <hr />
            <p className="mt-3 mx-2" style={{ display: 'flex' }}>
                Tổng tiền:{' '}
                <span className="fw-bold h5" style={{ color: 'red', marginLeft: 'auto' }}>
                    {price.toLocaleString('it-IT')}đ
                </span>
            </p>
        </div>
    );
};

export default CardCombo;
