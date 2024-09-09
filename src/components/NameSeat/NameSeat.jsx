import React, { useEffect, useState } from 'react';
import { detailSeat } from '~/services/SeatService';

const NameSeat = ({ id }) => {
    const [seat, setSeat] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await detailSeat(id);
            setSeat(data);
        };
        fetch();
    }, [id]);

    return (
        <span>
            {String.fromCharCode(64 + seat.row)}
            {seat.col}
        </span>
    );
};

export default NameSeat;
