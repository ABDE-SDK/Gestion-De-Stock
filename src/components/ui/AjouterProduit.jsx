import { createPortal } from 'react-dom';

export default function AjouterProduit({ onAdd, onClose, suppliers }) {
  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-xl font-semibold text-gray-900'>Ajouter un produit</h2>
        <form onSubmit={(e)=>onAdd(e)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Nom</label>
            <input type='text' name='name' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Nom du produit' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Catégorie</label>
            <input type='text' name='category' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='Catégorie' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Code-barre</label>
            <input type='text' name='barcode' pattern='\d{8,13}' title='8-13 chiffres' maxLength={13} required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='1234567890123' />
          </div>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700'>Prix</label>
              <input type='number' name='price' min='0' step='0.01' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='0.00' />
            </div>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700'>Quantité</label>
              <input type='number' name='quantity' min='0' step='1' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='0' />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Stock Minimum</label>
            <input type='number' name='min_stock' min='0' step='1' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none' placeholder='0' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Fournisseur</label>
            <select name='supplier_id' required className='mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white'>
              <option value=''>-- Choisir un fournisseur --</option>
              {suppliers?.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <button type='button' onClick={onClose} className='rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600'>Annuler</button>
            <button type='submit' className='rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>Ajouter</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
