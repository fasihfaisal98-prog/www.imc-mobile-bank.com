import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { 
  Search, 
  ShoppingBag, 
  MessageSquare, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  UserCheck
} from "lucide-react";

export const Header = () => {
  const { 
    settings, 
    brands, 
    products, 
    cartCount, 
    openCart, 
    getWhatsAppNumber 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter live search suggestions
  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.specs?.chipset && p.specs.chipset.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/mobiles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (productSlug) => {
    setIsSearchFocused(false);
    setSearchQuery("");
    navigate(`/product/${productSlug}`);
  };

  const waNumber = getWhatsAppNumber();

  // Brands strictly sorted so Samsung is ALWAYS first
  const sortedBrands = [...brands].sort((a, b) => {
    if (a.slug === "samsung" || a.id === "samsung") return -1;
    if (b.slug === "samsung" || b.id === "samsung") return 1;
    return (a.order || 99) - (b.order || 99);
  });

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-medium tracking-wide">
              {settings.announcementBar || "⚡ 100% Genuine PTA Approved Mobile Phones | Same Day Hand Delivery in Hyderabad"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`https://wa.me/${waNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: <strong className="text-white">{settings.whatsappNumber || "0333-2621231"}</strong></span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <Link to="/about" className="hidden md:inline hover:text-white transition">
              About Us
            </Link>
            <span className="hidden md:inline text-slate-600">|</span>
            <Link to="/contact" className="hidden md:inline hover:text-white transition">
              Visit Store
            </Link>
            <span className="hidden md:inline text-slate-600">|</span>
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] font-semibold">
              <UserCheck className="w-3 h-3" />
              Owner Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img 
              src={settings.logoUrl || "/images/imc-logo.jpg"} 
              alt="IMC Mobile Bank" 
              className="h-10 sm:h-12 w-auto object-contain rounded-md"
              onError={(e) => {
                // fallback to text logo if image fails
                e.target.style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  IMC <span className="text-orange-600">MOBILE BANK</span>
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                {settings.tagline || "The Name of Trust"}
              </span>
            </div>
          </Link>

          {/* Search Bar (PriceOye-style with live autocomplete) */}
          <div className="flex-1 max-w-2xl relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search Samsung, Redmi Note 15, Infinix Hot 70, Tecno, Nubia..."
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 text-sm pl-11 pr-24 py-2.5 rounded-full border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full text-xs font-semibold transition cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 border-b border-slate-100 text-xs font-semibold text-slate-400 px-3">
                  Matching Mobiles in Stock
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSuggestionClick(prod.slug)}
                      className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={prod.images?.[0] || "/images/placeholder-phone.jpg"} 
                          alt={prod.name} 
                          className="w-10 h-10 object-contain rounded bg-white p-0.5 border border-slate-200"
                        />
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{prod.name}</div>
                          <div className="text-xs text-slate-500">
                            {prod.variants?.[0] ? `${prod.variants[0].ram} + ${prod.variants[0].storage}` : prod.brandName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-600">{formatPKR(prod.price)}</div>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                          In Stock
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello IMC Mobile Bank, I want to inquire about mobile phones in your stock.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366] hover:text-white px-3.5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all border border-[#25D366]/30"
              title="Chat with Farhan Memon on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:text-white" />
              <span>0333-2621231</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Samsung, Redmi, Infinix, Tecno..."
              className="w-full bg-slate-100 text-slate-800 text-xs pl-9 pr-16 py-2.5 rounded-full border border-slate-200 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-blue-600 text-white px-3 rounded-full text-xs font-semibold"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Brand Navigation Bar under Header */}
      {/* CRITICAL: Samsung MUST ALWAYS appear first! */}
      <nav className="bg-slate-50 border-t border-slate-200 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2 py-1.5 whitespace-nowrap text-xs font-semibold">
          <Link
            to="/mobiles"
            className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition flex items-center gap-1"
          >
            <span>All Mobiles</span>
          </Link>

          {/* Sorted Brands: Samsung #1 always */}
          {sortedBrands.map((brand, idx) => {
            const isSamsung = brand.slug === "samsung" || brand.id === "samsung";
            return (
              <Link
                key={brand.id || brand.slug}
                to={`/brand/${brand.slug}`}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  isSamsung
                    ? "bg-blue-600 text-white shadow-sm font-bold hover:bg-blue-700"
                    : "text-slate-700 hover:text-blue-600 hover:bg-white"
                }`}
              >
                {isSamsung && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                <span>{brand.name}</span>
                {isSamsung && (
                  <span className="text-[10px] bg-white/20 px-1 py-0.2 rounded font-normal">
                    #1
                  </span>
                )}
              </Link>
            );
          })}

          <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>

          <Link
            to="/mobiles?priceMax=30000"
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition"
          >
            Under 30K
          </Link>
          <Link
            to="/mobiles?priceMin=30000&priceMax=50000"
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white transition"
          >
            30K - 50K
          </Link>
          <Link
            to="/contact"
            className="px-3 py-1.5 rounded-lg text-orange-700 hover:bg-orange-50 font-bold transition ml-auto"
          >
            📍 Cantt Saddar Store
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 shadow-lg animate-fade-in">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Top Brands (Samsung First)
            </div>
            {sortedBrands.map((b) => (
              <Link
                key={b.id || b.slug}
                to={`/brand/${b.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <span className={b.slug === "samsung" ? "font-bold text-blue-600 flex items-center gap-1.5" : ""}>
                  {b.slug === "samsung" && <Sparkles className="w-4 h-4 text-blue-600" />}
                  {b.name}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              About IMC Mobile Bank
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Store Location & Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-amber-600 hover:bg-amber-50 rounded-lg"
            >
              Shopkeeper Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
