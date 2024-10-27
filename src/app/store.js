import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/features/auth/authSlice';
import showTimeReducer from '~/features/showTime/showTimeSlice';
import comboCartReducer from '~/features/comboCart/comboCart';
import socketReducer from '~/features/socket/socketSlide';
import informationReducer from '~/features/information/informationSlide';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'showTime', 'comboCart', 'socket', 'information'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    showTime: showTimeReducer,
    comboCart: comboCartReducer,
    socket: socketReducer,
    information: informationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
