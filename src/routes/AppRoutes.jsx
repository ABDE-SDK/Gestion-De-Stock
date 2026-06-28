import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Suppliers from '../pages/Suppliers';
import StockMovements from '../pages/StockMovements';
import Sales from '../pages/Sales';
import Customers from '../pages/Customers';
import Settings from '../pages/Settings';

import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="stock-movements" element={<StockMovements />} />
          <Route path="sales" element={<Sales />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;