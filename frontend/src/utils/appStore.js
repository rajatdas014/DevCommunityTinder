import { configureStore } from '@reduxjs/toolkit';
import useSlice from './userSlice';
import feedSlice from './feedSlice';
import connectionSlice from './connectionSlice'
import requestSlice from './requestSlice';


const appStore = configureStore({
    reducer: {
        user: useSlice,
        feed: feedSlice,
        connection: connectionSlice,
        request: requestSlice,
    }
});

export default appStore;