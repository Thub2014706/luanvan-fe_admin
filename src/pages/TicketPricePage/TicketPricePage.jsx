import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { typeUserPrice } from '~/constants';

const TicketPricePage = () => {
    const [price, setPrice] = useState([
        {
            typeUser: '',
            time: '',
            price: '',
        },
    ]);

    const handlePrice = () => {};

    // const day = new Date()
    // console.log(day.getDay())
    return (
        <div className="p-4">
            <h5 className="mb-4 fw-bold">Giá vé</h5>
            <Table bordered>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Học sinh, sinh viên</th>
                        <th>Người lớn</th>
                        <th>Người già, trẻ em</th>
                        <th>Thành viên, vé trực tuyến</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2}>Thứ 2 đến thứ 5</td>
                        <td>Trước 17h</td>
                        <td>
                            <Form.Control
                                type="text"
                                // value={price[].price}
                                onChange={(e) => handlePrice(typeUserPrice[0], 2, e.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>Sau 17h</td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={2}>Thứ 6 đến chủ nhật</td>
                        <td>Trước 17h</td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>Sau 17h</td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                        <td>
                            <Form.Control type="text" />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default TicketPricePage;
