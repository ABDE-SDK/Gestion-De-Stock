import { useEffect, useState, useMemo,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, deleteSupplierAsync, updateSupplierAsync ,createSupplierAsync} from '../app/Slices/SuppliersSlice.jsx';
import { useSearchParams} from 'react-router-dom';
import AjouterFournisseur from '../components/AjouterFournisseur.jsx';
import * as XLSX from 'xlsx'
export default function Fournisseurs() {

  const dispatch = useDispatch();
  // ouvrir le modale d'ajout du formulaire
  const [isOpen,setIsOpen]=useState(false)
  // ajout de fournisseur
    const handleAdd = (e) => {
      e.preventDefault();
      const nextId = suppliers.length > 0 ? suppliers[suppliers.length - 1].id + 1 : 1;
      dispatch(createSupplierAsync({
        id:nextId,
        name:e.target.name.value,
        phone:e.target.phone.value,
        email:e.target.email.value,
        city:e.target.city.value,
        category:e.target.category?.value || ''
      }))
      setIsOpen(false)
    };
  const { suppliers: allSuppliers = [], loading = false, error = '' } = useSelector((state) => state.suppliers || {});
  // ID du fournisseur en cours d'édition (null = aucun)
  const [editingId, setEditingId] = useState(null);
  // Données temporaires pendant l'édition
  const [draft, setDraft] = useState({ name: '', phone: '', email: '', city: '', category: '' });
  // Filtre
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const searchBy = searchParams.get('searchBy') || 'name'
  // Filtre local
  const suppliers=useMemo(()=>{
    if(!search.trim()) return allSuppliers;
     return allSuppliers.filter(s=>s[searchBy].toLowerCase().toString().includes(search.toLowerCase()))
  },
[allSuppliers,search,searchBy])
//exportation du fichier excel
  const handleExport=()=>{
   const ws=XLSX.utils.json_to_sheet(suppliers)
   const wb=XLSX.utils.book_new()
   XLSX.utils.book_append_sheet(wb,ws,"Fournisseurs")
   XLSX.writeFile(wb,"Fournisseurs.xlsx")
  }
// reference du input type file
  const FileInputRef=useRef()
// importation du fichier excel
  const handleImport=async (e)=>{
   const file=e.target.files[0]
   const buffer=await file.arrayBuffer()
   const wb=XLSX.read(buffer)
   const ws=wb.Sheets[wb.SheetNames[0]]
   const raw=XLSX.utils.sheet_to_json(ws)
   raw.forEach(f=>{
    const exists=allSuppliers.find(fournisseur=>fournisseur.email===f.email)
    if(exists){
        dispatch(updateSupplierAsync(f))
    }
    else{
        dispatch(createSupplierAsync(f))
    }
   })

  }
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
      category: supplier.category || '',
    });
  };
  // Annule l'édition
  const handleCancel = () => {
    setEditingId(null);
    setDraft({ name: '', phone: '', email: '', city: '', category: '' });
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
      category: e.target.category.value,
    };
    dispatch(updateSupplierAsync(updatedSupplier));
    setEditingId(null);
  };
  return (<>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-semibold text-gray-900'>Liste des fournisseurs</h1>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Filtrer:</span>
          <input type='search' placeholder='Rechercher...' value={search} onChange={(e) => setSearchParams({search:e.target.value,searchBy},{replace:true})} />
          <span>par</span><select value={searchBy} onChange={(e) => setSearchParams({search,searchBy:e.target.value},{replace:true})} className='px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white'>
            <option value='name'>Nom</option>
            <option value='phone'>Contact</option>
            <option value='email'>Email</option>
            <option value='city'>Ville</option>
          </select>
          <button onClick={()=>{setIsOpen(true)}} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">Ajouter un Fournisseur</button>
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
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Catégorie</th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200 bg-white'>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  {editingId === supplier.id ? (
                    // MODE ÉDITION: Une seule ligne avec formulaire
                    <>
                      <td colSpan='5' className='px-4 py-3'>
                        <form onSubmit={handleSubmit} className='flex items-center gap-3'>
                          <input  name='name' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.name}  placeholder='Nom'  autoFocus/>
                          <input name='phone' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.phone} placeholder='Téléphone' />
                          <input name='email' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.email} placeholder='Email' />
                          <input name='city' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.city} placeholder='Ville' />
                          <input name='category' className='flex-1 rounded border border-gray-300 px-2 py-1 text-sm' defaultValue={draft.category} placeholder='Catégorie' />
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
                      <td className='px-4 py-3 text-sm text-gray-700'>{supplier.category}</td>
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
                <tr><td colSpan='6' className='px-4 py-6 text-center text-sm text-gray-500'>Aucun fournisseur disponible.</td></tr>
              )}
            </tbody>
          </table>
          <input type='file' accept='.xlsx,.xls' className='hidden' ref={FileInputRef} onChange={(e)=>handleImport(e)}/>
          <button onClick={()=>FileInputRef.current.click()} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Import sheet</button>

<button onClick={handleExport} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Export sheet</button>
   {isOpen ? <AjouterFournisseur onAdd={(e)=>handleAdd(e)} onClose={()=>{setIsOpen(false)}}/>:null}     
   </>
  );
}
