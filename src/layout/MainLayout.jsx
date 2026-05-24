import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Partial/Sidebar';
import Navbar from '../components/Partial/Navbar';

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

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