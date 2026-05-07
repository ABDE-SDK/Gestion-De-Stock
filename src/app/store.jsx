import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/Slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
