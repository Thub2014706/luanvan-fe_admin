import React, { useEffect, useState } from 'react';
import { listRoomByTheater } from '~/services/RoomService';
import DetailShowTime from '../DetailShowTime/DetailShowTime';

const RoomShowTime = ({ id, date }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listRoomByTheater(id);
            setRooms(data);
        };
        fetch();
    }, [id]);

    return (
        <div>
            {rooms.map((item) => (
                <div className='my-3'>
                    <h6>{item.name}</h6>
                    <DetailShowTime idRoom={item._id} theater={id} date={date} />
                </div>
            ))}
        </div>
    );
};

export default RoomShowTime;
