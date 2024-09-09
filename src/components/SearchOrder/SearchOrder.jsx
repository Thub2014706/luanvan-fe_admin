import { CFormLabel, CMultiSelect } from '@coreui/react-pro';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { listTheater } from '~/services/TheaterService';

const SearchOrder = ({ handleSearchAll }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [theater, setTheater] = useState([]);
    const [theaters, setTheaters] = useState([]);

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
    }, [user?.data.theater]);
    // console.log(user.data.theater, theater);

    const handleSearch = () => {
        handleSearchAll(theater.length > 0 ? theater[0].value : '');
    };

    return (
        <Row>
            <CFormLabel className="fw-bold col-sm-auto mt-1" htmlFor="theater">
                    Rạp chiếu
                </CFormLabel>
            <Col sm="auto">
                <CMultiSelect
                    id="theater"
                    multiple={false}
                    optionsStyle="text"
                    disabled={!!user.data.theater}
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
            </Col>
            {!user?.data.theater && (
                <Col>
                    <div className="button add" onClick={handleSearch}>
                        Tìm kiếm
                    </div>
                </Col>
            )}
        </Row>
    );
};

export default SearchOrder;
