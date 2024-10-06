import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';
import feedSlice from './feedSlice';


const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedSlice,
    }
});

export default appStore;