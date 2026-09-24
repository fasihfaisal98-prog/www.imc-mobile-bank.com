import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { MessageSquare, ShoppingBag, Eye, ShieldCheck, Zap } from "lucide-react";

export const ProductCard = ({ product }) => {
  const { openWhatsAppModal, addToCart } = useStore();

  if (!product) return null;

  const mainVariant = product.variants?.[0] || null;
  const price = mainVariant ? mainVariant.price : product.price;
  const oldPrice = mainVariant ? (mainVariant.oldPrice || product.oldPrice) : product.oldPrice;
  const discountPercent = oldPrice && oldPrice > price 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : null;

  const ramRomLabel = mainVariant 
    ? `${mainVariant.ram} • ${mainVariant.storage}`
    : (product.specs?.chipset ? product.specs.chipset.split(" ")[0] : "Official");

  const isSamsung = product.brandId === "samsung" || product.brandName?.toLowerCase() === "samsung";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-po-hover transition-all duration-300 flex flex-col h-full overflow-hidden group relative">
      {/* Discount / Tag Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {discountPercent && (
          <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.tags?.includes("Featured") && (
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5" /> Featured
          </span>
        )}
      </div>

      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-20 flex items-center justify-center p-4">
          <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link 
        to={`/product/${product.slug || product.id}`}
        className="block p-4 sm:p-6 bg-slate-50/50 group-hover:bg-white transition-colors relative flex items-center justify-center min-h-[180px] sm:min-h-[220px]"
      >
        <img
          src={product.images?.[0] || "/images/placeholder-phone.jpg"}
          alt={product.name}
          loading="lazy"
          className="max-h-36 sm:max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & RAM Tag */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className={`font-semibold uppercase tracking-wider ${isSamsung ? "text-blue-600 font-bold" : "text-slate-500"}`}>
              {product.brandName}
            </span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium text-[10px]">
              {ramRomLabel}
            </span>
          </div>

          {/* Product Name */}
          <Link 
            to={`/product/${product.slug || product.id}`}
            className="block font-bold text-slate-900 hover:text-blue-600 text-sm sm:text-base line-clamp-2 leading-snug transition-colors mb-2"
          >
            {product.name}
          </Link>

          {/* Quick specs mini highlight */}
          {product.specs?.battery && (
            <div className="text-[11px] text-slate-500 line-clamp-1 mb-2">
              ⚡ {product.specs.battery} {product.specs.mainCamera ? `• 📸 ${product.specs.mainCamera.split("+")[0]}` : ""}
            </div>
          )}
        </div>

        <div>
          {/* Price Section */}
          <div className="pt-2 border-t border-slate-100 mb-3">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {formatPKR(price)}
              </span>
              {oldPrice && oldPrice > price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPKR(oldPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Official PTA Approved</span>
            </div>
          </div>

          {/* Buttons: WhatsApp Order (Primary) & Cart */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            <button
              onClick={() => openWhatsAppModal(product, mainVariant)}
              disabled={!product.inStock}
              className="col-span-4 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] disabled:bg-slate-300 text-white font-bold py-2 sm:py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Order this phone directly on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="truncate">Order on WhatsApp</span>
            </button>

            <button
              onClick={() => addToCart(product, mainVariant, null, 1)}
              disabled={!product.inStock}
              className="col-span-1 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 disabled:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl flex items-center justify-center transition cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
