import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ handleSubmit }) => {
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        handleSubmit(search);
    };
    return (
        <Form onSubmit={handleSearch}>
            <Form.Group className="input-search">
                <Form.Control
                    className="input"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm..."
                />
                {search !== '' && (
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="position-absolute top-50 translate-middle"
                        style={{ right: '35px', zIndex: 100, color: '#9b9b9b' }}
                        onClick={() => setSearch('')}
                    />
                )}
                <button type="submit" className="icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>{' '}
            </Form.Group>
        </Form>
    );
};

export default SearchBar;
