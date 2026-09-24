import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck, MapPin, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal,
    getWhatsAppNumber,
    buildCartOrderMessage
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isCartOpen) return null;

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.name = "Enter your full name";
    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = "Enter a valid 11-digit phone";
    if (!customerAddress.trim()) errs.address = "Enter your city / delivery address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendCartOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildCartOrderMessage({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerCityAddress: customerAddress.trim()
    });

    const waNumber = getWhatsAppNumber();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    clearCart();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart} 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold">Your Order Cart ({cartItems.length})</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Your cart is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Browse our PTA approved Samsung, Redmi, Infinix, Tecno and Nubia collection.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.cartItemId} 
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 relative group"
                    >
                      <img 
                        src={item.image || "/images/placeholder-phone.jpg"} 
                        alt={item.name} 
                        className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-slate-100 shrink-0" 
                      />
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          {item.variant && <span className="bg-slate-200 px-1.5 py-0.5 rounded font-medium">{item.variant}</span>}
                          {item.color && <span>{item.color}</span>}
                        </div>
                        <div className="text-sm font-bold text-blue-600 mt-1">
                          {formatPKR(item.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                              className="p-1 hover:bg-slate-100 text-slate-600"
                              title="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1 hover:bg-slate-100 text-slate-600"
                              title="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-slate-500">
                            Total: <strong className="text-slate-800">{formatPKR(item.price * item.quantity)}</strong>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                  <span>Need to reset cart?</span>
                  <button onClick={clearCart} className="text-red-500 hover:underline">
                    Clear All Items
                  </button>
                </div>

                {/* Checkout form accordion */}
                {showCheckoutForm && (
                  <form onSubmit={handleSendCartOrder} className="pt-3 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Delivery / Contact Details:
                    </h4>

                    <div>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          placeholder="WhatsApp Phone Number *"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="City / Delivery Address *"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      {errors.address && <p className="text-[11px] text-red-500 mt-0.5">{errors.address}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                    >
                      <Send className="w-4 h-4" />
                      Send Entire Order via WhatsApp
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Subtotal ({cartItems.length} items):</span>
                <span className="font-bold text-lg text-slate-900">{formatPKR(cartTotal)}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Orders confirmed personally by Farhan Memon over WhatsApp.</span>
              </div>

              {!showCheckoutForm ? (
                <button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Proceed to WhatsApp Order
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
