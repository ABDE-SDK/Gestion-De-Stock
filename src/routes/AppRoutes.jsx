import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';

// صفحة مؤقتة للسلعة باش نتيستيو
const Products = () => <div className="p-6 text-2xl font-bold">Gestion des Produits 📦</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;