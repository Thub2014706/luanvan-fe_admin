import React, { useEffect, useState } from 'react';
import AddShowTime from '../AddShowTime/AddShowTime';
import { Table } from 'react-bootstrap';
import { detailFilm } from '~/services/FilmService';
import { allShowTime } from '~/services/ShowTimeService';

const DetailShowTime = ({ idRoom, theater, date }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showTime, setShowTime] = useState([]);

    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await allShowTime(theater, idRoom, date);
            // const data2 = await allShowTime(id, , date);
            setShowTime(data);
            // console.log(data2);
        };
        fetch();
    }, [theater, idRoom, date]);

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

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Phim chiếu</th>
                        <th>Hình thức dịch</th>
                        <th>Thời gian chiếu</th>
                        <th>Loại suất chiếu</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {showTime.map((item) => (
                        <tr>
                            <td>
                                <NameFilm id={item.film} />
                            </td>
                            <td>{item.translate}</td>
                            <td></td>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="button add" style={{ width: '130px' }} onClick={() => handleShowAdd()}>
                Thêm suất chiếu
            </div>
            {idRoom !== null && (
                <AddShowTime
                    show={showAdd}
                    handleClose={handleCloseAdd}
                    dateAdd={date}
                    room={idRoom}
                    theater={theater}
                />
            )}
        </div>
    );
};

export default DetailShowTime;
