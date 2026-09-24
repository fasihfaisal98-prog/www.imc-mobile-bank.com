import React, { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { formatPKR, PRICE_RANGES } from "../config/constants";
import { 
  Filter, 
  X, 
  ArrowUpDown, 
  Check, 
  SlidersHorizontal,
  Sparkles,
  ShoppingBag
} from "lucide-react";

export const ProductListingPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, brands, settings } = useStore();

  const searchQuery = searchParams.get("search") || "";
  const tagQuery = searchParams.get("tag") || "";
  const paramMinPrice = searchParams.get("priceMin");
  const paramMaxPrice = searchParams.get("priceMax");

  // Local filter states
  const [selectedBrands, setSelectedBrands] = useState(() => {
    return slug ? [slug] : [];
  });
  const [minPrice, setMinPrice] = useState(paramMinPrice ? Number(paramMinPrice) : 0);
  const [maxPrice, setMaxPrice] = useState(paramMaxPrice ? Number(paramMaxPrice) : 650000);
  const [selectedRam, setSelectedRam] = useState([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sort brands so Samsung is ALWAYS first!
  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => {
      if (a.slug === "samsung" || a.id === "samsung") return -1;
      if (b.slug === "samsung" || b.id === "samsung") return 1;
      return (a.order || 99) - (b.order || 99);
    });
  }, [brands]);

  // If slug route changes (e.g. /brand/samsung)
  React.useEffect(() => {
    if (slug) {
      setSelectedBrands([slug]);
    } else {
      setSelectedBrands([]);
    }
  }, [slug]);

  // Available RAM options in current catalog
  const ramOptions = ["4GB", "6GB", "8GB", "12GB", "16GB", "8+12GB", "16+12GB", "4+8GB", "2+4GB"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brandName.toLowerCase().includes(q);
        const matchesChipset = p.specs?.chipset?.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesChipset) return false;
      }

      // 2. Tag filter
      if (tagQuery && !p.tags?.includes(tagQuery)) {
        return false;
      }

      // 3. Brand filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(
          b => p.brandId === b || p.brandName.toLowerCase().includes(b.replace("-", " ").toLowerCase())
        );
        if (!matchesBrand) return false;
      }

      // 4. In Stock filter
      if (onlyInStock && !p.inStock) {
        return false;
      }

      // 5. Price filter
      const pPrice = p.variants?.[0]?.price || p.price;
      if (pPrice < minPrice || pPrice > maxPrice) {
        return false;
      }

      // 6. RAM filter
      if (selectedRam.length > 0) {
        const matchesRam = p.variants?.some(v => selectedRam.includes(v.ram));
        if (!matchesRam) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants?.[0]?.price || a.price;
      const priceB = b.variants?.[0]?.price || b.price;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      // Default: Samsung products float to the top!
      const aIsSamsung = a.brandId === "samsung" ? 1 : 0;
      const bIsSamsung = b.brandId === "samsung" ? 1 : 0;
      if (aIsSamsung !== bIsSamsung) return bIsSamsung - aIsSamsung;
      return (a.sortOrder || 99) - (b.sortOrder || 99);
    });
  }, [products, searchQuery, tagQuery, selectedBrands, minPrice, maxPrice, selectedRam, onlyInStock, sortBy]);

  const toggleBrand = (brandSlug) => {
    setSelectedBrands(prev => 
      prev.includes(brandSlug) ? prev.filter(b => b !== brandSlug) : [...prev, brandSlug]
    );
  };

  const toggleRam = (ram) => {
    setSelectedRam(prev =>
      prev.includes(ram) ? prev.filter(r => r !== ram) : [...prev, ram]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands(slug ? [slug] : []);
    setMinPrice(0);
    setMaxPrice(650000);
    setSelectedRam([]);
    setOnlyInStock(false);
  };

  const currentBrandObj = brands.find(b => b.slug === slug);
  const pageTitle = currentBrandObj 
    ? `${currentBrandObj.name} Mobiles in Pakistan`
    : searchQuery 
    ? `Search results for "${searchQuery}"`
    : tagQuery 
    ? `${tagQuery} Mobiles` 
    : "All Mobile Phones";

  return (
    <>
      <Helmet>
        <title>{pageTitle} | IMC Mobile Bank Hyderabad</title>
        <meta name="description" content={`Explore genuine PTA approved ${pageTitle} at best wholesale prices from IMC Mobile Bank.`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Mobiles", link: "/mobiles" },
            ...(currentBrandObj ? [{ label: currentBrandObj.name, link: `/brand/${currentBrandObj.slug}` }] : []),
            ...(searchQuery ? [{ label: `Search: ${searchQuery}`, link: "" }] : [])
          ]}
        />

        {/* Page Header Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                PTA Approved Rate List
              </span>
              <span className="text-xs text-slate-400">
                {filteredProducts.length} Phones Available
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {pageTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {settings.priceUpdatedNotice || "Prices updated: September 2026. Prices may change, confirm on WhatsApp."}
            </p>
          </div>

          {/* Sort dropdown and Mobile Filter toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="default">Sort: Recommended (Samsung First)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Model Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 2-column layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-black text-sm uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                Filter Phones
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Clear All
              </button>
            </div>

            {/* Brand Filter (Samsung ALWAYS FIRST!) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Official Brands
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {sortedBrands.map((b) => {
                  const isChecked = selectedBrands.includes(b.slug);
                  const isSamsung = b.slug === "samsung";
                  return (
                    <label
                      key={b.slug}
                      onClick={() => toggleBrand(b.slug)}
                      className={`flex items-center justify-between text-xs p-2 rounded-xl cursor-pointer transition ${
                        isChecked 
                          ? "bg-blue-50 text-blue-900 font-bold" 
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={isSamsung ? "font-bold text-blue-600" : ""}>
                          {b.name}
                        </span>
                      </div>
                      {isSamsung && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-black">
                          #1
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Price Budget (PKR)
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="650000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Up to:</span>
                  <span className="text-blue-600 font-bold">{formatPKR(maxPrice)}</span>
                </div>
              </div>

              {/* Quick budget pill buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setMinPrice(r.min);
                      setMaxPrice(r.max);
                    }}
                    className="p-1.5 text-[11px] rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition text-slate-600 font-medium"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Filter */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                RAM Capacity
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ramOptions.map((ram) => {
                  const isChecked = selectedRam.includes(ram);
                  return (
                    <button
                      key={ram}
                      onClick={() => toggleRam(ram)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        isChecked
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                      }`}
                    >
                      {ram}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="border-t border-slate-100 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>In Stock Mobiles Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No phones match your filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try widening your price range, choosing all brands, or clearing active filters to see all available stock.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold text-base text-slate-900">Filter Mobiles</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Brands */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Brands (Samsung First)
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {sortedBrands.map((b) => (
                    <label key={b.slug} className="flex items-center justify-between text-xs py-1 cursor-pointer">
                      <span className={b.slug === "samsung" ? "font-bold text-blue-600" : ""}>{b.name}</span>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.slug)}
                        onChange={() => toggleBrand(b.slug)}
                        className="rounded text-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Max Budget: {formatPKR(maxPrice)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="650000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
