import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Partial/Sidebar';
import Navbar from '../components/Partial/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../app/Slices/productsSlice';
import { fetchSuppliers } from '../app/Slices/suppliersSlice';
import { fetchSales } from '../app/Slices/salesSlice';
import { fetchMouvements } from '../app/Slices/mouvementsSlice';

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(user?.id){
            dispatch(fetchProducts(user.id));
            dispatch(fetchSuppliers(user.id));
            dispatch(fetchSales(user.id));
            dispatch(fetchMouvements(user.id));
        }
    }, [dispatch, user?.id]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <div className="flex-1 relative overflow-hidden flex flex-col">
          
          
          {!isCollapsed && (
            <div 
              className="absolute inset-0 bg-slate-900/50  z-50 cursor-pointer transition-all duration-300"
              onClick={() => setIsCollapsed(true)}
              title="Fermer le menu"
            />
          )}

          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
          
        </div>
      </div>
    </div>
  );
}