import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AddSaleModal({ onClose, onAdd }) {
  const products = useSelector((state) => state.products.list);
  const [formValues, setFormValues] = useState({
    productId: '',
    product: '',
    reference: '',
    quantity: '',
    price: '',
    customer: '',
  });

  const customers = useMemo(() => {
    const customerNames = products.map((product) => product.customer).filter(Boolean);
    return [...new Set(customerNames)];
  }, [products]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'productId') {
      const selectedProduct = products.find((product) => product.id === Number(value));

      if (selectedProduct) {
        setFormValues((currentValues) => ({
          ...currentValues,
          productId: selectedProduct.id,
          product: selectedProduct.name,
          reference: selectedProduct.barcode || `REF-${selectedProduct.id}`,
          price: selectedProduct.price,
        }));
      }

      return;
    }

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.product || !formValues.quantity) {
      return;
    }

    onAdd({
      ...formValues,
      quantity: Number(formValues.quantity),
      price: Number(formValues.price),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 text-slate-500 transition-colors hover:text-red-500">
          <X />
        </button>

        <h2 className="mb-4 text-xl font-bold">Nouvelle vente</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <select name="productId" className="rounded-lg border p-2" value={formValues.productId} onChange={handleChange}>
            <option value="">-- Choisir un produit --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input name="product" placeholder="Produit" className="rounded-lg border bg-slate-100 p-2" value={formValues.product} readOnly />
          <input name="reference" placeholder="Référence" className="rounded-lg border bg-slate-100 p-2" value={formValues.reference} readOnly />
          <input type="number" name="quantity" placeholder="Quantité" className="rounded-lg border p-2" value={formValues.quantity} onChange={handleChange} />
          <input type="number" name="price" placeholder="Prix" className="rounded-lg border bg-slate-100 p-2" value={formValues.price} readOnly />

          <input name="customer" placeholder="Client" list="customers-list" className="rounded-lg border p-2" value={formValues.customer} onChange={handleChange} />
          <datalist id="customers-list">
            {customers.map((customer, index) => (
              <option key={index} value={customer} />
            ))}
          </datalist>

          <div className="mt-3 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg bg-slate-200 px-4 py-2">Annuler</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}