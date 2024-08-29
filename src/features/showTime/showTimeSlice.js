import { createSlice } from '@reduxjs/toolkit';

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        step: 1,
        theater: '',
        film: '',
        room: '',
        time: {},
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
        preStep1: (state) => {
            state.step = 1;
            state.film = '';
        },
        preStep2: (state) => {
            state.step = 2;
            state.room = '';
            state.time = {};
        },
    },
});

export const { stepNext, theaterValue, roomValue, filmValue, timeValue, preStep1, preStep2 } = showTimeSlice.actions;

export default showTimeSlice.reducer;
