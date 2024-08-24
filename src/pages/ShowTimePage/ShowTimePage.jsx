import { CCol, CRow } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DetailShowTime from '~/components/DetailShowTime/DetailShowTime';
import SearchShowTime from '~/components/SearchShowTime/SearchShowTime';
import { allShowTime } from '~/services/ShowTimeService';

const ShowTimePage = () => {
    const [theater, setTheater] = useState([]);
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    const [theaterSearch, setTheaterSerch] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await allShowTime(theater, room, date);
            setTheaterSerch(data);
            // console.log('dd', data);
        };
        fetch();
    }, [theater, room, date]);

    const handleSearch = async (theater, room, date) => {
        setTheater(theater);
        setRoom(room);
        setDate(date);
        const data = await allShowTime(theater, room, date);
        setTheaterSerch(data);
    };
    // console.log('ê', theater, room, date);

    return (
        <div className="p-4">
            <h5 className="fw-bold">Suất chiếu</h5>
            <SearchShowTime handleSearch={handleSearch} />
            <CRow className="mt-5">
                <CCol xs={4}>
                    <hr />
                </CCol>
                <CCol>
                    <h5 className="text-center">Lịch chiếu ngày: {moment(date).format('DD-MM-YYYY')}</h5>
                </CCol>
                <CCol xs={4}>
                    <hr />
                </CCol>
            </CRow>

            <CRow>
                {theaterSearch.map((item) => (
                    <div className="my-3" key={item.theater._id}>
                        <h5>Rạp: {item.theater.name}</h5>
                        {item.rooms.map((mini) => (
                            <div className="my-3">
                                <h6>{mini.room.name}</h6>
                                <DetailShowTime
                                    props={mini.showTimes}
                                    theater={item.theater._id}
                                    room={mini.room._id}
                                    date={date}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </CRow>
        </div>
    );
};

export default ShowTimePage;