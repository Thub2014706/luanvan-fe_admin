import React, { useEffect, useState } from 'react';
import ImageBase from '../ImageBase/ImageBase';
import Name from '../Name/Name';
import { useSelector } from 'react-redux';
import { detailTheater } from '~/services/TheaterService';
import { detailRoom } from '~/services/RoomService';
import moment from 'moment';
import { detailFilm } from '~/services/FilmService';
import { detailCombo } from '~/services/ComboService';

const CardBookTicket = () => {
    const idFilm = useSelector((state) => state.showTime.film);
    const [film, setFilm] = useState(null);
    const idRoom = useSelector((state) => state.showTime.room);
    const time = useSelector((state) => state.showTime.time);
    const theater = useSelector((state) => state.showTime.theater);
    const seat = useSelector((state) => state.showTime.seat);
    const price = useSelector((state) => state.showTime.price);
    const combo = useSelector((state) => state.showTime.combo);
    const [sumCombo, setSumCombo] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(idFilm);
            setFilm(data);
        };
        fetch();
    }, [idFilm]);

    useEffect(() => {
        const fetch = async () => {
            if (combo.length !== 0) {
                let sum = 0;
                await Promise.all(
                    combo.map(async (item) => {
                        const data = await detailCombo(item.id);
                        sum += data.price * item.quantity;
                    }),
                );
                setSumCombo(sum);
                // console.log(combo);
            } else setSumCombo(0);
        };
        fetch();
    }, [combo]);

    return (
        <div className="card-book" style={{ position: 'sticky', top: '15px' }}>
            {film != null && (
                <>
                    <ImageBase
                        pathImg={film.image}
                        style={{
                            height: '200px',
                            width: '100%',
                            borderRadius: '5px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'flex',
                            objectFit: 'cover',
                        }}
                    />
                    <p className="fw-bold mt-3 mx-2">{film.name.toUpperCase()}</p>
                    <p className="mt-3 mx-2">
                        Giới hạn độ tuổi: <span className="fw-bold">{film.age}</span>
                    </p>
                    <p className="mt-3 mx-2">
                        Rạp:{' '}
                        <span className="fw-bold">
                            <Name detail={detailTheater} id={theater} />
                        </span>
                    </p>
                    <p className="mt-3 mx-2">
                        Phòng:{' '}
                        <span className="fw-bold">{idRoom !== '' && <Name detail={detailRoom} id={idRoom} />}</span>
                    </p>
                    <p className="mt-3 mx-2">
                        Suất chiếu:{' '}
                        {Object.keys(time).length !== 0 && (
                            <span className="fw-bold">
                                {time.timeStart} {moment(time.date).format('DD-MM-YYYY')}
                            </span>
                        )}
                    </p>
                    <hr />
                    <p className="mt-3 mx-2">
                        Ghế:{' '}
                        {seat.length !== 0 && (
                            <span className="fw-bold">
                                {seat.map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`).join(', ')}
                            </span>
                        )}
                    </p>
                    <p
                        className="mt-3 mx-2"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                    >
                        <span>Combo:</span>
                        <div style={{ textAlign: 'right' }}>
                            {combo.length !== 0 &&
                                combo.map((item, index) => (
                                    <span key={index} className="fw-bold text-end" style={{ display: 'block' }}>
                                        <Name id={item.id} detail={detailCombo} /> x {item.quantity}
                                    </span>
                                ))}
                        </div>
                    </p>
                    <hr />
                    <p className="mt-3 mx-2" style={{ display: 'flex' }}>
                        Tổng tiền:{' '}
                        <span className="fw-bold h5" style={{ color: 'red', marginLeft: 'auto' }}>
                            {(price + sumCombo).toLocaleString('it-IT')}đ
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default CardBookTicket;
