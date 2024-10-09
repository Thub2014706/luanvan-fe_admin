import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {  Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { avgComment } from '~/services/CommentService';

const AllComment = ({ comments }) => {
    const [avg, setAvg] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const data = await avgComment(id);
            setAvg(data);
        };
        fetch();
    }, [id]);    

    return (
        <div className="py-4">
            <h5 className="fw-bold mt-3">Tất cả đánh giá</h5>

            <Row className="mb-3">
                {/* <Col>
                    <ShowPage numberPage={numberPage} handleNumberPage={handleNumberPage} />
                </Col>
                <Col>
                    <SearchBar handleSubmit={handleSearch} />
                </Col> */}
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>Người dùng</th>
                            <th>Xếp hạng {avg !== null && `(${avg}/5)`}</th>
                            <th>Đánh giá</th>
                            <th>Ngày đánh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length > 0 ? (
                            comments.map((item, index) => (
                                <tr>
                                    <td className="text-center align-middle">{index + 1}</td>
                                    <td className="text-center align-middle">{item.user.username}</td>
                                    <td className="text-center align-middle">{item.star}</td>
                                    <td style={{ maxWidth: '350px' }}>{item.text}</td>
                                    <td className="text-center align-middle">
                                        {moment(item.createdAt).format('DD-MM-YYYY')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className='text-center'>Không có đánh giá nào</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
            {/* <Row>
                <Pagination length={sumPage} selectNumber={handleNumber} currentPage={number} />
            </Row> */}
        </div>
    );
};

export default AllComment;
