import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { useDispatch, useSelector } from 'react-redux';
import { detailCombo } from '~/services/ComboService';
import { detailFood } from '~/services/FoodService';
import { detailOrderCombo } from '~/services/OrderComboService';
import Name from '../Name/Name';
import { detailStaff } from '~/services/StaffService';

const BillCombo = ({ componentRef }) => {
    const dispatch = useDispatch();
    const idOrder = useSelector((state) => state.comboCart.idOrder);
    const [order, setOrder] = useState(null);
    const [combo, setCombo] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (idOrder !== null) {
                const data1 = await detailOrderCombo(idOrder);
                setOrder(data1);
                console.log(data1);
                const data2 = await Promise.all(
                    data1.combo.map(async (item) => {
                        const data = (await detailCombo(item.id)) || (await detailFood(item.id));
                        return {
                            data,
                            quantity: item.quantity,
                        };
                    }),
                );
                setCombo(data2);
            }
        };
        fetch();
    }, [idOrder, dispatch]);

    return (
        <div>
            <div style={{ display: 'none' }}>
                <div
                    ref={componentRef}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{
                        margin: 'auto',
                        padding: '30px',
                        fontFamily: 'Courier New, monospace',
                        width: '400px',
                        // height: '700px',
                    }}
                >
                    <h4 className="fw-bold text-center">HOA DON BAP NUOC</h4>
                    {order !== null && (
                        <div>
                            <p>
                                Nhan vien:{' '}
                                <Name
                                    id={order.staff.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                    detail={detailStaff}
                                />
                            </p>
                            <p>------------------------------------------</p>
                            <p>
                                Combo:
                                {combo.map((item) => (
                                    <p className="text-end fw-bold">
                                        <span className="ms-5">{item.data.name}</span>
                                        <span className="ms-5">x {item.quantity}</span>
                                    </p>
                                ))}
                            </p>
                            <p>==========================================</p>
                            <p className="text-end fw-bold fs-5">
                                <span className="me-5">Tong</span>
                                <span className="me-5">VND</span>
                                <span>{order.price.toLocaleString('it-IT')}</span>
                            </p>
                            <div className="justify-content-center d-flex">
                                <Barcode
                                    value={order.idOrder}
                                    height={50}
                                    width={1}
                                    fontSize={10}
                                    fontOptions="Courier New, monospace"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BillCombo;
