import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import { filmRevenue } from '~/services/StatisticalService';

const ModalFilmRevenue = ({ show, handleClose }) => {
    const [film, setFilm] = useState('');
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await filmRevenue(film);
            setFilms(data);
        };

        fetch();
    }, [film]);

    const handleSearch = (value) => {
        setFilm(value);
    };

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header>
                <h5>DOANH THU THEO PHIM</h5>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <SearchBar handleSubmit={handleSearch} />
                <Table className="mt-5">
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
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item.name}</td>
                                    <td className="text-center align-middle" style={{ minWidth: '100px' }}>
                                        {item.numberTicket}
                                    </td>
                                    <td className="text-center align-middle w-auto">
                                        {item.total.toLocaleString('it-IT')}đ
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default ModalFilmRevenue;
