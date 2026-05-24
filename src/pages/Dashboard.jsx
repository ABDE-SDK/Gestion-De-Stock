import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {Link} from 'react-router';

const topSellingData = [
  
  { name: 'PlaquettesFrein', ventes: 120 },
  { name: 'Filtre à Huile', ventes: 98 },
  { name: 'Pneu Michelin', ventes: 86 },
  { name: 'Batterie 12V', ventes: 65 },
  { name: 'Phare LED', ventes: 40 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">     
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tableau de Bord</h1>
        <p className="text-slate-500">Bienvenue, voici l'état actuel de votre stock.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Produits */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Produits</p>
            <h3 className="text-2xl font-bold text-slate-800">1,248</h3>
          </div>
        </div>

        {/* Card 2: Alertes de Stock */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Alertes Stock Bas</p>
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
          </div>
        </div>

        {/* Card 3: Ventes du Mois */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Ventes (Ce mois)</p>
            <h3 className="text-2xl font-bold text-slate-800">342</h3>
          </div>
        </div>

        {/* Card 4: Chiffre d'affaires */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Chiffre d'affaires</p>
            <h3 className="text-2xl font-bold text-slate-800">45,200 DH</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
        filtrage ???
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <div className="lg:col-span-2 min-w-0 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Produits les plus vendus</h2>
            <div className="h-64 sm:h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingData} margin={{ top: 8, right: 8, left: -8, bottom: 40 }}>
                <CartesianGrid strokeDasharray="4 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#64748b', fontSize: 12 }}/>                
                <YAxis axisLine={true} strokeDasharray="4 3" tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f1f1f1'}} contentStyle={{borderRadius: '8px', border: 'none',
                                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="ventes" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500" />
            Stock Critique
          </h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
              <div>
                <p className="font-semibold text-slate-800">Filtre à Air Volvo</p>
                <p className="text-xs text-slate-500">Ref: FA-V800</p>
              </div>
              <span className="bg-red-200 text-red-700 font-bold px-3 py-1 rounded-full text-sm">
                2 restants
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div>
                <p className="font-semibold text-slate-800">Huile Moteur 5W30</p>
                <p className="text-xs text-slate-500">Ref: HM-5W-20L</p>
              </div>
              <span className="bg-orange-200 text-orange-700 font-bold px-3 py-1 rounded-full text-sm">
                5 restants
              </span>
            </div>

             <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div>
                <p className="font-semibold text-slate-800">Courroie Renault</p>
                <p className="text-xs text-slate-500">Ref: CR-RT4</p>
              </div>
              <span className="bg-orange-200 text-orange-700 font-bold px-3 py-1 rounded-full text-sm">
                8 restants
              </span>
            </div>
          </div>
          
          <Link to="/products" className="block w-full mt-6 py-2 text-center  text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
            Voir tout l'inventaire →
          </Link>
        </div>

      </div>
    </div>
  );
}