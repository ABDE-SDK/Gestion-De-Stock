import { useEffect, useState, useMemo,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, deleteSupplierAsync, updateSupplierAsync ,createSupplierAsync} from '../app/Slices/SuppliersSlice.jsx';
import { useSearchParams} from 'react-router-dom';
import AjouterFournisseur from '../components/ui/AjouterFournisseur.jsx';
import TableFournisseurs from '../components/ui/TableFournisseurs.jsx';
import * as XLSX from 'xlsx'
export default function Fournisseurs() {
  const user = useSelector((state) => state.auth.user);
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
        category:e.target.category?.value || '',
        user_id:user?.id
      }))
      setIsOpen(false)
    };
  const { list: allSuppliers = [], loading = false, error = '' } = useSelector((state) => state.suppliers || {});
  
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
   const suppliersData=suppliers.map(s=>(
    {"name":s.name,
     "email": s.email,
    "phone": s.phone,
    "city":s.city,
    "category":s.category
    }))
    console.log(suppliersData)
   const ws=XLSX.utils.json_to_sheet(suppliersData)
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
        dispatch(updateSupplierAsync({id:exists.id,
          name:f.name,
          phone:f.phone,
          email:f.email,
          city:f.city,
          category:f.category,
        }))
    }
    else{
        dispatch(createSupplierAsync({id:allSuppliers[allSuppliers.length-1].id+1,
          name:f.name,
          phone:f.phone,
          email:f.email,
          city:f.city,
          category:f.category,
          user_id:user?.id
        }))
    }
   })

  }
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSuppliers(user.id));
    }
  }, [dispatch, user?.id]);
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
        <TableFournisseurs
          suppliers={suppliers}
          loading={loading}
          error={error}
          editingId={editingId}
          draft={draft}
          onEditClick={handleEditClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
          <input type='file' accept='.xlsx,.xls' className='hidden' ref={FileInputRef} onChange={(e)=>handleImport(e)}/>
          <button onClick={()=>FileInputRef.current.click()} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Import sheet</button>

<button onClick={handleExport} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Export sheet</button>
   {isOpen ? <AjouterFournisseur onAdd={(e)=>handleAdd(e)} onClose={()=>{setIsOpen(false)}}/>:null}     
   </>
  );
}
