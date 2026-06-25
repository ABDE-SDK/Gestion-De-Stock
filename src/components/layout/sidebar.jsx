import { ArrowRightLeft, LayoutDashboard, Package, Settings, ShoppingCart, Truck, Users, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../app/slices/authSlice';

const navigationItems = [
  { label: 'Tableau de bord', path: '/', icon: LayoutDashboard },
  { label: 'Produits', path: '/products', icon: Package },
  { label: 'Mouvements de stock', path: '/stock-movements', icon: ArrowRightLeft },
  { label: 'Ventes', path: '/sales', icon: ShoppingCart },
  { label: 'Fournisseurs', path: '/suppliers', icon: Truck },
  { label: 'Clients', path: '/customers', icon: Users },
  { label: 'Paramètres', path: '/settings', icon: Settings },
];

export default function Sidebar({ isCollapsed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex h-screen flex-col bg-[#0f172f] text-slate-300 transition-all duration-300`}>
      <div className="flex h-20 items-center justify-center border-b border-slate-800 p-6">
        {isCollapsed ? (
          <span className="text-2xl font-black text-blue-500">T</span>
        ) : (
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            <span className="text-blue-500">Truck</span>Parts
          </h1>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-2 py-6">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `mx-2 flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon size={20} className="min-w-fit" />
            {!isCollapsed && <span className="whitespace-nowrap font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-6">
        <button type="button" className={`flex w-full items-center gap-3 rounded-lg py-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-red-400 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} onClick={handleLogout}>
          <LogOut size={20} className="min-w-fit" />
          {!isCollapsed && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}