import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { filmRevenue, theaterRevenue } from '~/services/StatisticalService';
import ModalFilmRevenue from '../ModalFilmRevenue/ModalFilmRevenue';
import ModalTheaterRevenue from '../ModalTheaterRevenue/ModalTheaterRevenue';

const FooterStatistical = () => {
    const [films, setFilms] = useState([]);
    const [showFilm, setShowFilm] = useState(false);
    const [theaters, setTheaters] = useState([]);
    const [showTheater, setShowTheater] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data1 = await filmRevenue('');
            setFilms(data1);
            const data2 = await theaterRevenue('');
            setTheaters(data2);
        };

        fetch();
    }, []);

    const handleShowFilm = () => {
        setShowFilm(true);
    };

    const handleCloseFilm = () => {
        setShowFilm(false);
    };

    const handleShowTheater = () => {
        setShowTheater(true);
    };

    const handleCloseTheater = () => {
        setShowTheater(false);
    };

    return (
        <div className="mt-4 w-100">
            <Row className="w-100">
                <Col
                    className="p-4"
                    style={{ backgroundColor: 'white', marginLeft: 0, marginRight: '20px', borderRadius: '10px' }}
                >
                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Doanh thu theo phim</h5>
                        <p style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleShowFilm}>
                            Xem tất cả
                        </p>
                    </div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Phim</th>
                                    <th className="text-center align-middle">Vé bán ra</th>
                                    <th className="text-center align-middle w-auto">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {films
                                    .sort((a, b) => b.total - a.total)
                                    .map(
                                        (item, index) =>
                                            index < 4 && (
                                                <tr key={index}>
                                                    <td>{item.item.name}</td>
                                                    <td
                                                        className="text-center align-middle"
                                                        style={{ minWidth: '100px' }}
                                                    >
                                                        {item.numberTicket}
                                                    </td>
                                                    <td className="text-center align-middle w-auto">
                                                        {item.total.toLocaleString('it-IT')}đ
                                                    </td>
                                                </tr>
                                            ),
                                    )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col className="p-4" style={{ backgroundColor: 'white', marginLeft: 0, borderRadius: '10px' }}>
                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Doanh thu theo rạp</h5>
                        <p style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleShowTheater}>
                            Xem tất cả
                        </p>
                    </div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Rạp</th>
                                    <th className="text-center align-middle">Vé bán ra</th>
                                    <th className="text-center align-middle w-auto">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {theaters
                                    .sort((a, b) => b.total - a.total)
                                    .map(
                                        (item, index) =>
                                            index < 4 && (
                                                <tr key={index}>
                                                    <td>{item.item.name}</td>
                                                    <td
                                                        className="text-center align-middle"
                                                        style={{ minWidth: '100px' }}
                                                    >
                                                        {item.numberTicket}
                                                    </td>
                                                    <td className="text-center align-middle w-auto">
                                                        {item.total.toLocaleString('it-IT')}đ
                                                    </td>
                                                </tr>
                                            ),
                                    )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
            <ModalFilmRevenue show={showFilm} handleClose={handleCloseFilm} />
            <ModalTheaterRevenue show={showTheater} handleClose={handleCloseTheater} />
        </div>
    );
};

export default FooterStatistical;
