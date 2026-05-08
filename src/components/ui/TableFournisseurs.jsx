import { useState } from 'react';

export default function TableFournisseurs({ 
  suppliers, 
  loading, 
  error, 
  editingId, 
  draft, 
  onEditClick, 
  onDelete, 
  onSubmit, 
  onCancel 
}) {
  return (
    <>
      {loading && <p className='text-sm text-gray-600'>Chargement...</p>}
      {error && <p className='mb-4 text-sm text-red-600'>{error}</p>}

      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Nom</th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Contact</th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Email</th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Ville</th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Catégorie</th>
            <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Actions</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200 bg-white'>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              {editingId === supplier.id ? (
                // MODE ÉDITION
                <>
                  <td colSpan='5' className='px-4 py-3'>
                    <form onSubmit={onSubmit} className='flex items-center gap-3'>
                      <input name='name' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.name} placeholder='Nom' autoFocus />
                      <input name='phone' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.phone} placeholder='Téléphone' />
                      <input name='email' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.email} placeholder='Email' />
                      <input name='city' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.city} placeholder='Ville' />
                      <input name='category' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.category} placeholder='Catégorie' />
                    </form>
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    <div className='inline-flex items-center gap-2'>
                      <button onClick={onSubmit} className='inline-flex items-center rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 whitespace-nowrap' type='button'>Valider</button>
                      <button onClick={onCancel} className='inline-flex items-center rounded bg-gray-500 px-3 py-1 text-sm font-medium text-white hover:bg-gray-600 whitespace-nowrap' type='button'>Annuler</button>
                    </div>
                  </td>
                </>
              ) : (
                // MODE LECTURE
                <>
                  <td className='px-4 py-3 text-sm text-gray-900'>{supplier.name}</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>{supplier.phone}</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>{supplier.email}</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>{supplier.city}</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>{supplier.category}</td>
                  <td className='px-4 py-3 text-sm text-gray-700 whitespace-nowrap'>
                    <div className='inline-flex items-center gap-2'>
                      <button onClick={() => onEditClick(supplier)} className='inline-flex items-center rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 whitespace-nowrap' type='button'>Modifier</button>
                      <button onClick={() => onDelete(supplier.id)} className='inline-flex items-center rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 whitespace-nowrap' type='button'>Supprimer</button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}

          {suppliers.length === 0 && !loading && !error && (
            <tr><td colSpan='6' className='px-4 py-6 text-center text-sm text-gray-500'>Aucun fournisseur disponible.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
