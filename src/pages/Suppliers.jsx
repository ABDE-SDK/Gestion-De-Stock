import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, deleteSupplierAsync, updateSupplierAsync } from '../Slices/SuppliersSlice';

export default function Fournisseurs() {
  const dispatch = useDispatch();
  const { suppliers: allSuppliers = [], loading = false, error = '' } = useSelector((state) => state.suppliers || {});
  // ID du fournisseur en cours d'édition (null = aucun)
  const [editingId, setEditingId] = useState(null);
  // Données temporaires pendant l'édition
  const [draft, setDraft] = useState({ name: '', phone: '', email: '', city: '' });
  // Filtre
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  // Filtre local sans Redux
  const suppliers=useMemo(()=>{
   if(!search.trim()) return allSuppliers;
   return allSuppliers.filter((s)=>s[searchBy]?.toString().toLowerCase().includes(search.toLowerCase()))
  },[allSuppliers,search,searchBy])
  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteSupplierAsync(id));
  };
  // Active le mode édition
  const handleEditClick = (supplier) => {
    setEditingId(supplier.id);
    setDraft({
      id: supplier.id,
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
      city: supplier.city,
    });
  };
  // Annule l'édition
  const handleCancel = () => {
    setEditingId(null);
    setDraft({ name: '', phone: '', email: '', city: '' });
  };
  // Soumet le formulaire (lit les valeurs directement depuis les inputs)
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSupplier = {
      id: draft.id,
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      city: e.target.city.value,
    };
    dispatch(updateSupplierAsync(updatedSupplier));
    setEditingId(null);
  };
  return (<>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-semibold text-gray-900'>Liste des fournisseurs</h1>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Filtrer:</span>
          <input type='search' placeholder='Rechercher...' value={search} onChange={(e) => setSearch(e.target.value)} className='px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500' />
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className='px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white'>
            <option value='name'>Nom</option>
            <option value='phone'>Contact</option>
            <option value='email'>Email</option>
            <option value='city'>Ville</option>
          </select>
        </div>
      </div>
        {loading && <p className='text-sm text-gray-600'>Chargement...</p>}
        {error && <p className='mb-4 text-sm text-red-600'>{error}</p>}

    
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Nom</th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Contact</th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Email</th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Ville</th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200 bg-white'>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  {editingId === supplier.id ? (
                    // MODE ÉDITION: Une seule ligne avec formulaire
                    <>
                      <td colSpan='4' className='px-4 py-3'>
                        <form onSubmit={handleSubmit} className='flex items-center gap-3'>
                          <input  name='name' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.name}  placeholder='Nom'  autoFocus/>
                          <input name='phone' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.phone} placeholder='Téléphone' />
                          <input name='email' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.email} placeholder='Email' />
                          <input name='city' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.city} placeholder='Ville' />
                        </form>
                      </td>
                      <td className='px-4 py-3 whitespace-nowrap'>
                        <div className='inline-flex items-center gap-2'>
                          <button onClick={handleSubmit} className='inline-flex items-center rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 whitespace-nowrap' type='button'>Modifier</button>
                          <button onClick={handleCancel} className='inline-flex items-center rounded bg-gray-500 px-3 py-1 text-sm font-medium text-white hover:bg-gray-600 whitespace-nowrap' type='button'>Annuler</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // MODE LECTURE: Affichage normal
                    <>
                      <td className='px-4 py-3 text-sm text-gray-900'>{supplier.name}</td>
                      <td className='px-4 py-3 text-sm text-gray-700'>{supplier.phone}</td>
                      <td className='px-4 py-3 text-sm text-gray-700'>{supplier.email}</td>
                      <td className='px-4 py-3 text-sm text-gray-700'>{supplier.city}</td>
                      <td className='px-4 py-3 text-sm text-gray-700 whitespace-nowrap'>
                        <div className='inline-flex items-center gap-2'>
                          <button onClick={() => handleEditClick(supplier)} className='inline-flex items-center rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 whitespace-nowrap' type='button'>Modifier</button>
                          <button onClick={() => handleDelete(supplier.id)} className='inline-flex items-center rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 whitespace-nowrap' type='button'>Supprimer</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {suppliers.length === 0 && !loading && !error && (
                <tr><td colSpan='5' className='px-4 py-6 text-center text-sm text-gray-500'>Aucun fournisseur disponible.</td></tr>
              )}
            </tbody>
          </table>
     </>
  );
}
