import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ShoppingCart,
    FileText,
    Trash2,
    CreditCard,
    Banknote,
} from "lucide-react";

import { addSaleAsync } from "../app/Slices/SalesSlice";
import { updateProductAsync } from "../app/Slices/ProductsSlice";

export default function Sales() {
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.products.list || []
    );

    const customers = useSelector(
        (state) => state.customers.list || []
    );

    const [cart, setCart] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [isCredit, setIsCredit] = useState(false);
    const [paidAmount, setPaidAmount] = useState("");

    const selectedProduct = products.find(
        (p) => p.id === Number(selectedProductId)
    );

    const addToCart = () => {
        if (!selectedProduct) return;

        if (quantity > selectedProduct.quantity) {
            alert("Stock insuffisant");
            return;
        }

        const exists = cart.find(
            (item) => item.productId === selectedProduct.id
        );

        if (exists) {
            setCart(
                cart.map((item) =>
                    item.productId === selectedProduct.id
                        ? {
                            ...item,
                            quantity: item.quantity + Number(quantity),
                        }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    productId: selectedProduct.id,
                    productName: selectedProduct.name,
                    quantity: Number(quantity),
                    price: selectedProduct.price,
                },
            ]);
        }

        setSelectedProductId("");
        setQuantity(1);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.productId !== id));
    };

    const updateQuantity = (id, qty) => {
        const product = products.find((p) => p.id === id);

        if (!product) return;

        if (qty > product.quantity) {
            alert("Stock insuffisant");
            return;
        }

        setCart(
            cart.map((item) =>
                item.productId === id
                    ? { ...item, quantity: qty }
                    : item
            )
        );
    };

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const paid = Number(paidAmount) || 0;

    const change = paid - total;

    const handleSale = () => {
        if (cart.length === 0) {
            alert("Panier vide");
            return;
        }

        const sale = {
            customer_id: selectedCustomerId
                ? Number(selectedCustomerId)
                : null,
            items: cart,
            total,
            paid,
            is_credit: isCredit,
            date: new Date().toISOString(),
        };

        dispatch(addSaleAsync(sale));

        cart.forEach((item) => {
            const product = products.find(
                (p) => p.id === item.productId
            );

            if (!product) return;

            dispatch(
                updateProductAsync({
                    ...product,
                    quantity:
                        product.quantity -
                        item.quantity,
                })
            );
        });

        alert("Vente enregistrée");

        setCart([]);
        setSelectedCustomerId("");
        setPaidAmount("");
        setIsCredit(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6 font-bold">
                Gestion des Ventes
            </h1>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* LEFT */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl mb-5">
                        Ajouter au panier
                    </h2>

                    <div className="space-y-4">

                        <select
                            value={selectedProductId}
                            onChange={(e) =>
                                setSelectedProductId(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">
                                Choisir un produit
                            </option>

                            {products
                                .filter(
                                    (p) => p.quantity > 0
                                )
                                .map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name} -
                                        {" "}
                                        {product.price} DH
                                        {" "}
                                        (
                                        {product.quantity}
                                        )
                                    </option>
                                ))}
                        </select>

                        {selectedProduct && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p>
                                    Référence :
                                    {" "}
                                    {selectedProduct.reference}
                                </p>

                                <p>
                                    Prix :
                                    {" "}
                                    {selectedProduct.price}
                                    DH
                                </p>

                                <p>
                                    Stock :
                                    {" "}
                                    {selectedProduct.quantity}
                                </p>
                            </div>
                        )}

                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    Number(e.target.value)
                                )
                            }
                            className="w-full border rounded-lg p-3"
                        />

                        <button
                            onClick={addToCart}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
                        >
                            <ShoppingCart size={18} />
                            Ajouter au panier
                        </button>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl mb-5">
                        Panier
                    </h2>

                    <div className="space-y-3">

                        {cart.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                            >
                                <div className="flex-1">
                                    <p>
                                        {item.productName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {item.price}
                                        DH ×
                                        {item.quantity}
                                    </p>
                                </div>

                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(
                                            item.productId,
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                    className="w-20 border rounded p-2"
                                />

                                <p className="text-blue-600">
                                    {(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                    DH
                                </p>

                                <button
                                    onClick={() =>
                                        removeFromCart(
                                            item.productId
                                        )
                                    }
                                    className="text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                    </div>

                    <div className="border-t mt-5 pt-5">

                        <div className="flex justify-between mb-5">
                            <span>Total :</span>

                            <span className="text-2xl text-blue-600">
                                {total.toFixed(2)}
                                DH
                            </span>
                        </div>

                        <select
                            value={selectedCustomerId}
                            onChange={(e) =>
                                setSelectedCustomerId(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded-lg p-3 mb-4"
                        >
                            <option value="">
                                Vente sans client
                            </option>

                            {customers.map(
                                (customer) => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                        {" - "}
                                        {customer.phone}
                                    </option>
                                )
                            )}
                        </select>

                        <div className="flex gap-6 mb-4">

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={!isCredit}
                                    onChange={() =>
                                        setIsCredit(false)
                                    }
                                />

                                <Banknote
                                    size={18}
                                    className="text-green-500"
                                />

                                Comptant
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={isCredit}
                                    onChange={() =>
                                        setIsCredit(true)
                                    }
                                />

                                <CreditCard
                                    size={18}
                                    className="text-red-500"
                                />

                                Crédit
                            </label>

                        </div>

                        {!isCredit && (
                            <>
                                <input
                                    type="number"
                                    placeholder="Montant payé"
                                    value={paidAmount}
                                    onChange={(e) =>
                                        setPaidAmount(
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-lg p-3 mb-3"
                                />

                                <div className="border rounded-lg p-3 mb-4">
                                    Monnaie :
                                    {" "}
                                    <span
                                        className={
                                            change >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {change.toFixed(2)}
                                        DH
                                    </span>
                                </div>
                            </>
                        )}

                        <button
                            onClick={handleSale}
                            className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 mb-3"
                        >
                            <ShoppingCart size={18} />
                            Enregistrer la vente
                        </button>

                        <button
                            className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FileText size={18} />
                            Générer facture
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}