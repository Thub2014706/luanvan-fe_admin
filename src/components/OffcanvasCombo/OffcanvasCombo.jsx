import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Form, InputGroup, Offcanvas, Row } from 'react-bootstrap';
import { allCombo } from '~/services/ComboService';
import ImageBase from '../ImageBase/ImageBase';
import Name from '../Name/Name';
import { detailFood } from '~/services/FoodService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCombo } from '~/features/showTime/showTimeSlice';

const OffcanvasCombo = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [combo, setCombo] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const comboSlice = useSelector((state) => state.showTime.combo);

    useEffect(() => {
        const fetch = async () => {
            const data = await allCombo('', 1, 10);
            setCombo(data.data);
            const array = data.data.map((item) => {
                const com = comboSlice.find((com) => com.id === item._id);
                return {
                    id: item._id,
                    quantity: com ? com.quantity : 0,
                };
            });
            setSelectCombo(array);
        };
        fetch();
    }, [comboSlice]);

    const handleMinus = (index) => {
        const copy = [...selectCombo];
        if (copy[index].quantity > 0) {
            const updatedCombo = {
                ...copy[index],
                quantity: copy[index].quantity - 1,
            };
            copy[index] = updatedCombo;
        }
        dispatch(addCombo(copy.filter((item) => item.quantity !== 0)));
        setSelectCombo(copy);
    };

    const handleAdd = (index) => {
        const copy = [...selectCombo];
        const updatedCombo = {
            ...copy[index],
            quantity: copy[index].quantity + 1,
        };
        copy[index] = updatedCombo;
        dispatch(addCombo(copy.filter((item) => item.quantity !== 0)));
        setSelectCombo(copy);
    };

    const handleValue = (e, index) => {
        const copy = [...selectCombo];
        const updatedCombo = {
            ...copy[index],
            quantity: e.target.value >= 0 ? Number(e.target.value) : 0,
        };
        copy[index] = updatedCombo;
        dispatch(addCombo(copy.filter((item) => item.quantity !== 0)));
        setSelectCombo(copy);
    };

    // const handleSave = () => {
    //     dispatch(addCombo(selectCombo.filter((item) => item.quantity !== 0)));
    // };

    console.log(comboSlice);

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Chọn Combo</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* <Button onClick={handleSave}>Lưu</Button> */}
                {combo.map((item, index) => (
                    <div className="my-4">
                        <Row>
                            <Col xs="auto">
                                <ImageBase
                                    pathImg={item.image}
                                    style={{ height: '130px', width: '130px', display: 'flex', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col>
                                <p>
                                    <span className="fw-bold">{item.name}</span>
                                    <br />
                                    {item.variants.map((food) => (
                                        <span>
                                            <Name id={food.food} detail={detailFood} /> x {food.quantity}
                                            <br />
                                        </span>
                                    ))}
                                    <p className="mt-2">
                                        Giá: <span style={{ color: 'red' }}>{item.price.toLocaleString('it-IT')}đ</span>
                                    </p>
                                </p>
                                <InputGroup size="sm">
                                    <Button variant="outline-secondary" onClick={() => handleMinus(index)}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    <Form.Control
                                        type="text"
                                        style={{ maxWidth: '40px', textAlign: 'center', border: '1px solid gray' }}
                                        value={selectCombo[index].quantity}
                                        onChange={(e) => handleValue(e, index)}
                                    />
                                    <Button variant="outline-secondary" onClick={() => handleAdd(index)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasCombo;
