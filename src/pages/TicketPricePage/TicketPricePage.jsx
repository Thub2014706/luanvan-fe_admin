import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { timePrice, typeUserPrice } from '~/constants';
import { addPrice, detailPrice } from '~/services/PriceService';

const TicketPricePage = () => {
    let array = [];
    const user = useSelector((state) => state.auth.login.currentUser);
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            array.push({ typeUser: typeUserPrice[j], time: timePrice[i], price: '' });
        }
    }

    const [price, setPrice] = useState(array);

    useEffect(() => {
        const fetch = async () => {
            for (let i = 0; i <= 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    const data = await detailPrice(typeUserPrice[j], timePrice[i]);
                    setPrice((pre) =>
                        pre.map((item) =>
                            item.typeUser === typeUserPrice[j] && item.time === timePrice[i]
                                ? { ...item, price: data.price }
                                : item,
                        ),
                    );
                }
            }
        };
        fetch();
    }, []);

    const handlePrice = (typeUser, time, price) => {
        setPrice((pre) =>
            pre.map((item) =>
                item.typeUser === typeUser && item.time === time ? { ...item, price: Number(price) } : item,
            ),
        );
    };

    const handleSubmit = async () => {
        await addPrice(price, user?.accessToken);
    };

    const getValue = (type, time) => {
        console.log(price.find((item) => item.typeUser === type && item.time === time)?.price || '');
        return price.find((item) => item.typeUser === type && item.time === time)?.price || '';
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Giá vé</h5>
            <Table bordered>
                <thead>
                    <tr className="text-center">
                        <th colSpan={2}>Thời gian</th>
                        <th>Học sinh, sinh viên</th>
                        <th>Người lớn</th>
                        <th>Người già, trẻ em</th>
                        <th>Thành viên, vé trực tuyến</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2} className="align-middle">
                            Thứ 2 đến thứ 5
                        </td>
                        <td className="align-middle">Trước 17h</td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[0], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[1], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[2], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[3], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[3], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle">Sau 17h</td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[0], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[1], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[2], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[3], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[3], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={2} className="align-middle">
                            Thứ 6 đến chủ nhật
                        </td>
                        <td className="align-middle">Trước 17h</td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[0], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[1], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[2], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[3], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[3], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle">Sau 17h</td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[0], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[1], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[2], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue(typeUserPrice[3], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[3], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="button add" onClick={handleSubmit}>
                Lưu
            </div>
        </div>
    );
};

export default TicketPricePage;
