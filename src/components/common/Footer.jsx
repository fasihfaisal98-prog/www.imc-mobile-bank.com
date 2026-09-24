import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Award,
  ExternalLink
} from "lucide-react";

export const Footer = () => {
  const { settings, brands, getWhatsAppNumber } = useStore();
  const waNumber = getWhatsAppNumber();

  // Brands strictly sorted so Samsung is ALWAYS first
  const sortedBrands = [...brands].sort((a, b) => {
    if (a.slug === "samsung" || a.id === "samsung") return -1;
    if (b.slug === "samsung" || b.id === "samsung") return 1;
    return (a.order || 99) - (b.order || 99);
  });

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Mobiles</h4>
              <p className="text-xs text-slate-400">Official PTA Approved with Brand Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct WhatsApp Order</h4>
              <p className="text-xs text-slate-400">Direct confirmation with Farhan Memon</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Physical Retail Outlet</h4>
              <p className="text-xs text-slate-400">Shifa Paradise, Cantt Saddar, Hyderabad</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Always Fresh Rates</h4>
              <p className="text-xs text-slate-400">{settings.priceUpdatedNotice || "Prices updated: September 2026"}</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Col 1: Store Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={settings.logoUrl || "/images/imc-logo.jpg"} 
                alt="IMC Mobile Bank" 
                className="h-10 w-auto object-contain rounded bg-white p-0.5" 
              />
              <div>
                <span className="font-black text-white text-base tracking-wide block">
                  IMC <span className="text-orange-500">MOBILE BANK</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase">
                  {settings.tagline || "The Name of Trust"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier smartphone hub in Hyderabad Cantt. Authorized retail supplier of Samsung, Xiaomi, Infinix, Tecno and Nubia with genuine official manufacturer warranties.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Farhan Memon</span>
              </a>
            </div>
          </div>

          {/* Col 2: Brand Showcases (Samsung First!) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Mobile Brands (Samsung #1)
            </h4>
            <ul className="space-y-2 text-xs">
              {sortedBrands.map((b) => (
                <li key={b.id || b.slug}>
                  <Link 
                    to={`/brand/${b.slug}`}
                    className="hover:text-white transition flex items-center justify-between group py-0.5"
                  >
                    <span className={b.slug === "samsung" ? "text-blue-400 font-bold" : ""}>
                      {b.name} {b.slug === "samsung" ? "(Premier)" : ""}
                    </span>
                    <span className="text-slate-600 group-hover:text-slate-400">→</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/mobiles" className="text-blue-400 hover:underline pt-1 block font-semibold">
                  Browse All Mobile Models →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Shop by Budget */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Shop by Budget
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/mobiles?priceMax=30000" className="hover:text-white transition block">
                  Budget Mobiles (Under Rs. 30,000)
                </Link>
              </li>
              <li>
                <Link to="/mobiles?priceMin=30000&priceMax=50000" className="hover:text-white transition block">
                  Mid-Range (Rs. 30,000 - 50,000)
                </Link>
              </li>
              <li>
                <Link to="/mobiles?priceMin=50000&priceMax=100000" className="hover:text-white transition block">
                  Premium Mid-Range (Rs. 50,000 - 100,000)
                </Link>
              </li>
              <li>
                <Link to="/mobiles?priceMin=100000" className="hover:text-white transition block">
                  Flagship Mobiles (Above Rs. 100,000)
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/about" className="hover:text-white transition block text-slate-400">
                  About Our Hyderabad Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition block text-slate-400">
                  Store Timings & Address Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Address & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Cantt Saddar Store
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {settings.address || "Shop # 9/10, Shifa Paradise, near Belair Hospital, opposite Kachailo Bungalow, near Mr Wari Chat, Cantt Saddar, Hyderabad"}
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`tel:${settings.phone || "03332621231"}`} className="hover:text-white">
                {settings.phone || "0333-2621231"} (Farhan Memon)
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`mailto:${settings.email || "imcmobilebank@gmail.com"}`} className="hover:text-white">
                {settings.email || "imcmobilebank@gmail.com"}
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Follow Us Online
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {settings.socials?.tiktok && (
                  <a 
                    href={settings.socials.tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
                  >
                    TikTok
                  </a>
                )}
                {settings.socials?.facebook && (
                  <a 
                    href={settings.socials.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
                  >
                    Facebook
                  </a>
                )}
                {settings.socials?.youtube && (
                  <a 
                    href={settings.socials.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
                  >
                    YouTube
                  </a>
                )}
                {settings.socials?.instagram && (
                  <a 
                    href={settings.socials.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center space-y-2 text-xs text-slate-400">
          <p className="bg-slate-800/60 p-2.5 rounded-lg max-w-2xl mx-auto text-amber-200/90 text-[11px]">
            ⚠️ {settings.priceUpdatedNotice || "Prices updated: September 2026. Prices may change, confirm on WhatsApp."} All mobile phones are sold in original sealed packs with official manufacturer warranty.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
            <div>
              © 2026 IMC Mobile Bank (imcmobilebank.pk) — Farhan Memon. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-slate-300">About</Link>
              <Link to="/contact" className="hover:text-slate-300">Contact</Link>
              <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold">Admin Panel</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
