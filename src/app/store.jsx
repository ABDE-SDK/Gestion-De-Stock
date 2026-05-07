import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';
import suppliersReducer from '../Slices/SuppliersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suppliers: suppliersReducer,
  },
});
