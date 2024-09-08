import { createSlice } from '@reduxjs/toolkit';

export const comboCartSlice = createSlice({
    name: 'comboCart',
    initialState: {
        step: 1,
        combo: [],
        price: 0,
        idOrder: null,
    },
    reducers: {
        stepNext: (state, action) => {
            state.step = action.payload;
        },
        addCart: (state, action) => {
            state.combo = action.payload.combo;
            state.price = action.payload.price;
        },
        priceValue: (state, action) => {
            state.price = action.payload;
        },
        idOrderValue: (state, action) => {
            state.idOrder = action.payload;
        },
        removeAll: (state) => {
            state.step = 1;
            state.price = 0;
            state.combo = [];
        },
        removeIdOrder: (state) => {
            state.idOrder = null;
        },
        preStep1: (state) => {
            state.step = 1;
            state.combo = [];
            state.price = 0;
        },
    },
});

export const { stepNext, addCart, priceValue, idOrderValue, removeAll, removeIdOrder, preStep1 } =
    comboCartSlice.actions;

export default comboCartSlice.reducer;
