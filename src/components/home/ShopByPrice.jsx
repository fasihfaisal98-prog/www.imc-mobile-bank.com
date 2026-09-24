import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { PRICE_RANGES } from "../../config/constants";
import { Wallet, ChevronRight, Zap } from "lucide-react";

export const ShopByPrice = () => {
  const { products } = useStore();

  const getRangeCount = (min, max) => {
    return products.filter((p) => {
      const price = p.variants?.[0]?.price || p.price;
      return price >= min && price <= max;
    }).length;
  };

  return (
    <section className="my-8 sm:my-10 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Shop Mobiles by Budget
            </h2>
            <p className="text-xs text-slate-500">
              Find phones that fit your pocket with zero compromise on quality
            </p>
          </div>
        </div>
        <Link 
          to="/mobiles" 
          className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>All Price Ranges</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {PRICE_RANGES.map((range) => {
          const count = getRangeCount(range.min, range.max);
          let link = `/mobiles?`;
          if (range.min > 0) link += `priceMin=${range.min}&`;
          if (range.max < 2000000) link += `priceMax=${range.max}`;

          return (
            <Link
              key={range.id}
              to={link}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/80 hover:bg-white hover:border-blue-500 hover:shadow-po transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition">
                  Budget Filter
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                  {range.label}
                </h3>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{count} Models</span>
                <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
