import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  RefreshCw,
  Truck,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { path: "/dashboard", label: "Tableau", icon: LayoutDashboard },
  { path: "/produits", label: "Produits", icon: Package },
  { path: "/stock", label: "Stock", icon: RefreshCw },
  { path: "/fournisseurs", label: "Fournisseurs", icon: Truck },
  { path: "/ventes", label: "Ventes", icon: ShoppingCart },
  { path: "/clients", label: "Clients", icon: Users },
  { path: "/stats", label: "Stats", icon: BarChart3 },
  { path: "/config", label: "Config", icon: Settings },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <header className="sidebar-header">
        <div className="sidebar-title-row">
          {isOpen ? (
            <h1 className="sidebar-title">Stock</h1>
          ) : (
            <Package size={20} />
          )}
          {isOpen ? (
            <button onClick={() => setIsOpen(false)} className="sidebar-toggle">
              <X size={20} />
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)} className="sidebar-toggle">
              <Menu size={20} />
            </button>
          )}
        </div>
      </header>

      {isOpen && (
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link to={path} className="sidebar-link">
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {isOpen && (
        <footer className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-button">
            <LogOut size={20} />
            Déconnexion
          </button>
        </footer>
      )}
    </aside>
  );
}

export default Sidebar;
