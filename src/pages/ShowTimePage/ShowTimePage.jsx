import { CCol, CDatePicker, CForm, CFormLabel, CFormSelect, CMultiSelect, CRow } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DetailShowTime from '~/components/DetailShowTime/DetailShowTime';
// import { CCol, Form, CRow } from 'react-bootstrap';
// import { CCol, Form, CRow, Table } from 'react-bootstrap';
import RoomShowTime from '~/components/RoomShowTime/RoomShowTime';
import { filterRoomByTheater, listRoomByTheater } from '~/services/RoomService';
import { listTheater } from '~/services/TheaterService';

const ShowTimePage = () => {
    const [theater, setTheater] = useState([]);
    const [room, setRoom] = useState('');
    const [date, setDate] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    const [theaters, setTheaters] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [theaterSearch, setTheaterSerch] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (theater.length !== 0) {
                const data = await listRoomByTheater(theater[0].value);
                setRooms(data);
            }
        };
        fetch();
    }, [theater]);

    const handleSearch = async () => {
        // const data = await filterRoomByTheater(theater, room);
        // setTheaterSerch(data);
        if (theater.length !== 0) {
            setTheaterSerch(theater[0].value);
        }
    };

    // console.log('ê', theater, room, date);
    return (
        <div className="p-4">
            <h5 className="fw-bold">Suất chiếu</h5>
            <CRow className="mt-4">
                <CCol>
                    <CRow>
                        <CFormLabel className="fw-bold col-sm-4 mt-1" htmlFor="theater">
                            Rạp chiếu
                        </CFormLabel>
                        <CCol sm={8}>
                            <CMultiSelect
                                id="theater"
                                multiple={false}
                                optionsStyle="text"
                                clearSearchOnSelect
                                options={theaters.map((item) => ({
                                    value: item._id,
                                    label: item.name,
                                    // selected: genre.find((mini) => mini.value === item._id),
                                }))}
                                value={theater}
                                onChange={(value) => setTheater(value)}
                                placeholder="Phim chiếu"
                            />
                            {/* <CFormSelect
                                    id="theater"
                                    value={theater}
                                    name="theater"
                                    onChange={(e) => setTheater(e.target.value)}
                                >
                                    <option value="">Chọn rạp chiếu</option>
                                    {theaters.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect> */}
                        </CCol>
                    </CRow>
                </CCol>

                <CCol>
                    <CRow>
                        <CFormLabel className="fw-bold col-sm-4 mt-1" htmlFor="room">
                            Phòng chiếu
                        </CFormLabel>
                        <CCol sm={8}>
                            <CFormSelect id="room" value={room} name="room" onChange={(e) => setRoom(e.target.value)}>
                                <option>Chọn phòng chiếu</option>
                                {rooms?.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
                    </CRow>
                </CCol>

                <CCol>
                    <CRow>
                        <CFormLabel className="fw-bold col-sm-4 mt-1" htmlFor="date">
                            Ngày chiếu <span style={{ color: 'red' }}>*</span>
                        </CFormLabel>
                        <CCol sm={8}>
                            <CDatePicker
                                id="date"
                                name="date"
                                value={date}
                                date={date}
                                onDateChange={(date) => setDate(date)}
                            />
                        </CCol>
                    </CRow>
                </CCol>
                <CCol xs={2}>
                    <div className="button add" onClick={handleSearch}>
                        Tìm kiếm
                    </div>
                </CCol>
            </CRow>

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
                {theaters.map((item) => {
                    if (theaterSearch === '' || theaterSearch === item._id) {
                        return (
                            <div className="my-3" key={item._id}>
                                <h5>Rạp: {item.name}</h5>
                                <RoomShowTime id={item._id} date={date} />
                            </div>
                        );
                    }
                    return null;
                })}
            </CRow>
        </div>
    );
};

export default ShowTimePage;
