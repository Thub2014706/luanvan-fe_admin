import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontBackgroundColor } from 'ckeditor5';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { listGenre } from '~/services/GenreService';

const ListGenre = ({ show, handleClose, selected, listSelect }) => {
    const [genres, setGenres] = useState([]);
    // const [genre, setGenre] = useState([]);
    // const [selectGenre, setSelectGenre] = useState([])
    const [array, setArray] = useState([]);

    const handleSelect = (id) => {
        // setGenre((pre) => [...pre, id]);
        if (!array.includes(id)) {
            setArray((pre) => [...pre, id]);
        } else {
            setArray(array.filter((item) => item !== id));
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const data = await listGenre();
            setGenres(data);
            setArray(selected);
        };
        fetch();
    }, [show, selected]);

    const handleSave = (e) => {
        e.preventDefault();
        listSelect(array);
    };

    // console.log('qqq',genre);

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Thể loại phim</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Thể loại</p>
                    {genres.map((item) => (
                        // <Form.Check
                        //     className="check-decor"
                        //     label={item.name}
                        //     name={item._id}
                        //     id={item._id}
                        //     type="checkbox"
                        //     value={item._id}
                        //     checked={array.includes(item._id)}
                        //     onClick={() => handleSelect(item._id)}
                        // />
                        <div className="d-flex">
                            <div style={{background: array.includes(item._id) ? 'linear-gradient(#4e337a, #264c9a)' : 'initial'}} className="button-check mt-1" onClick={() => handleSelect(item._id)}>
                                {array.includes(item._id) && (
                                    <FontAwesomeIcon icon={faCheck} size="sm" className="icon" color="white" />
                                )}
                            </div>
                            <p className="ms-1 name-check" onClick={() => handleSelect(item._id)}>
                                {item.name}
                            </p>
                        </div>
                    ))}
                    {/* {select === item && <FontAwesomeIcon icon={faCheck} className="icon" color="white" />} */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ListGenre;
