import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { stepNext } from '~/features/showTime/showTimeSlice';

const OrderSuccess = () => {
    // const dispatch = useDispatch()
    // dispatch(stepNext(4))
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h4 className="text-center">Đặt vé thành công!</h4>
            <Button onClick={handlePrint}>In vé</Button>
            <div ref={componentRef} className="" style={{ padding: '20px', fontFamily: 'Courier New, monospace' }}>
                <h4 className="fw-bold text-center">THE VAO<br /> PHONG CHIEU PHIM</h4>
            </div>
        </div>
    );
};

export default OrderSuccess;
