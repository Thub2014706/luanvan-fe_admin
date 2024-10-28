import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import { theaterRevenue } from '~/services/StatisticalService';

const ModalTheaterRevenue = ({ show, handleClose }) => {
    const [theater, setTheater] = useState('');
    const [theaters, setTheaters] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await theaterRevenue(theater);
            setTheaters(data);
        };

        fetch();
    }, [theater]);

    const handleSearch = (value) => {
        setTheater(value);
    };

    return (
        <div>
            <Modal size="lg" centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <h5>DOANH THU PHIM THEO RẠP</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <SearchBar handleSubmit={handleSearch} />
                    <Table className="mt-5">
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
        </div>
    );
};

export default ModalTheaterRevenue;
