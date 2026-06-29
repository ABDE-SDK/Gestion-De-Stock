import { Check, Edit3, Trash2, X } from 'lucide-react';

export default function ProductsTable({ isLoading, error, products, suppliers, editingProductId, onEditProduct, onDeleteProduct, onSaveProduct, onCancelEdit }) {
  if (isLoading) return <p className="text-sm text-gray-600">Chargement...</p>;
  if (error) return <p className="mb-4 text-sm text-red-600">{error}</p>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Nom</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Catégorie</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Code-barre</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Prix</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Quantité</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Stock min</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Fournisseur</th>
          <th className="px-3 py-2 text-left text-sm font-semibold uppercase text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {products.map((product) => {
          const supplierName = suppliers.find((supplier) => supplier.id === product.supplier_id)?.name || 'N/A';

          if (editingProductId === product.id) {
            return (
              <tr key={product.id} className="bg-yellow-50">
                <td colSpan="8" className="px-3 py-2">
                  <form className="flex items-center gap-2 text-xs" onSubmit={onSaveProduct}>
                    <input name="name" className="w-30 rounded border border-gray-300 px-2 py-1" type="text" defaultValue={product.name} required maxLength={100} />
                    <input name="category" className="w-28 rounded border border-gray-300 px-2 py-1" type="text" defaultValue={product.category} maxLength={50} />
                    <input name="barcode" className="w-28 rounded border border-gray-300 px-2 py-1" type="text" defaultValue={product.barcode} pattern="\d{8,13}" title="8-13 chiffres" maxLength={13} />
                    <input name="price" className="w-26 rounded border border-gray-300 px-2 py-1" type="number" defaultValue={product.price} min="0" step="0.01" required />
                    <input name="quantity" className="w-26 rounded border border-gray-300 px-2 py-1" type="number" defaultValue={product.quantity} min="0" step="1" required />
                    <input name="min_stock" className="w-26 rounded border border-gray-300 px-2 py-1" type="number" defaultValue={product.min_stock} min="0" step="1" required />
                    <span className="w-26 truncate">{supplierName}</span>
                    <div className="inline-flex items-center gap-1 whitespace-nowrap">
                      <button type="button" onClick={onCancelEdit} className="flex items-center gap-1 rounded bg-gray-500 px-2 py-1 text-xs font-medium text-white hover:bg-gray-600"><X size={14} /></button>
                      <button type="submit" className="flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"><Check size={14} /></button>
                    </div>
                  </form>
                </td>
              </tr>
            );
          }

          return (
            <tr key={product.id}>
              <td className="px-3 py-2text-sm text-gray-900">{product.name}</td>
              <td className="px-3 py-2text-sm text-gray-700">{product.category}</td>
              <td className="px-3 py-2text-sm text-gray-700 font-mono text-sm">{product.barcode}</td>
              <td className="px-3 py-2text-sm text-gray-700">{product.price}€</td>
              <td className="px-3 py-2text-sm text-gray-700">{product.quantity}</td>
              <td className="px-3 py-2text-sm text-gray-700">{product.min_stock}</td>
              <td className="px-3 py-2text-sm text-gray-700">{supplierName}</td>
              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                <button type="button" onClick={() => onDeleteProduct(product.id)} className="mr-1 inline-flex items-center gap-1 rounded bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600">
                  <Trash2 size={14} />
                </button>
                <button type="button" onClick={() => onEditProduct(product)} className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-sm font-medium text-white hover:bg-green-700">
                  <Edit3 size={14} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}