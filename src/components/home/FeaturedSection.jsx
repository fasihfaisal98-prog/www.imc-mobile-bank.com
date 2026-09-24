import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../common/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export const FeaturedSection = ({ 
  title, 
  subtitle, 
  products = [], 
  viewAllLink, 
  isSamsungSection = false,
  badgeText = null
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className={`my-8 sm:my-10 ${isSamsungSection ? "p-4 sm:p-6 bg-gradient-to-b from-blue-50/60 to-transparent rounded-3xl border border-blue-100/80" : ""}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            {isSamsungSection && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Featured Brand #1
              </span>
            )}
            {badgeText && !isSamsungSection && (
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {badgeText}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition self-start sm:self-auto"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
