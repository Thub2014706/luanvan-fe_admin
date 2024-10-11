import { CDatePicker } from '@coreui/react-pro';
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
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { typeStatistical } from '~/constants';
import { sDayCombo, sDayRevenueCombo, sDayRevenueTicket, sDayTicket } from '~/services/StatisticalService';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);
const MainStatistical = () => {
    const [reve, setReve] = useState('1');
    const [revenue1, setRevenue1] = useState([]);
    const [labelRevenue, setLabelRevenue] = useState([]);
    const [ticket, setTicket] = useState('1');
    const [tickets, setTickets] = useState([]);
    const [labelTicket, setLabelTicket] = useState([]);
    const [typeRevenue, setTypeRevenue] = useState(typeStatistical[0]);
    const [typeNumber, setTypeNumber] = useState(typeStatistical[0]);
    const [startRevenue, setStartRevenue] = useState();
    const [endRevenue, setEndtRevenue] = useState();
    const [startNumber, setStartNumber] = useState();
    const [endNumber, setEndNumber] = useState();

    useEffect(() => {
        const fetch = async () => {
            const data1 = reve === '1' ? await sDayRevenueTicket(typeRevenue) : await sDayRevenueCombo(typeRevenue);
            setRevenue1(Object.values(data1));
            setLabelRevenue(
                Object.keys(data1).map((item) =>
                    typeRevenue === typeStatistical[3]
                        ? moment().month(item).format('MM-YYYY')
                        : moment(item).format('DD-MM-YYYY'),
                ),
            );
        };

        fetch();
    }, [reve, typeRevenue]);

    useEffect(() => {
        const fetchFilms = async () => {
            const data1 = ticket === '1' ? await sDayTicket(typeNumber) : await sDayCombo(typeNumber);
            setTickets(Object.values(data1));
            setLabelTicket(
                Object.keys(data1).map((item) =>
                    typeNumber === typeStatistical[3]
                        ? moment().month(item).format('MM-YYYY')
                        : moment(item).format('DD-MM-YYYY'),
                ),
            );
        };

        fetchFilms();
    }, [ticket, typeNumber]);

    const handleSelectRevenue = async () => {
        const data =
            reve === '1'
                ? await sDayRevenueTicket(typeRevenue, startRevenue, endRevenue)
                : await sDayRevenueCombo(typeRevenue, startRevenue, endRevenue);
        if (data) {
            setRevenue1(Object.values(data));
            setLabelRevenue(Object.keys(data).map((item) => moment(item).format('DD-MM-YYYY')));
        }
    };

    const handleSelectNumber = async () => {
        const data =
            ticket === '1'
                ? await sDayTicket(typeNumber, startNumber, endNumber)
                : await sDayCombo(typeNumber, startNumber, endNumber);
        if (data) {
            setTickets(Object.values(data));
            setLabelTicket(Object.keys(data).map((item) => moment(item).format('DD-MM-YYYY')));
        }
    };
    // console.log(startRevenue);

    return (
        <div className="mt-4">
            <Row className="p-4" style={{ backgroundColor: 'white', width: '100%' }}>
                <h5 className="fw-bold mb-4">Thống kê</h5>
                <Row>
                    <Col xs={6}>
                        <Row className="mb-4">
                            <Col>
                                <Form.Select
                                    size="sm"
                                    value={ticket}
                                    onChange={(e) => {
                                        setTicket(e.target.value);
                                        setStartNumber();
                                        setEndNumber();
                                        setTypeNumber(typeStatistical[0]);
                                    }}
                                >
                                    <option value={1}>Tổng số vé phim</option>
                                    <option value={2}>Tổng số hóa đơn bắp nước</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    size="sm"
                                    value={typeNumber}
                                    onChange={(e) => {
                                        setTypeNumber(e.target.value);
                                        setStartNumber();
                                        setEndNumber();
                                    }}
                                >
                                    <option value="">Chọn</option>
                                    {Object.values(typeStatistical).map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <CDatePicker
                                    footer
                                    size="sm"
                                    name="startDate"
                                    date={startNumber}
                                    value={startNumber}
                                    onDateChange={(date) => {
                                        setStartNumber(date);
                                        date && setTypeNumber('');
                                    }}
                                    placeholder="Ngày bắt đầu"
                                />
                            </Col>
                            <Col>
                                <CDatePicker
                                    footer
                                    size="sm"
                                    name="endDate"
                                    date={endNumber}
                                    value={endNumber}
                                    onDateChange={(date) => {
                                        setEndNumber(date);
                                        date && setTypeNumber('');
                                    }}
                                    placeholder="Ngày kết thúc"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="primary"
                                    className="px-3"
                                    size="sm"
                                    onClick={() => handleSelectNumber()}
                                >
                                    Chọn
                                </Button>
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
                                        text: `Tổng số ${ticket === '1' ? 'vé phim' : 'hoá đơn bắp nước'} ${
                                            startNumber || endNumber ? 'theo ngày chọn' : typeNumber.toLowerCase()
                                        }`,
                                    },
                                },
                            }}
                            data={{
                                labels: labelTicket,
                                datasets: [
                                    {
                                        label: `${ticket === '1' ? 'Số vé' : 'Số hóa đơn'}`,
                                        data: tickets,
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                            }}
                        />
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col>
                                <Form.Select
                                    size="sm"
                                    value={reve}
                                    onChange={(e) => {
                                        setReve(e.target.value);
                                        setStartRevenue();
                                        setEndtRevenue();
                                        setTypeRevenue(typeStatistical[0]);
                                    }}
                                >
                                    <option value={1}>Doanh thu phim</option>
                                    <option value={2}>Doanh thu bắp nước</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    size="sm"
                                    value={typeRevenue}
                                    onChange={(e) => {
                                        setTypeRevenue(e.target.value);
                                        setStartRevenue();
                                        setEndtRevenue();
                                    }}
                                >
                                    <option value="">Chọn</option>
                                    {Object.values(typeStatistical).map((item) => (
                                        <option value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <CDatePicker
                                    footer
                                    size="sm"
                                    name="startDate"
                                    date={startRevenue}
                                    value={startRevenue}
                                    onDateChange={(date) => {
                                        setStartRevenue(date);
                                        date && setTypeRevenue('');
                                    }}
                                    placeholder="Ngày bắt đầu"
                                />
                            </Col>
                            <Col>
                                <CDatePicker
                                    footer
                                    size="sm"
                                    name="endDate"
                                    date={endRevenue}
                                    value={endRevenue}
                                    onDateChange={(date) => {
                                        setEndtRevenue(date);
                                        date && setTypeRevenue('');
                                    }}
                                    placeholder="Ngày kết thúc"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="primary"
                                    className="px-3"
                                    size="sm"
                                    onClick={() => handleSelectRevenue()}
                                >
                                    Chọn
                                </Button>
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
                                        text: `Doanh thu ${reve === '1' ? 'phim' : 'bắp nước'} ${
                                            startRevenue || endRevenue ? 'theo ngày chọn' : typeRevenue.toLowerCase()
                                        }`,
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
