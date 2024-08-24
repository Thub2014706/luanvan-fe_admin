import React, { useEffect, useState } from 'react';
import AddShowTime from '../AddShowTime/AddShowTime';
import { Table } from 'react-bootstrap';
import { detailFilm } from '~/services/FilmService';

const DetailShowTime = ({ props, theater, room, date }) => {
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    const NameFilm = ({ id }) => {
        const [name, setName] = useState('');

        useEffect(() => {
            const fetch = async () => {
                const data = await detailFilm(id);
                setName(data.name);
            };
            fetch();
        }, [id]);
        return <span>{name}</span>;
    };

    let now = Date.now();
    console.log('e', date);
    return (
        <div>
            <Table bordered>
                <thead>
                    <tr className="text-center">
                        <th>Phim chiếu</th>
                        <th>Hình thức dịch</th>
                        <th>Thời gian chiếu</th>
                        <th>Loại suất chiếu</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {props.length > 0 ? (
                        props.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <NameFilm id={item.film} />
                                </td>
                                <td>{item.translate}</td>
                                <td>
                                    {item.timeStart.slice(0, 5)} - {item.timeEnd.slice(0, 5)}
                                </td>
                                <td>{item.type}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Chưa có lịch chiếu
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {new Date(date).getTime() >= new Date(now).setUTCHours(0, 0, 0, 0) && (
                <div className="button add" style={{ width: '130px' }} onClick={() => handleShowAdd()}>
                    Thêm suất chiếu
                </div>
            )}
            {date && (
                <AddShowTime show={showAdd} handleClose={handleCloseAdd} dateAdd={date} room={room} theater={theater} />
            )}
        </div>
    );
};

export default DetailShowTime;
