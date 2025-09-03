import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    reservation: reservationReducer,
  },
});

export default store;
