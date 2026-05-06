import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Partial/Sidebar';
import Navbar from '../components/Partial/Navbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {/* هاد Outlet هو البلاصة فين غايتبدل المحتوى (Dashboard, Products...) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}