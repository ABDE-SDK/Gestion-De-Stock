export default function SuppliersTable({ suppliers, isLoading, error, editingSupplierId, onEditSupplier, onDeleteSupplier, onSaveSupplier, onCancelEdit }) {
  if (isLoading) return <p className="text-sm text-gray-600">Chargement...</p>;
  if (error) return <p className="mb-4 text-sm text-red-600">{error}</p>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Nom</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Contact</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Email</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Ville</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Catégorie</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            {editingSupplierId === supplier.id ? (
              <td colSpan="6" className="px-4 py-3">
                <form className="flex flex-wrap items-center gap-3" onSubmit={onSaveSupplier}>
                  <input name="name" className="min-w-[120px] flex-1 rounded border border-gray-300 px-2 py-1 text-sm" defaultValue={supplier.name} placeholder="Nom" autoFocus />
                  <input name="phone" className="min-w-[120px] flex-1 rounded border border-gray-300 px-2 py-1 text-sm" defaultValue={supplier.phone} placeholder="Téléphone" />
                  <input name="email" className="min-w-[120px] flex-1 rounded border border-gray-300 px-2 py-1 text-sm" defaultValue={supplier.email} placeholder="Email" />
                  <input name="city" className="min-w-[120px] flex-1 rounded border border-gray-300 px-2 py-1 text-sm" defaultValue={supplier.city} placeholder="Ville" />
                  <input name="category" className="min-w-[120px] flex-1 rounded border border-gray-300 px-2 py-1 text-sm" defaultValue={supplier.category} placeholder="Catégorie" />
                  <div className="inline-flex items-center gap-2">
                    <button type="submit" className="whitespace-nowrap rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700">Valider</button>
                    <button type="button" onClick={onCancelEdit} className="whitespace-nowrap rounded bg-gray-500 px-3 py-1 text-sm font-medium text-white hover:bg-gray-600">Annuler</button>
                  </div>
                </form>
              </td>
            ) : (
              <>
                <td className="px-4 py-3 text-sm text-gray-900">{supplier.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{supplier.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{supplier.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{supplier.city}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{supplier.category}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                  <div className="inline-flex items-center gap-2">
                    <button type="button" onClick={() => onEditSupplier(supplier)} className="whitespace-nowrap rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700">Modifier</button>
                    <button type="button" onClick={() => onDeleteSupplier(supplier.id)} className="whitespace-nowrap rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600">Supprimer</button>
                  </div>
                </td>
              </>
            )}
          </tr>
        ))}
        {suppliers.length === 0 && !isLoading && !error && (
          <tr><td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">Aucun fournisseur disponible.</td></tr>
        )}
      </tbody>
    </table>
  );
}