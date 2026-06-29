import { X } from "lucide-react";

export default function AddCustomerModal({
    showModal,
    setShowModal,
    editingCustomer,
    formData,
    setFormData,
    handleSubmit,
}) {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-150 p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">
                        {editingCustomer
                            ? "Modifier Client"
                            : "Ajouter Client"}
                    </h2>

                    <button onClick={() => setShowModal(false)}>
                        <X />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Téléphone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                        className="border rounded-lg p-3"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        placeholder="Crédit"
                        value={formData.credit}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                credit: Number(e.target.value),
                            })
                        }
                        className="border rounded-lg p-3 col-span-2"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg py-3"
                    >
                        {editingCustomer
                            ? "Modifier"
                            : "Ajouter"}
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 rounded-lg py-3"
                    >
                        Annuler
                    </button>
                </form>
            </div>
        </div>
    );
}