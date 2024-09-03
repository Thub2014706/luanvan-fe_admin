import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { stepNext } from '~/features/showTime/showTimeSlice';

const OrderSuccess = () => {
    const dispatch = useDispatch()
    return (
        <div className='justify-content-center'>
            <h4 className='text-center'>Đặt vé thành công!</h4>
            <Button>In vé</Button>
        </div>
    );
};

export default OrderSuccess;
