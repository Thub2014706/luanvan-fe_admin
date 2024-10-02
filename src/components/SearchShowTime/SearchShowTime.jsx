import { CCol, CDatePicker, CFormLabel, CFormSelect, CMultiSelect, CRow } from '@coreui/react-pro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listRoomByTheater } from '~/services/RoomService';
import { listTheater } from '~/services/TheaterService';

const SearchShowTime = ({ handleSearch }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [theater, setTheater] = useState([]);
    const [room, setRoom] = useState('');
    const [dateSearch, setDateSearch] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    const [theaters, setTheaters] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await listTheater();
            setTheaters(data);
            if (user?.data.theater) {
                const selectedTheater = data.find((item) => item._id === user.data.theater);
                if (selectedTheater) {
                    setTheater([{ value: selectedTheater._id, label: selectedTheater.name }]);
                }
            } else {
                setTheater([]);
            }
        };
        fetch();
    }, [user]);

    useEffect(() => {
        const fetch = async () => {
            if (theater.length !== 0) {
                const data = await listRoomByTheater(theater[0].value);
                setRooms(data);
            } else {
                setRooms([]);
            }
        };
        fetch();
    }, [theater]);

    const handleSearchAll = async () => {
        handleSearch(theater.length > 0 ? theater[0].value : '', room, dateSearch);
    };

    return (
        <div>
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
                                disabled={!!user?.data.theater}
                                clearSearchOnSelect
                                options={theaters.map((item) => ({
                                    value: item._id,
                                    label: item.name,
                                    selected: theater.length > 0 && theater[0].value === item._id,
                                }))}
                                value={theater}
                                onChange={(value) => setTheater(value)}
                                placeholder="Rạp chiếu"
                            />
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
                                <option value="">Chọn phòng chiếu</option>
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
                                // value={date}
                                date={dateSearch}
                                footer
                                cleaner={false}
                                onDateChange={(date) => setDateSearch(moment(date).format('YYYY-MM-DD'))}
                            />
                        </CCol>
                    </CRow>
                </CCol>
                <CCol xs={2}>
                    <div className="button add" onClick={handleSearchAll}>
                        Tìm kiếm
                    </div>
                </CCol>
            </CRow>
        </div>
    );
};

export default SearchShowTime;
