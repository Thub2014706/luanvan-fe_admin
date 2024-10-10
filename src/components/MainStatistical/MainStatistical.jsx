import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { sDayCombo, sDayRevenueCombo, sDayRevenueTicket, sDayTicket } from '~/services/StatisticalService';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);
const MainStatistical = () => {
    const [reve, setReve] = useState(1);
    const [revenue1, setRevenue1] = useState([]);
    const [labelRevenue, setLabelRevenue] = useState([]);
    const [ticket, setTicket] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [labelTicket, setLabelTicket] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data1 = reve === 1 ? await sDayRevenueTicket() : await sDayRevenueCombo();
            setRevenue1(Object.values(data1));
            setLabelRevenue(Object.keys(data1).map((item) => moment(item).format('DD-MM-YYYY')));
        };

        fetch();
    }, [reve]);

    useEffect(() => {
        const fetchFilms = async () => {
            const data1 = ticket === 1 ? await sDayTicket() : await sDayCombo();
            setTickets(Object.values(data1));
            setLabelTicket(Object.keys(data1).map((item) => moment(item).format('DD-MM-YYYY')));
        };

        fetchFilms();
    }, [ticket]);

    return (
        <div className="mt-4">
            <Row className="p-4" style={{ backgroundColor: 'white', width: '100%' }}>
                <h5 className="fw-bold mb-4">Thống kê</h5>
                <Row>
                    <Col xs={6}>
                        <Row className="mb-4">
                            <Col>
                                <Form.Select size="sm" value={ticket} onChange={(e) => setTicket(e.target.value)}>
                                    <option value={1}>Tổng số vé phim</option>
                                    <option value={2}>Tổng số hóa đơn bắp nước</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select size="sm" value={ticket} onChange={(e) => setTicket(e.target.value)}>
                                    <option value={1}>Tổng số vé phim</option>
                                    <option value={2}>Tổng số hóa đơn bắp nước</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: `Tổng số ${
                                            ticket === 1 ? 'vé phim' : 'hoá đơn bắp nước'
                                        } 7 ngày gần nhất`,
                                    },
                                },
                            }}
                            data={{
                                labels: labelTicket,
                                datasets: [
                                    {
                                        label: `${ticket === 1 ? 'Số vé' : 'Số hóa đơn'}`,
                                        data: tickets,
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                            }}
                        />
                    </Col>
                    <Col xs={6}>
                        <Row className="mb-4">
                            <Col>
                                <Form.Select size="sm" value={reve} onChange={(e) => setReve(e.target.value)}>
                                    <option value={1}>Doanh thu vé phim</option>
                                    <option value={2}>Doanh thu bắp nước (không kèm trong vé phim)</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select size="sm" value={ticket} onChange={(e) => setTicket(e.target.value)}>
                                    <option value={1}>Tổng số vé phim</option>
                                    <option value={2}>Tổng số hóa đơn bắp nước</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Line
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: `Doanh thu ${reve === 1 ? 'vé phim' : 'bắp nước (không kèm trong vé phim)'} 7 ngày gần nhất`,
                                    },
                                },
                            }}
                            data={{
                                labels: labelRevenue,
                                datasets: [
                                    {
                                        label: 'Doanh thu',
                                        data: revenue1,
                                        borderColor: 'rgb(255, 99, 132)',
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    },
                                ],
                            }}
                        />
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default MainStatistical;
