import { createPortal } from 'react-dom';

export default function AjouterFournisseur({ onAdd ,onClose}) {

  return createPortal(
<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-semibold text-gray-900'>Ajouter un fournisseur</h2>
        <form onSubmit={onAdd} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Nom</label>
            <input type='text' name='name'   className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Nom du fournisseur' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Téléphone</label>
            <input type='text' name='phone'   className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Numéro de téléphone' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type='email' name='email'  className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='email@exemple.com' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Ville</label>
            <input type='text' name='city' className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Ville' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Catégorie</label>
            <input type='text' name='category' className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Catégorie' />
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <button type='button' onClick={() => onClose()} className='rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600'>Annuler</button>
            <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>Ajouter</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
