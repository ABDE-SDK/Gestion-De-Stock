import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, ShoppingCart, Truck, Users, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../app/Slices/authSlice';
import { useNavigate } from 'react-router-dom';

// زدنا isCollapsed هنا
export default function Sidebar({ isCollapsed }) {
  const menuItems = [
    { name: 'Tableau de bord', path: '/', icon: LayoutDashboard },
    { name: 'Produits', path: '/products', icon: Package },
    { name: 'Mouvements', path: '/mouvements', icon: ArrowRightLeft }, 
    { name: 'Ventes', path: '/ventes', icon: ShoppingCart }, 
    { name: 'Fournisseurs', path: '/suppliers', icon: Truck }, 
    { name: 'Clients', path: '/clients', icon: Users }, 
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#0f172f] text-slate-300 h-screen flex flex-col transition-all duration-300`}>
      {/* بدلنا العرض باش يتجاوب مع isCollapsed */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-center h-20">

        {isCollapsed ? (
          <span className="text-blue-500 font-black text-2xl">A</span>
        ) : (
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">
            <span className="text-blue-500">Auto</span>Parts
          </h1>
        )}
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                : 'hover:bg-slate-800 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            {/* الأيقونة كتبقى ديما، وزدنا ليها min-w-fit باش ماتعواجش */}
            <item.icon size={20} className="min-w-fit" />
            
            {/* السمية كتبان غير يلا كان الـ Sidebar محلول */}
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button 
          className={`flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors w-full py-2 rounded-lg hover:bg-slate-800/50 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} 
          onClick={handleLogout}
        >
          <LogOut size={20} className="min-w-fit" />
          {!isCollapsed && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}