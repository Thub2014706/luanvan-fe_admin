import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const PaginationSearch = ({ length, selectNumber, handleSubmit }) => {
    const [number, setNumber] = useState(1);

    const [search, setSearch] = useState('');

    const array = [];

    for (let i = 1; i <= length; i++) {
        array.push(i);
    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
        selectNumber(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const deleteSearch = () => {
        setSearch('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setNumber(1);
        selectNumber(1);
        handleSubmit(search);
    };

    return (
        <Row>
            <Col>
                <Form as={Row}>
                    Hiện trang
                    <Form.Select
                        value={number}
                        size="sm"
                        style={{ width: '60px', marginLeft: '10px' }}
                        onChange={handleNumber}
                    >
                        {array.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </Col>
            <Col>
                <Form className="input-group float-end w-50 position-relative" onSubmit={handleSearchSubmit}>
                    <Form.Control
                        size="sm"
                        type="text"
                        value={search}
                        placeholder="Tìm kiếm..."
                        onChange={handleSearch}
                        style={{ paddingRight: '40px' }}
                    />
                    {search !== '' && (
                        <FontAwesomeIcon
                            className="position-absolute top-50 translate-middle"
                            style={{ right: '40px', zIndex: 100 }}
                            icon={faXmark}
                            color="grey"
                            onClick={deleteSearch}
                        />
                    )}
                    <Button variant="info" type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default PaginationSearch;
