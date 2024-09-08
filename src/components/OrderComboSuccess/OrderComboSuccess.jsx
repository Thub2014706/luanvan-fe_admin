import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { typePay } from '~/constants';
import { removeAll, removeIdOrder } from '~/features/comboCart/comboCart';
import { detailOrderCombo } from '~/services/OrderComboService';
import BillCombo from '../BillCombo/BillCombo';
import success from '~/assets/images/success.png';
import warning from '~/assets/images/warning.png';

const OrderComboSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const componentRef = useRef();
    const [isSuccess, setIsSuccess] = useState();
    const idOrder = useSelector((state) => state.comboCart.idOrder);

    useEffect(() => {
        const fetch = async () => {
            if (idOrder !== null) {
                const data1 = await detailOrderCombo(idOrder);
                if (data1.status === typePay[1]) {
                    setIsSuccess('success');
                    dispatch(removeAll());
                } else {
                    setIsSuccess('error');
                }
            }
        };
        fetch();
    }, [idOrder, dispatch, isSuccess]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleBook = () => {
        dispatch(removeIdOrder());
        navigate('/order-food');
    };

    const handleBookDif = () => {
        dispatch(removeAll());
        dispatch(removeIdOrder());
        navigate('/order-food');
    };

    const handlePay = () => {
        navigate('/order-food');
    };

    return isSuccess === 'success' ? (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <img src={success} height={100} alt="" />
            <h4 className="text-center mt-3">Đặt vé thành công!</h4>
            <div>
                <Button onClick={handleBook}>Tiếp tục đặt vé</Button>
                <Button className="ms-2" onClick={handlePrint}>
                    In vé
                </Button>
            </div>
            <BillCombo componentRef={componentRef} />
        </div>
    ) : (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <img src={warning} className="mx-auto" height={100} alt="" />
            <h4 className="text-center mt-3">Đặt vé không thành công!</h4>
            <div>
                <Button onClick={handleBookDif}>Đặt vé khác</Button>
                <Button className="ms-2" onClick={handlePay}>
                    Thanh toán lại
                </Button>
            </div>
        </div>
    );
};

export default OrderComboSuccess;
