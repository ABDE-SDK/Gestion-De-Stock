import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Suppliers from '../pages/Suppliers';
import Mouvements from '../pages/Mouvements';
import Ventes from '../pages/Ventes';
import Clients from '../pages/Clients'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/mouvements" element={<Mouvements />} />
        <Route path="/ventes" element={<Ventes />} />
        <Route path="/clients" element={<Clients />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;