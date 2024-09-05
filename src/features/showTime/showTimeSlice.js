import { createSlice } from '@reduxjs/toolkit';

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        step: 1,
        theater: '',
        film: '',
        idShowTime: null,
        room: '',
        time: {},
        seat: [],
        price: 0,
        idOrder: null,
    },
    reducers: {
        stepNext: (state, action) => {
            state.step = action.payload;
        },
        theaterValue: (state, action) => {
            state.theater = action.payload;
        },
        roomValue: (state, action) => {
            state.room = action.payload;
        },
        filmValue: (state, action) => {
            state.film = action.payload;
        },
        idShowTimeValue: (state, action) => {
            state.idShowTime = action.payload;
        },
        timeValue: (state, action) => {
            state.time = action.payload;
        },
        seatValue: (state, action) => {
            state.seat = action.payload;
        },
        priceValue: (state, action) => {
            state.price = action.payload;
        },
        idOrderValue: (state, action) => {
            state.idOrder = action.payload;
        },
        removeAll: (state) => {
            state.step = 1;
            state.theater = '';
            state.film = '';
            state.idShowTime = null;
            state.room = '';
            state.time = {};
            state.seat = [];
            state.price = 0;
            state.idOrder = null;
        },
        preStep1: (state) => {
            state.step = 1;
            state.film = '';
        },
        preStep2: (state) => {
            state.step = 2;
            state.room = '';
            state.time = {};
        },
        preStep3: (state) => {
            state.step = 3;
            state.seat = [];
            state.price = 0;
        },
    },
});

export const {
    stepNext,
    theaterValue,
    roomValue,
    filmValue,
    timeValue,
    seatValue,
    priceValue,
    idShowTimeValue,
    idOrderValue,
    removeAll,
    preStep1,
    preStep2,
    preStep3,
} = showTimeSlice.actions;

export default showTimeSlice.reducer;
