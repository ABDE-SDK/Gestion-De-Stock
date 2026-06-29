import {
    Edit2,
    Trash2,
    DollarSign,
    CheckCircle,
} from "lucide-react";

export default function CustomersTable({
    customers,
    openEditModal,
    handleDelete,
    setSelectedCustomer,
    setPaymentAmount,
    setShowPaymentModal,
}) {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Nom</th>
                        <th className="p-4 text-left">Téléphone</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Adresse</th>
                        <th className="p-4 text-left">Crédit</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="p-4">
                                {customer.name}
                            </td>

                            <td className="p-4">
                                {customer.phone}
                            </td>

                            <td className="p-4">
                                {customer.email}
                            </td>

                            <td className="p-4">
                                {customer.address}
                            </td>

                            <td className="p-4">
                                {customer.credit > 0 ? (
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                                        {customer.credit} DH
                                    </span>
                                ) : (
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full flex items-center gap-2 w-fit">
                                        <CheckCircle size={15} />
                                        Soldé
                                    </span>
                                )}
                            </td>

                            <td className="p-4">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedCustomer(customer);
                                            setPaymentAmount("");
                                            setShowPaymentModal(true);
                                        }}
                                        className="text-green-600"
                                    >
                                        <DollarSign size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            openEditModal(customer)
                                        }
                                        className="text-blue-600"
                                    >
                                        <Edit2 size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(customer.id)
                                        }
                                        className="text-red-600"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {customers.length === 0 && (
                <div className="p-10 text-center text-gray-500">
                    Aucun client trouvé
                </div>
            )}
        </div>
    );
}