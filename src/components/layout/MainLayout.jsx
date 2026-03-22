import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
          <h2 className="text-slate-600 font-medium">Système de Gestion de Stock</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {/* هاد Outlet هو البلاصة فين غايتبدل المحتوى (Dashboard, Products...) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}