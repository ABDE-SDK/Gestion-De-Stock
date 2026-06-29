import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCustomer, updateCustomer, deleteCustomer,} from "../app/Slices/CustomersSlice.jsx";

import AddCustomerModal from "../components/modals/Customers/AddEditCustomerModal.jsx";
import CustomerPaymentModal from "../components/modals/Customers/CustomerPaymentModal";

import CustomersTable from "../components/tables/CustomersTable";

import { Users, Plus, Edit2, Trash2, Search, DollarSign, CreditCard, CheckCircle, AlertTriangle, X } from "lucide-react";

export default function Customers() {
  const dispatch = useDispatch();

  const { list: customers, loading } = useSelector(
    (state) => state.customers
  );

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    credit: 0,
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const totalCustomers = customers.length;

  const totalCredit = customers.reduce(
    (sum, customer) => sum + customer.credit,
    0
  );

  const customersWithCredit = customers.filter(
    (customer) => customer.credit > 0
  ).length;

  const openAddModal = () => {
    setEditingCustomer(null);

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      credit: 0,
    });

    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      credit: customer.credit,
    });

    setShowModal(true);
  };

  const handlePayment = () => {
    const amount = Number(paymentAmount);

    if (!amount || amount <= 0) {
      alert("Entrer un montant valide");
      return;
    }

    if (amount > selectedCustomer.credit) {
      alert("Le montant dépasse le crédit du client");
      return;
    }

    dispatch(
      updateCustomer({
        ...selectedCustomer,
        credit: selectedCustomer.credit - amount,
      })
    );

    setShowPaymentModal(false);
    setSelectedCustomer(null);
    setPaymentAmount("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCustomer) {
      dispatch(
        updateCustomer({
          ...editingCustomer,
          ...formData,
        })
      );
    } else {
      dispatch(addCustomer(formData));
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce client ?")) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Gestion des Clients
        </h1>

        <p className="text-gray-500">
          Gérez vos clients et leur crédit
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-blue-600 rounded-xl text-white p-6">
          <Users size={30} />

          <h2 className="text-3xl mt-3">
            {totalCustomers}
          </h2>

          <p>Total clients</p>
        </div>

        <div className="bg-red-600 rounded-xl text-white p-6">
          <CreditCard size={30} />

          <h2 className="text-3xl mt-3">
            {totalCredit.toFixed(2)} DH
          </h2>

          <p>Crédit total</p>
        </div>

        <div className="bg-orange-500 rounded-xl text-white p-6">
          <AlertTriangle size={30} />

          <h2 className="text-3xl mt-3">
            {customersWithCredit}
          </h2>

          <p>Clients avec crédit</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-5">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg pl-10 py-2 px-3"
            />
          </div>

          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-5 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Nouveau client
          </button>
        </div>
      </div>

      <CustomersTable
        customers={filteredCustomers}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
        setSelectedCustomer={setSelectedCustomer}
        setPaymentAmount={setPaymentAmount}
        setShowPaymentModal={setShowPaymentModal}
      />

      <AddCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingCustomer={editingCustomer}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      <CustomerPaymentModal
        showPaymentModal={showPaymentModal}
        selectedCustomer={selectedCustomer}
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        setShowPaymentModal={setShowPaymentModal}
        handlePayment={handlePayment}
      />

      {loading && (
        <div className="mt-5 text-center">
          Chargement...
        </div>
      )}
    </div>
  );
}