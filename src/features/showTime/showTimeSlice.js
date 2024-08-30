import { createSlice } from '@reduxjs/toolkit';

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        step: 1,
        theater: '',
        film: '',
        room: '',
        time: {},
        seat: [],
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
        timeValue: (state, action) => {
            state.time = action.payload;
        },
        seatValue: (state, action) => {
            state.seat = action.payload;
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
        },
    },
});

export const { stepNext, theaterValue, roomValue, filmValue, timeValue, seatValue, preStep1, preStep2, preStep3 } =
    showTimeSlice.actions;

export default showTimeSlice.reducer;
