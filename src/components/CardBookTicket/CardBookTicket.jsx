import React, { useEffect, useState } from 'react';
import ImageBase from '../ImageBase/ImageBase';
import Name from '../Name/Name';
import { useSelector } from 'react-redux';
import { detailTheater } from '~/services/TheaterService';
import { detailRoom } from '~/services/RoomService';
import moment from 'moment';
import { detailFilm } from '~/services/FilmService';

const CardBookTicket = () => {
    const idFilm = useSelector((state) => state.showTime.film);
    const [film, setFilm] = useState(null);
    const idRoom = useSelector((state) => state.showTime.room);
    const time = useSelector((state) => state.showTime.time);
    const theater = useSelector((state) => state.showTime.theater);
    const seat = useSelector((state) => state.showTime.seat);

    useEffect(() => {
        const fetch = async () => {
            const data = await detailFilm(idFilm);
            setFilm(data);
        };
        fetch();
    }, [idFilm]);
    console.log(time);

    return (
        <div className="card-book">
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
                    <p className="mt-3 mx-2">
                        Ghế:{' '}
                        {seat.length !== 0 && (
                            <span className="fw-bold">
                                {seat.map((item) => `${String.fromCharCode(64 + item.row)}${item.col}`).join(', ')}
                            </span>
                        )}
                    </p>
                </>
            )}
        </div>
    );
};

export default CardBookTicket;
