import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { typeSeatEnum } from '~/constants';
import { allSeatRoom } from '~/services/SeatService';
import Name from '../Name/Name';
import { detailRoom } from '~/services/RoomService';
import { useDispatch } from 'react-redux';
import { preStep1 } from '~/features/showTime/showTimeSlice';

const SelectSeat = ({ idRoom }) => {
    const [seats, setSeats] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const data = await allSeatRoom(idRoom);
            setSeats(data);
        };
        fetch();
    }, [idRoom]);
    console.log('qq', seats);
    const rows = [...new Set(seats.map((item) => item.row))];

    const handlePre = () => {
        dispatch(preStep1());
    };

    return (
        <div>
            <h5 className="mb-3 fw-bold">
                Phòng chiếu: <Name detail={detailRoom} id={idRoom} />
            </h5>
            <p className="text-center fw-bold">Màn hình</p>
            <div className="screen-modal mb-5"></div>
            {rows.map((row) => (
                <Table className="w-auto mx-auto my-1">
                    <tr key={row}>
                        {seats
                            .filter((seat) => seat.row === row)
                            .map((seat) => (
                                <td className="text-center align-middle">
                                    {!seat.isDelete && (
                                        <div
                                            className={`seat ${seat.type === typeSeatEnum[0] && 'standard'} ${
                                                seat.type === typeSeatEnum[1] && 'vip'
                                            } ${seat.type === typeSeatEnum[2] && 'couple'} ${
                                                !seat.status && 'inaction'
                                            } `}
                                            style={{
                                                marginBottom: `${seat.bottom * 17.5}px`,
                                                marginLeft: `${seat.left * 17.5 + seat.left * 2 + 2}px`,
                                                marginRight: `${seat.right * 17.5 + seat.right * 2 + 2}px`,
                                            }}
                                        >
                                            <p className="text-white">
                                                {String.fromCharCode(64 + row)}
                                                {seat.col}
                                            </p>
                                        </div>
                                    )}
                                </td>
                            ))}
                    </tr>
                </Table>
            ))}
            <div className="float-end d-flex">
                <div className="mt-5 button add me-3" onClick={handlePre}>
                    Quay lại
                </div>
                <div className="mt-5 button add">Tiếp theo</div>
            </div>
        </div>
    );
};

export default SelectSeat;
