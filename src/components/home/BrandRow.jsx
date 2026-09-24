import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { Sparkles, ArrowRight } from "lucide-react";

export const BrandRow = () => {
  const { brands, products } = useStore();

  // Sort brands with Samsung locked as #1
  const sortedBrands = [...brands].sort((a, b) => {
    if (a.slug === "samsung" || a.id === "samsung") return -1;
    if (b.slug === "samsung" || b.id === "samsung") return 1;
    return (a.order || 99) - (b.order || 99);
  });

  const getBrandCount = (brandSlug) => {
    return products.filter(p => p.brandId === brandSlug || p.brandName.toLowerCase().includes(brandSlug.toLowerCase())).length;
  };

  return (
    <section className="my-6 sm:my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span>Shop by Official Brands</span>
            <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
              Samsung First
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred manufacturer with 100% genuine PTA approved stock
          </p>
        </div>
        <Link 
          to="/mobiles" 
          className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {sortedBrands.map((brand) => {
          const isSamsung = brand.slug === "samsung" || brand.id === "samsung";
          const count = getBrandCount(brand.slug);

          return (
            <Link
              key={brand.id || brand.slug}
              to={`/brand/${brand.slug}`}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center group relative overflow-hidden ${
                isSamsung 
                  ? "bg-gradient-to-b from-blue-50/70 to-white border-blue-300 shadow-sm hover:shadow-po-hover hover:border-blue-500" 
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-po"
              }`}
            >
              {isSamsung && (
                <div className="absolute top-2 right-2 flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  #1 Priority
                </div>
              )}

              <div className="w-16 h-12 flex items-center justify-center mb-2">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-9 max-w-full object-contain filter group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-lg font-black text-slate-700">{brand.name[0]}</span>
                )}
              </div>

              <h3 className={`text-sm font-bold ${isSamsung ? "text-blue-900 font-extrabold" : "text-slate-800"} group-hover:text-blue-600 transition`}>
                {brand.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {count > 0 ? `${count} Models Available` : "Available in Store"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
