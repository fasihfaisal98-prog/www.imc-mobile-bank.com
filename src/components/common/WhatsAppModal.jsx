import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { MessageSquare, X, Send, User, Phone, MapPin, CheckCircle, ShieldCheck } from "lucide-react";

export const WhatsAppModal = () => {
  const { 
    isWhatsAppModalOpen, 
    modalProduct, 
    modalVariant, 
    modalColor, 
    modalQuantity, 
    closeWhatsAppModal,
    getWhatsAppNumber,
    buildSingleOrderMessage 
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [errors, setErrors] = useState({});

  if (!isWhatsAppModalOpen || !modalProduct) return null;

  const currentPrice = modalVariant ? modalVariant.price : modalProduct.price;
  const totalPrice = currentPrice * (modalQuantity || 1);
  const variantLabel = modalVariant 
    ? `${modalVariant.ram} + ${modalVariant.storage}`
    : "Standard Edition";

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.name = "Please enter your name";
    }
    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid mobile number (e.g. 03331234567)";
    }
    if (!customerAddress.trim()) {
      errs.address = "Please enter your city / address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildSingleOrderMessage({
      product: modalProduct,
      variant: modalVariant,
      color: modalColor,
      quantity: modalQuantity,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerCityAddress: customerAddress.trim()
    });

    const waNumber = getWhatsAppNumber();
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab/app
    window.open(waUrl, "_blank", "noopener,noreferrer");
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Order on WhatsApp</h3>
              <p className="text-xs text-emerald-100">Direct order with Farhan Memon • IMC Mobile Bank</p>
            </div>
          </div>
          <button
            onClick={closeWhatsAppModal}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Product Summary Card */}
          <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <img 
              src={modalProduct.images?.[0] || "/images/placeholder-phone.jpg"} 
              alt={modalProduct.name} 
              className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                {modalProduct.brandName}
              </span>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base truncate mt-0.5">
                {modalProduct.name}
              </h4>
              <div className="flex items-center justify-between mt-1 text-xs text-slate-600">
                <span>Variant: <strong className="text-slate-800">{variantLabel}</strong></span>
                {modalColor && <span>Color: <strong>{modalColor.name}</strong></span>}
                <span>Qty: <strong>{modalQuantity}</strong></span>
              </div>
              <div className="mt-1 font-bold text-emerald-600 text-base">
                Total: {formatPKR(totalPrice)}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Muhammad Ali"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-500"
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                WhatsApp / Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="e.g. 0333 1234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    errors.phone ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-500"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                City & Delivery / Pickup Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Hyderabad Cantt / Karachi Gulshan"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    errors.address ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-200 focus:border-emerald-500"
                  }`}
                />
              </div>
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Trust note */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No advance payment needed for store pickup. WhatsApp confirmation is instant.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all text-sm sm:text-base cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Order via WhatsApp Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
