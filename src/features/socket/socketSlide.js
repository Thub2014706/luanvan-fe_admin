import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socketConnect: null
    },
    reducers: {
        setSocketConnect: (state, action) => {
            state.socketConnect = action.payload;
        },
    },
});

export const { setSocketConnect } = socketSlice.actions;

export default socketSlice.reducer;
