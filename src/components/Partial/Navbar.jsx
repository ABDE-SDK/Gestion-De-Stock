import { Bell, Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
      
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
        
      </div>
      <div className="flex items-center gap-6">
        
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-full transition-colors duration-200">
          <Bell size={24} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-4 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-bold text-slate-800">Abderrahmane</span>
            <span className="text-xs font-medium text-blue-600">Gérant du Magasin</span>
          </div>
          <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white ring-2 ring-slate-100">
            AS
          </div>
        </div>

      </div>
    </header>
  );
}