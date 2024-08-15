import React from 'react';
import { Form } from 'react-bootstrap';

const ShowPage = ({ numberPage, handleNumberPage }) => {
    const handleChange = (e) => {
        handleNumberPage(e.target.value);
    };
    return (
        <div className="d-flex align-items-center justify-content-end">
            <p className="mb-0 mx-2">Hiển thị</p>
            <Form.Select className="page-number" value={numberPage} onChange={handleChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </Form.Select>
            <p className="mb-0 mx-2">dòng</p>
        </div>
    );
};

export default ShowPage;
