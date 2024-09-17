import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import ImageBase from '../ImageBase/ImageBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Name from '../Name/Name';
import { detailFood } from '~/services/FoodService';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ComboItem = ({ item, value, handleValue, handleMinus, handleAdd }) => {
    return (
        <Row>
            <Col xs="auto">
                <ImageBase
                    pathImg={item.image}
                    style={{
                        height: '130px',
                        width: '130px',
                        display: 'flex',
                        objectFit: 'cover',
                        borderRadius: '5px',
                    }}
                />
            </Col>
            <Col className='d-flex flex-column justify-content-between'>
                <div>
                    <span className="fw-bold">{item.name}</span>
                    <br />
                    {item.variants &&
                        item.variants.map((food) => (
                            <span>
                                <Name id={food.food} detail={detailFood} /> x {food.quantity}
                                <br />
                            </span>
                        ))}
                    <div className="mt-2">
                        Giá: <span style={{ color: 'red' }}>{item.price.toLocaleString('it-IT')}đ</span>
                    </div>
                </div>
                <InputGroup size="sm" className='mt-auto'>
                    <Button variant="outline-secondary" onClick={handleMinus}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <Form.Control
                        type="text"
                        style={{ maxWidth: '40px', textAlign: 'center', border: '1px solid gray' }}
                        value={value}
                        onChange={handleValue}
                    />
                    <Button variant="outline-secondary" onClick={handleAdd}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default ComboItem;
