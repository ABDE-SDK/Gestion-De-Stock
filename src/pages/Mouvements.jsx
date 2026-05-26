import { useState, useEffect } from 'react';
import {
    ArrowDownRight,
    ArrowUpRight,
    Plus,
    Search,
    Filter
} from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMouvements } from '../app/Slices/MouvementsSlice';

export default function Mouvements() {

    const dispatch = useDispatch();

    const {
        list: mouvementsData = [],
        loading,
        error
    } = useSelector((state) => state.mouvements);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Tous');

    useEffect(() => {
        dispatch(fetchMouvements());
    }, []);

    const filteredMouvements = mouvementsData.filter((mouv) => {

        const matchesSearch =
            mouv.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mouv.reference.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            filterType === 'Tous' || mouv.type === filterType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Mouvements de Stock
                    </h1>

                    <p className="text-slate-500">
                        Historique des entrées et sorties des pièces.
                    </p>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                    <Plus size={20} />
                    Nouveau Mouvement
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between gap-4">

                <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex-1 max-w-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Search size={20} className="text-slate-400" />

                    <input
                        type="text"
                        placeholder="Rechercher par pièce ou référence..."
                        className="bg-transparent border-none outline-none ml-3 text-slate-700 w-full placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-slate-400" />

                    <select
                        className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl outline-none focus:border-blue-500 transition-all"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="Tous">
                            Tous les mouvements
                        </option>

                        <option value="Entrée">
                            Entrées seulement
                        </option>

                        <option value="Sortie">
                            Sorties seulement
                        </option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">

                                <th className="p-4 font-medium">
                                    Date
                                </th>

                                <th className="p-4 font-medium">
                                    Produit
                                </th>

                                <th className="p-4 font-medium">
                                    Type
                                </th>

                                <th className="p-4 font-medium">
                                    Quantité
                                </th>

                                <th className="p-4 font-medium">
                                    Motif
                                </th>

                                <th className="p-4 font-medium">
                                    Utilisateur
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-slate-700">

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-slate-500"
                                    >
                                        Chargement...
                                    </td>
                                </tr>

                            ) : error ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-red-500"
                                    >
                                        {error}
                                    </td>
                                </tr>

                            ) : filteredMouvements.length > 0 ? (

                                filteredMouvements.map((mouv) => (

                                    <tr
                                        key={mouv.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >

                                        <td className="p-4 whitespace-nowrap text-sm text-slate-500">
                                            {mouv.date}
                                        </td>

                                        <td className="p-4">

                                            <p className="font-semibold text-slate-800">
                                                {mouv.produit}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {mouv.reference}
                                            </p>

                                        </td>

                                        <td className="p-4 whitespace-nowrap">

                                            {mouv.type === 'Entrée' ? (

                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                    <ArrowDownRight size={14} />
                                                    Entrée
                                                </span>

                                            ) : (

                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                                    <ArrowUpRight size={14} />
                                                    Sortie
                                                </span>

                                            )}

                                        </td>

                                        <td className="p-4 font-bold text-slate-800">

                                            {mouv.type === 'Entrée'
                                                ? '+'
                                                : '-'
                                            }

                                            {mouv.quantite}

                                        </td>

                                        <td
                                            className="p-4 text-sm text-slate-600 max-w-[200px] truncate"
                                            title={mouv.motif}
                                        >
                                            {mouv.motif}
                                        </td>

                                        <td className="p-4 text-sm">

                                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium border border-slate-200">
                                                {mouv.utilisateur}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-slate-500"
                                    >
                                        Aucun mouvement trouvé.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}