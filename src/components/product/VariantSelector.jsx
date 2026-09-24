import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { 
  MessageSquare, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Truck, 
  Store, 
  Share2, 
  Clock 
} from "lucide-react";

export const VariantSelector = ({ product }) => {
  const { openWhatsAppModal, addToCart, settings } = useStore();

  const variants = product.variants || [];
  const colors = product.colors || [];

  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const oldPrice = selectedVariant ? (selectedVariant.oldPrice || product.oldPrice) : product.oldPrice;
  const discountPercent = oldPrice && oldPrice > currentPrice 
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) 
    : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at IMC Mobile Bank Hyderabad`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Brand & Stock Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {product.brandName}
        </span>
        <div className="flex items-center gap-2">
          {product.inStock ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              In Stock & Ready for Dispatch
            </span>
          ) : (
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition relative"
            title="Share this phone"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                Link copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {product.name}
        </h1>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{settings.priceUpdatedNotice || "Prices updated: September 2026"}</span>
        </p>
      </div>

      {/* Price Block */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs text-slate-500 block font-medium">Official Cash Rate</span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatPKR(currentPrice * quantity)}
            </span>
            {oldPrice && (
              <span className="text-sm text-slate-400 line-through">
                {formatPKR(oldPrice * quantity)}
              </span>
            )}
            {discountPercent && (
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                Save {discountPercent}%
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-emerald-600 font-semibold block">PTA Approved Box Pack</span>
          <span className="text-[10px] text-slate-400">Cash on Delivery / Store Pickup</span>
        </div>
      </div>

      {/* Variant Selector (RAM + Storage) */}
      {variants.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Select Variant (RAM + Storage):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {variants.map((variant, idx) => {
              const isSelected = selectedVariant?.id 
                ? selectedVariant.id === variant.id 
                : `${selectedVariant?.ram}_${selectedVariant?.storage}` === `${variant.ram}_${variant.storage}`;

              return (
                <button
                  key={variant.id || idx}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-100 text-blue-900 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 bg-white text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm">
                      {variant.ram} + {variant.storage}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 mt-1">
                    {formatPKR(variant.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colors.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Select Color: <span className="text-slate-900 normal-case font-bold">{selectedColor?.name}</span>
          </label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {colors.map((color, idx) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex || "#94a3b8" }}
                  />
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Quantity:
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 hover:bg-slate-100 text-slate-600 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-5 font-bold text-sm text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 hover:bg-slate-100 text-slate-600 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-slate-500">
            Unit Price: {formatPKR(currentPrice)}
          </span>
        </div>
      </div>

      {/* Core Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => openWhatsAppModal(product, selectedVariant, selectedColor, quantity)}
          disabled={!product.inStock}
          className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] disabled:bg-slate-300 text-white py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span>Order on WhatsApp (Instant Confirmation)</span>
        </button>

        <button
          onClick={() => addToCart(product, selectedVariant, selectedColor, quantity)}
          disabled={!product.inStock}
          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 disabled:bg-slate-200 text-white py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Multi-Product Cart</span>
        </button>
      </div>

      {/* Trust guarantees bar */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>PTA Approved Genuine</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Courier Across Pakistan</span>
        </div>
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-orange-600 shrink-0" />
          <span>Cantt Saddar Store Pickup</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Direct WhatsApp with Owner</span>
        </div>
      </div>
    </div>
  );
};
