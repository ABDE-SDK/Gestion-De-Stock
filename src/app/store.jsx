import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/Slices/authSlice';
import suppliersReducer  from "../app/Slices/SuppliersSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    suppliers: suppliersReducer,
  },
});
