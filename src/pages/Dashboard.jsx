import { useMemo, useState } from "react";
import { Package, AlertTriangle, TrendingUp, DollarSign, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {

  const products = useSelector((state) => state.products.list || []);
  const sales = useSelector((state) => state.sales.list || []);
  const suppliers = useSelector((state) => state.suppliers.list || []);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode?.toLowerCase().includes(search.toLowerCase()) ||
        String(p.id).includes(search);

      const matchCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      const matchSupplier =
        supplierFilter === "all" ||
        String(p.supplier_id) === supplierFilter;

      return matchSearch && matchCategory && matchSupplier;
    });
  }, [products, search, categoryFilter, supplierFilter]);
  const filteredSales = useMemo(() => {

    const now = new Date();

    return sales.filter((sale) => {

      const saleDate = new Date(sale.date);

      if (periodFilter === "today") {
        return saleDate.toDateString() === now.toDateString();
      }

      if (periodFilter === "7days") {
        const diff =
          (now - saleDate) / (1000 * 60 * 60 * 24);

        return diff <= 7;
      }

      if (periodFilter === "month") {
        return (
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      }

      if (periodFilter === "year") {
        return saleDate.getFullYear() === now.getFullYear();
      }

      return true;
    });

  }, [sales, periodFilter]);

  const totalProducts = filteredProducts.length;

  const lowStockProducts = filteredProducts.filter(
    (p) => p.quantity <= p.min_stock
  );

  const monthlySales = filteredSales.length;

  const revenue = filteredSales.reduce(
    (sum, sale) => sum + sale.price * sale.quantity,
    0
  );

  const topSellingData = filteredSales.reduce((acc, sale) => {
    const existing = acc.find((p) => p.name === sale.product);

    if (existing) {
      existing.sales += sale.quantity;
    } else {
      acc.push({
        name: sale.product,
        sales: sale.quantity,
      });
    }

    return acc;
  }, []);
  //remove duplicates for categories
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Tableau de Bord
        </h1>

        <p className="text-slate-500">
          Bienvenue, voici l'état actuel de votre stock.
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">

        <div className="flex items-center gap-2 bg-slate-50 border rounded-xl px-3 py-2 flex-1 min-w-62.5">
          <Search size={18} className="text-slate-400" />

          <input
            list="products-list"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom, code-barre ou ID..."
            className="outline-none bg-transparent w-full"
          />

          <datalist id="products-list">
            {products.map((p) => (
              <option key={p.id} value={p.name} />
            ))}
          </datalist>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 bg-white"
        >
          <option value="all">Toutes les catégories</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 bg-white"
        >
          <option value="all">Tous les fournisseurs</option>

          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        <select
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 bg-white"
        >
          <option value="all">Toute période</option>
          <option value="today">Aujourd'hui</option>
          <option value="7days">7 derniers jours</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>


      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Package size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500 font-medium">
              Total Produits
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              {totalProducts}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <AlertTriangle size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500 font-medium">
              Alertes Stock Bas
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              {lowStockProducts.length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <TrendingUp size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500 font-medium">
              Ventes
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              {monthlySales}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <DollarSign size={24} />
          </div>

          <div>
            <p className="text-sm text-slate-500 font-medium">
              Chiffre d'affaires
            </p>

            <h3 className="text-2xl font-bold text-slate-800">
              {revenue} DH
            </h3>
          </div>
        </div>
      </div>

      {/* CHART + LOW STOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Produits les plus vendus
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSellingData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

          <h2 className="text-lg font-bold text-slate-800 mb-5">
            Stock Critique
          </h2>

          <div className="flex flex-col gap-4">

            {lowStockProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100"
              >
                <div>
                  <p className="font-semibold">
                    {product.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Ref : {product.barcode}
                  </p>
                </div>

                <span className="bg-red-200 text-red-700 font-bold px-3 py-1 rounded-full text-sm">
                  {product.quantity} restant
                </span>
              </div>
            ))}

            {lowStockProducts.length === 0 && (
              <p className="text-slate-500 text-center py-5">
                Aucun produit critique
              </p>
            )}
          </div>

          <Link
            to="/products"
            className="block w-full mt-6 py-2 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
          >
            Voir tout l'inventaire →
          </Link>
        </div>
      </div>
    </div>
  );
}