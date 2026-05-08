import { useState ,useEffect,useMemo,useRef} from "react";
import TableProduits from "../components/ui/TableProduits";
import AjouterProduit from "../components/ui/AjouterProduit.jsx";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts ,removeProductAsync, updateProductAsync,addProductAsync} from "../app/Slices/ProductsSlice";
import { useSearchParams,useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx'
export default function Products() {
    const FileInputRef=useRef()
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') || ''
    const searchBy = searchParams.get('searchBy') || 'name'
    const [isOpen,setIsOpen]=useState(false)
    const [draft,setDraft]=useState({id:"",name:"",category:"",price:"",quantity:"",min_stock:"",barcode:"",supplier_id:""})
    const [isEditingId,setIsEditingId]=useState(null)
    const handleAdd=(e)=>{
        e.preventDefault()
        dispatch(addProductAsync({
          id: allProducts[allProducts.length-1].id+1,
          name:e.target.name.value,
          category:e.target.name.value,
          barcode:Number(e.target.barcode.value),
          quantity:Number(e.target.quantity.value),
          price:Number(e.target.price.value),
          supplier_id:Number(e.target.supplier_id.value)
        }))
        setIsOpen(false)
    }
    const handleEditClick=(product)=>{
    setDraft({id:product.id,
        name:product.name,
        category:product.category,
        price:product.price,
        quantity:product.quantity,
        min_stock:product.min_stock,
        barcode:product.barcode,
        supplier_id:product.supplier_id
    })
    setIsEditingId(product.id)
    }
    const dispatch=useDispatch()
    const {loading, list: allProducts=[],error}=useSelector(state=>state.products)
    const suppliers=useSelector(state=>state.suppliers.list)
    const products=useMemo(()=>{
      if(!search.trim()) return allProducts;
      else{
        if(searchBy == 'supplier'){
            console.log(suppliers)
            const filtredSuppliers=suppliers.filter(s=>s["name"].toLowerCase().toString().includes(search.toLowerCase()))
            const supplierIds = filtredSuppliers.map((s) => s.id);
            return allProducts.filter(p=>supplierIds.includes(p.supplier_id))
        }
        else{
            return allProducts.filter(p=>p[searchBy].toLowerCase().includes(search.toLowerCase()))
        }
      }
    },[allProducts,searchBy,search])
    const user=useSelector(state=>state.auth.user)
    useEffect(()=>{if(user?.id){
        dispatch(fetchProducts(user?.id))
    }},[user?.id])
    function handleDelete(id){
        console.log("deleted")
        dispatch(removeProductAsync(id))
    }
    const handleCancel=(id)=>{
        setDraft({id:"",name:"",category:"",price:"",quantity:"",min_stock:"",barcode:"",supplier_id:""})
        setIsEditingId(null)
    }
    const handleUpdate=(e)=>{
        e.preventDefault()
        dispatch(updateProductAsync({
            id:draft.id,
            name:e.target.name.value,
            category:e.target.category.value,
            barcode:e.target.barcode.value,
            price:Number(e.target.price.value),
            quantity:Number(e.target.quantity.value),
            min_stock:Number(e.target.min_stock.value),
            supplier_id:draft.supplier_id
        }))
       setDraft({id:"",name:"",category:"",price:"",quantity:"",min_stock:"",barcode:"",supplier_id:""})
       setIsEditingId(null)     
    }
    const handleImport=async (e)=>{
       const file=e.target.files[0]
       const buffer=await file.arrayBuffer()
       const wb=XLSX.read(buffer)
       const ws=wb.Sheets[wb.SheetNames[0]]
       const raw=XLSX.utils.sheet_to_json(ws)
       raw.forEach(row=>{
        const SupplierId=suppliers.find(s=>s.name===row.fournisseur)?.id
        const exists=allProducts.find(p=>p.barcode==String(row["code-barre"]))
        if(SupplierId){
           if(exists){
           dispatch(updateProductAsync({id:exists.id,
                                    name:row.name,
                                    category:row.category,
                                    barcode:String(row["code-barre"]),
                                    price:Number(row.prix),
                                    quantity:Number(row["quantité"]),
                                    min_stock:Number(row["stock min"]),
                                    user_id:user.id,
                                    supplier_id:SupplierId
           }))
           }
           else{
           dispatch(addProductAsync({id:allProducts[allProducts.length-1].id+1,
                                    name:row.name,
                                    category:row.category,
                                    barcode:String(row["code-barre"]),
                                    price:Number(row.prix),
                                    quantity:Number(row["quantité"]),
                                    min_stock:Number(row["stock min"]),
                                    user_id:user.id,
                                    supplier_id:suppliers.find(s=>s.name==row.fournisseur).id
           }))
        }
        }
       })
    }
    const handleExport=()=>{
     const productsData=products.map(p=>({ "name" : p.name,
                                          "category" : p.category,
                                          "code-barre":p.barcode,
                                          "prix" :p.price,
                                          "quantité" : p.quantity,
                                          "stock min":p.min_stock,
                                          "fournisseur":suppliers.find(s=>s.id===p.supplier_id)["name"]
                                       }))
     const ws=XLSX.utils.json_to_sheet(productsData)
     const wb=XLSX.utils.book_new()
     XLSX.utils.book_append_sheet(wb,ws,"Produits")
     XLSX.writeFile(wb,"Produits.xlsx")
    }
    return (
        <div className="p-8">
            <div className='flex items-center justify-between mb-4'>
                <h1 className="text-xl font-semibold text-gray-900">Liste des Produits</h1>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>Filtrer:</span>
                  <input type='search' placeholder='Rechercher...' value={search} onChange={(e) => setSearchParams({search:e.target.value,searchBy},{replace:true})} className='px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500' />
                  <span>par</span>
                  <select value={searchBy} onChange={(e) => setSearchParams({search,searchBy:e.target.value},{replace:true})} className='px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white'>
                    <option value='name'>Nom</option>
                    <option value='category'>Catégorie</option>
                    <option value='barcode'>Code-barre</option>
                    <option value='price'>Prix</option>
                    <option value='quantity'>Quantité</option>
                    <option value='supplier'>Fournisseur</option>
                  </select>
                  <button onClick={()=>setIsOpen(true)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">Ajouter Produit</button>
                </div>
            </div>
            <TableProduits products={products} error={error} loading={loading} onDelete={(id)=>handleDelete(id)} onEditClick={(e)=>handleEditClick(e)} isEditingId={isEditingId} draft={draft} onCancel={(id)=>handleCancel(id)} onUpdate={(e)=>handleUpdate(e)}/>
            {isOpen && <AjouterProduit onAdd={(e)=>handleAdd(e)} onClose={()=>setIsOpen(false)} suppliers={suppliers}/>}
      <input type='file' accept='.xlsx,.xls' className='hidden' ref={FileInputRef} onChange={(e)=>handleImport(e)}/>
          <button onClick={()=>FileInputRef.current.click()} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Import sheet</button> 
        <button onClick={handleExport} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded mx-3 my-5">Export sheet</button>
        </div>
    );
}