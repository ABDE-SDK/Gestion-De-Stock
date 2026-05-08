import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import authReducer from '../Slices/authSlice';
import suppliersReducer from '../Slices/SuppliersSlice';
=======
import authReducer from '../app/Slices/authSlice';
>>>>>>> a40d245bf7f2a86d02e0b8398eb355a489019ef5

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suppliers: suppliersReducer,
  },
});
