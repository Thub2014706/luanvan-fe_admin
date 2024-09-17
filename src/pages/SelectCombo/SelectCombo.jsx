import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ComboItem from '~/components/ComboItem/ComboItem';
import ImageBase from '~/components/ImageBase/ImageBase';
import { addCart, stepNext } from '~/features/comboCart/comboCart';
import { listCombo } from '~/services/ComboService';
import { listFood } from '~/services/FoodService';

const SelectCombo = () => {
    const [combo, setCombo] = useState([]);
    const [food, setFood] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const [selectFood, setSelectFood] = useState([]);
    const [war, setWar] = useState('');
    const dispatch = useDispatch();
    const [select, setSelect] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const data1 = await listCombo();
            setCombo(data1);
            setSelectCombo(
                data1.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 0,
                    };
                }),
            );
            const data2 = await listFood();
            setFood(data2);
            setSelectFood(
                data2.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: 0,
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
            const sum = data.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                0,
            );
            setSelect(data)
            dispatch(addCart({ combo: data, price: sum }));
        };
        fetch();
    }, [selectCombo, selectFood, dispatch]);

    const handleValue = (e, index, check) => {
        setWar('')
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: e.target.value >= 0 ? Number(e.target.value) : 0,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
        // setPrice()
    };

    const handleMinus = (index, check) => {
        setWar('')
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
        setWar('')
        let copy = check === 'combo' ? [...selectCombo] : [...selectFood];
        const updated = {
            ...copy[index],
            quantity: copy[index].quantity + 1,
        };
        copy[index] = updated;
        check === 'combo' ? setSelectCombo(copy) : setSelectFood(copy);
    };

    const handleSubmit = () => {
        if (select.length > 0) {
            dispatch(stepNext(2));
        } else {
            setWar('Hãy chọn combo, bắp nước.');
        }
    };

    // console.log()

    return (
        <div>
            <Row>
                {combo.map((item, index) => (
                    <Col className="mb-5" sm={6}>
                        <ComboItem
                            item={item}
                            value={selectCombo[index].quantity}
                            handleValue={(e) => handleValue(e, index, 'combo')}
                            handleMinus={() => handleMinus(index, 'combo')}
                            handleAdd={() => handleAdd(index, 'combo')}
                        />
                    </Col>
                ))}
                {food.map((item, index) => (
                    <Col className="mb-5" sm={6}>
                        <ComboItem
                            item={item}
                            value={selectFood[index].quantity}
                            handleValue={(e) => handleValue(e, index, 'food')}
                            handleMinus={() => handleMinus(index, 'food')}
                            handleAdd={() => handleAdd(index, 'food')}
                        />
                    </Col>
                ))}
            </Row>
            {war !== '' && <p style={{ color: 'red', position: 'absolute' }}>{war}</p>}
            <div className="float-end d-flex">
                <div className="mt-5 button add" onClick={handleSubmit}>
                    Tiếp theo
                </div>
            </div>
        </div>
    );
};

export default SelectCombo;
