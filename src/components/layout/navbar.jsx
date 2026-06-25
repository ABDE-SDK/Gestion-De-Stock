import { Bell, Menu, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Navbar({ isCollapsed, setIsCollapsed }) {
  const currentUser = useSelector((state) => state.auth.user);

  return (
    <header
      onClick={() => {
        if (!isCollapsed) {
          setIsCollapsed(true);
        }
      }}
      className={`flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm sm:px-8 ${!isCollapsed ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-4">
        {isCollapsed && (
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
            onClick={(event) => {
              event.stopPropagation();
              setIsCollapsed(false);
            }}
          >
            <Menu size={24} />
          </button>
        )}

        <div
          className="hidden cursor-text items-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 md:flex"
          onClick={(event) => event.stopPropagation()}
        >
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une pièce..."
            className="ml-3 w-64 border-none bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="relative rounded-full p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-blue-600">
          <Bell size={24} />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        {currentUser && (
          <div className="flex cursor-pointer items-center gap-4 border-l border-slate-200 pl-6 transition-opacity hover:opacity-80">
            <div className="hidden flex-col text-right sm:flex">
              <span className="text-sm font-bold text-slate-800">{currentUser.username}</span>
              <span className="text-xs font-medium text-blue-600">Gérant du magasin</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-gradient-to-tr from-blue-600 to-blue-400 text-lg font-bold text-white shadow-md ring-2 ring-slate-100">
              {currentUser.username ? currentUser.username[0].toUpperCase() : '?'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}