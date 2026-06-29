import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../app/Slices/authSlice';
import suppliersReducer  from "../app/Slices/SuppliersSlice"
import productsReducer from '../app/Slices/ProductsSlice'
import mouvementsReducer from "./Slices/MouvementsSlice";
import salesReducer from "./Slices/SalesSlice";
import customersReducer from "./Slices/CustomersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    suppliers: suppliersReducer,
    products: productsReducer,
    mouvements: mouvementsReducer,
    sales: salesReducer,
    customers: customersReducer,
  },
});
