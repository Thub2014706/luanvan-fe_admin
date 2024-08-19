import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        create: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        createStart: (state) => {
            state.create.isFetching = true;
        },
        createSuccess: (state) => {
            state.create.success = true;
            state.create.error = false;
            state.create.isFetching = false;
        },
        createFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
            state.create.success = false;
        },

        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    createStart,
    createSuccess,
    createFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
