import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Suppliers from '../pages/Suppliers';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;