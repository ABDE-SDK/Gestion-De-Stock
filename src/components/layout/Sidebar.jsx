import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, LogOut } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
    { name: 'Produits', path: '/products', icon: Package },
    { name: 'Fournisseurs', path: '/suppliers', icon: Users },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 h-screen flex flex-col">

      <div className="p-6 border-b border-slate-800 flex items-center justify-center">
        <h1 className="text-white font-black text-2xl uppercase tracking-wider">
          <span className="text-blue-500">Auto</span>Parts
        </h1>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 mx-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2 rounded-lg hover:bg-slate-800/50">
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}