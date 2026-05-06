import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoutes from './ProtectedRoutes';
// صفحة مؤقتة للسلعة باش نتيستيو
const Products = () => <div className="p-6 text-2xl font-bold">Gestion des Produits 📦</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;