export default function CustomerPaymentModal({
    showPaymentModal,
    selectedCustomer,
    paymentAmount,
    setPaymentAmount,
    setShowPaymentModal,
    handlePayment,
}) {
    if (
        !showPaymentModal ||
        !selectedCustomer
    )
        return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-96 p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Paiement Client
                </h2>

                <p className="mb-2">
                    Client :
                    <span className="font-bold">
                        {" "}
                        {selectedCustomer.name}
                    </span>
                </p>

                <p className="mb-5 text-red-600">
                    Crédit actuel :
                    {" "}
                    {selectedCustomer.credit} DH
                </p>

                <input
                    type="number"
                    placeholder="Montant payé"
                    value={paymentAmount}
                    onChange={(e) =>
                        setPaymentAmount(e.target.value)
                    }
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <div className="flex gap-3">
                    <button
                        onClick={handlePayment}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg"
                    >
                        Valider
                    </button>

                    <button
                        onClick={() =>
                            setShowPaymentModal(false)
                        }
                        className="flex-1 bg-gray-300 py-3 rounded-lg"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}