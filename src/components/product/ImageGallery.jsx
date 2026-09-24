import React, { useState } from "react";
import { ShieldCheck, Zap } from "lucide-react";

export const ImageGallery = ({ images = [], productName = "Mobile Phone", discountPercent = null }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images && images.length > 0 
    ? images 
    : ["/images/placeholder-phone.jpg"];

  const activeImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Display with subtle zoom on hover */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 flex items-center justify-center min-h-[320px] sm:min-h-[420px] overflow-hidden group">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {discountPercent && (
            <span className="bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> PTA Approved
          </span>
        </div>

        <img
          src={activeImage}
          alt={productName}
          className="max-h-72 sm:max-h-96 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 p-1.5 shrink-0 transition-all cursor-pointer flex items-center justify-center ${
                idx === selectedIndex 
                  ? "border-blue-600 shadow-md ring-2 ring-blue-100" 
                  : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
