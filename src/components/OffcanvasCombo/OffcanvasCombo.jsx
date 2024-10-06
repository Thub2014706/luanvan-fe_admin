import React, { useEffect, useState } from 'react';
import { Col, Offcanvas, Row } from 'react-bootstrap';
import { listCombo } from '~/services/ComboService';
import { useDispatch } from 'react-redux';
import { addCombo } from '~/features/showTime/showTimeSlice';
import ComboItem from '../ComboItem/ComboItem';
import { listFood } from '~/services/FoodService';

const OffcanvasCombo = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [combo, setCombo] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const [food, setFood] = useState([]);
    const [selectFood, setSelectFood] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data1 = await listCombo();
            setCombo(data1);
            setSelectCombo(
                data1.map((item) => {
                    return {
                        id: item._id,
                        quantity: 0,
                        name: item.name,
                        price: item.price,
                    };
                }),
            );
            const data2 = await listFood();
            setFood(data2);
            setSelectFood(
                data2.map((item) => {
                    return {
                        id: item._id,
                        quantity: 0,
                        name: item.name,
                        price: item.price,
                    };
                }),
            );
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = () => {
            const combos = selectCombo.filter((item) => item.quantity > 0);
            const foods = selectFood.filter((item) => item.quantity > 0);
            const data = [...combos, ...foods];

            dispatch(addCombo(data));
        };
        fetch();
    }, [selectCombo, selectFood, dispatch]);

    // console.log(comboSlice);

    const handleMinus = (index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        if (copy[index].quantity > 0) {
            const updated = {
                ...copy[index],
                quantity: copy[index].quantity - 1,
            };
            copy[index] = updated;
        }
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };

    const handleAdd = (index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: copy[index].quantity + 1,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };

    const handleValue = (e, index, check) => {
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: e.target.value >= 0 ? Number(e.target.value) : 0,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };
    // console.log(comboSlice);

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <h4>Chọn Combo</h4>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* <Button onClick={handleSave}>Lưu</Button> */}
                <Row>
                    <Col>
                        <hr />
                    </Col>
                    <Col xs="auto">
                        <h5>COMBO</h5>
                    </Col>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                {combo.map((item, index) => (
                    <div className="my-4" key={`combo-${item._id}`}>
                        <ComboItem
                            item={item}
                            value={selectCombo[index]?.quantity || 0}
                            handleValue={(e) => handleValue(e, index, 'combo')}
                            handleMinus={() => handleMinus(index, 'combo')}
                            handleAdd={() => handleAdd(index, 'combo')}
                        />
                    </div>
                ))}
                <Row className="mt-5">
                    <Col>
                        <hr />
                    </Col>
                    <Col xs="auto">
                        <h5>THỨC ĂN LẺ</h5>
                    </Col>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                {food.map((item, index) => (
                    <div className="my-4" key={`food-${item._id}`}>
                        <ComboItem
                            item={item}
                            value={selectFood[index]?.quantity || 0}
                            handleValue={(e) => handleValue(e, index, 'food')}
                            handleMinus={() => handleMinus(index, 'food')}
                            handleAdd={() => handleAdd(index, 'food')}
                        />
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasCombo;
