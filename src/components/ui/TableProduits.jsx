import { useEffect } from "react"
import { useSelector ,useDispatch} from "react-redux"
import { fetchSuppliers } from "../../app/Slices/SuppliersSlice"
import { Edit3, Trash2, Check, X } from "lucide-react"
export default function TableProduits({loading,products,error,onDelete,onUpdate,onCancel,onEditClick,isEditingId,draft}){
    const dispatch=useDispatch()
    const suppliers=useSelector(state=>state.suppliers.list)
    const user=useSelector(state=>state.auth.user)
    useEffect(()=>{
        if(user){
            dispatch(fetchSuppliers(user?.id))
            console.log("this is supplier"+suppliers)
        }},[user?.id])
    return(<>
    {loading && <p className='text-sm text-gray-600'>Chargement...</p>}
    {error && <p className='mb-4 text-sm text-red-600'>{error}</p>}
    {products && <table className='min-w-full divide-y divide-gray-200'>
         <thead className='bg-gray-50'>
            <tr>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Nom</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Catégorie</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Code-barre</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Prix</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Quantité</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Stock Min</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Fournisseur</th>
                <th className='px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600'>Actions</th>
            </tr>
         </thead>
         <tbody className='divide-y divide-gray-200 bg-white'>
             {products.map(p => isEditingId === p.id ?
                  <tr key={p.id} className='bg-yellow-50'>
                    <td colSpan='8' className='px-3 py-2'>
                      <form className='flex items-center gap-2 text-xs' onSubmit={(e)=>onUpdate(e)}>
                        <input name="name" className='w-24 rounded border border-gray-300 px-2 py-1' type="text" defaultValue={p.name} required maxLength={100}/>
                        <input name="category" className='w-20 rounded border border-gray-300 px-2 py-1' type="text" defaultValue={p.category} maxLength={50}/>
                        <input name="barcode" className='w-24 rounded border border-gray-300 px-2 py-1' type="text" defaultValue={p.barcode} pattern="\d{8,13}" title="8-13 chiffres" maxLength={13}/>
                        <input name="price" className='w-16 rounded border border-gray-300 px-2 py-1' type="number" defaultValue={p.price} min="0" step="0.01" required/>
                        <input name="quantity" className='w-16 rounded border border-gray-300 px-2 py-1' type="number" defaultValue={p.quantity} min="0" step="1" required/>
                        <input name="min_stock" className='w-16 rounded border border-gray-300 px-2 py-1' type="number" defaultValue={p.min_stock} min="0" step="1" required/>
                        <span className='w-20 truncate'>{suppliers && suppliers.find(s=>s.id===p.supplier_id)?.name }</span>
                        <div className='inline-flex items-center gap-1 whitespace-nowrap'>
                          <button onClick={()=>onCancel(p.id)} className='rounded bg-gray-500 px-2 py-1 text-xs font-medium text-white hover:bg-gray-600 flex items-center gap-1' type='button'><X size={14}/></button>
                          <button className='rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700 flex items-center gap-1' type='submit'><Check size={14}/></button>
                        </div>
                      </form>
                    </td>
            </tr>  
                : <tr key={p.id}>
            <td className='px-3 py-2 text-base text-gray-900'>{p.name}</td>
            <td className='px-3 py-2 text-base text-gray-700'>{p.category}</td>
            <td className='px-3 py-2 text-base text-gray-700 font-mono text-sm'>{p.barcode}</td>
            <td className='px-3 py-2 text-base text-gray-700'>{p.price}€</td>
            <td className='px-3 py-2 text-base text-gray-700'>{p.quantity}</td>
            <td className='px-3 py-2 text-base text-gray-700'>{p.min_stock}</td>
            <td className='px-3 py-2 text-base text-gray-700'>{suppliers && suppliers.find(s=>s.id===p.supplier_id)?.name }</td>
            <td className='px-3 py-2 text-sm text-gray-700 whitespace-nowrap'>
                <button onClick={()=>onDelete(p.id)} className='rounded bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600 mr-1 flex items-center gap-1 inline-flex' type='button'><Trash2 size={14}/></button>
                <button onClick={() => onEditClick(p)} className='rounded bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-green-700 flex items-center gap-1 inline-flex' type='button'><Edit3 size={14}/></button>
            </td>
            </tr>
             )}
         </tbody>
        </table>}
    </>)
}