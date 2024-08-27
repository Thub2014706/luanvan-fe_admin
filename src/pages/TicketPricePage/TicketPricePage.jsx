import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { showToast, timePrice, typeSurcharge, typeUserPrice } from '~/constants';
import { addPrice, detailPrice } from '~/services/PriceService';
import { addSurcharge, detailSurcharge } from '~/services/SurchargeService';

const TicketPricePage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    let array1 = [];
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            array1.push({ typeUser: typeUserPrice[j], time: timePrice[i], price: '' });
        }
    }

    let array2 = [];
    for (let i = 0; i <= 3; i++) {
        array2.push({ type: typeSurcharge[i], price: '' });
    }

    const [price, setPrice] = useState(array1);
    const [sur, setSur] = useState(array2);

    useEffect(() => {
        const fetch = async () => {
            for (let i = 0; i <= 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    const data = await detailPrice(typeUserPrice[j], timePrice[i]);
                    if (data) {
                        setPrice((pre) =>
                            pre.map((item) =>
                                item.typeUser === typeUserPrice[j] && item.time === timePrice[i]
                                    ? { ...item, price: data.price }
                                    : item,
                            ),
                        );
                    }
                }
            }
            for (let i = 0; i <= 3; i++) {
                const data = await detailSurcharge(typeSurcharge[i]);
                if (data) {
                    setSur((pre) =>
                        pre.map((item) => (item.type === typeSurcharge[i] ? { ...item, price: data.price } : item)),
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

    const handleSur = (type, price) => {
        setSur((pre) => pre.map((item) => (item.type === type ? { ...item, price: Number(price) } : item)));
    };

    const handleSubmit = async () => {
        if ((await addPrice(price, user?.accessToken)) && (await addSurcharge(sur, user?.accessToken))) {
            showToast('Đã lưu', 'success');
        }
    };

    const getValue1 = (type, time) => {
        return price.find((item) => item.typeUser === type && item.time === time)?.price || '';
    };

    const getValue2 = (type) => {
        return sur.find((item) => item.type === type)?.price || '';
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
                                    value={getValue1(typeUserPrice[0], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[1], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[2], timePrice[0])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[3], timePrice[0])}
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
                                    value={getValue1(typeUserPrice[0], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[1], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[2], timePrice[1])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[3], timePrice[1])}
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
                                    value={getValue1(typeUserPrice[0], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[1], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[2], timePrice[2])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[3], timePrice[2])}
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
                                    value={getValue1(typeUserPrice[0], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[0], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[1], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[1], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[2], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[2], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue1(typeUserPrice[3], timePrice[3])}
                                    onChange={(e) => handlePrice(typeUserPrice[3], timePrice[3], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr className="text-center">
                        <th colSpan={6}>PHỤ THU</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2} className="align-middle">3D</td>
                        <td colSpan={4}>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue2(typeSurcharge[0])}
                                    onChange={(e) => handleSur(typeSurcharge[0], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="align-middle">IMAX</td>
                        <td colSpan={4}>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue2(typeSurcharge[1])}
                                    onChange={(e) => handleSur(typeSurcharge[1], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="align-middle">Ghế VIP</td>
                        <td colSpan={4}>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue2(typeSurcharge[2])}
                                    onChange={(e) => handleSur(typeSurcharge[2], e.target.value)}
                                />
                                <InputGroup.Text>đ</InputGroup.Text>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="align-middle">Ghế Couple</td>
                        <td colSpan={4}>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={getValue2(typeSurcharge[3])}
                                    onChange={(e) => handleSur(typeSurcharge[3], e.target.value)}
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
