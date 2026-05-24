import { Bell, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

// استقبلنا isCollapsed و setIsCollapsed
export default function Navbar({ isCollapsed, setIsCollapsed }) {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <header 
      // 1. ملي نكليكيو فـ Navbar، يلا كان الـ Sidebar محلول، غيتسد
      onClick={() => { if (!isCollapsed) setIsCollapsed(true); }}
      className={`h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm ${!isCollapsed ? 'cursor-pointer' : ''}`}
    >
      <div className='flex items-center gap-4'>
        
        {/* 2. الأيقونة غتبان *غير* يلا كان الـ Sidebar مجموع (isCollapsed === true) */}
        {isCollapsed && (
          <button 
            onClick={(e) => {
              e.stopPropagation(); // هادي كتحبس الكليكة باش ما توصلش للـ header
              setIsCollapsed(false); // هنا كنحلوه
            }} 
            className='p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <Menu size={24} />
          </button>
        )}

        {/* 3. مربع البحث (زدنا ليه stopPropagation باش ماتكليكيش فيه ويتسد السطوك) */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className='hidden md:flex items-center bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all cursor-text'
        >
          <Search size={20} className='text-slate-400' />
          <input 
            type='text' 
            placeholder='Rechercher une pièce...' 
            className='bg-transparent border-none outline-none ml-3 text-slate-700 w-64 placeholder:text-slate-400'
          />
        </div>
      </div>

      {/* 4. الجزء ديال الإشعارات والبروفايل (حتى هو حميناه بـ stopPropagation) */}
      <div className='flex items-center gap-6' onClick={(e) => e.stopPropagation()}>
        <button className='relative p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-full transition-colors duration-200'>
          <Bell size={24} />
          <span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white'></span>
        </button>

        {user && (
          <div className='flex items-center gap-4 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity'>
            <div className='flex flex-col text-right hidden sm:flex'>
              <span className='text-sm font-bold text-slate-800'>{user.username}</span>
              <span className='text-xs font-medium text-blue-600'>Gérant du Magasin</span>
            </div>
            <div className='w-11 h-11 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white ring-2 ring-slate-100'>
              {user?.username ? user.username[0].toUpperCase() : '?'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}