import { createSlice } from '@reduxjs/toolkit';

export const showTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        step: 1,
        room: '',
    },
    reducers: {
        stepNext: (state, action) => {
            state.step = action.payload;
        },
        roomValue: (state, action) => {
            state.room = action.payload;
        },
        preStep1: (state) => {
            state.step = 1;
            state.room = '';
        },
    },
});

export const { stepNext, roomValue, preStep1 } = showTimeSlice.actions;

export default showTimeSlice.reducer;
