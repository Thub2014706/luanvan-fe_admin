import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { listCombo } from '~/services/ComboService';
import { useDispatch, useSelector } from 'react-redux';
import { addCombo } from '~/features/showTime/showTimeSlice';
import ComboItem from '../ComboItem/ComboItem';

const OffcanvasCombo = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [combo, setCombo] = useState([]);
    const [selectCombo, setSelectCombo] = useState([]);
    const comboSlice = useSelector((state) => state.showTime.combo);

    useEffect(() => {
        const fetch = async () => {
            const data = await listCombo();
            setCombo(data);
            const array = data.map((item) => {
                const com = comboSlice.find((com) => com.id === item._id);
                return {
                    id: item._id,
                    quantity: com ? com.quantity : 0,
                    name: item.name,
                    price: item.price,
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
                        <ComboItem
                            item={item}
                            value={selectCombo[index].quantity}
                            handleValue={(e) => handleValue(e, index)}
                            handleMinus={() => handleMinus(index)}
                            handleAdd={() => handleAdd(index)}
                        />
                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasCombo;
