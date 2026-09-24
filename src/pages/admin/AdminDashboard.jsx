import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { formatPKR } from "../../config/constants";
import { 
  Package, 
  Tag, 
  AlertTriangle, 
  Zap, 
  PlusCircle, 
  DollarSign, 
  Image, 
  MessageSquare,
  TrendingUp,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export const AdminDashboard = () => {
  const { products, brands, banners, settings } = useStore();

  const totalProducts = products.length;
  const totalBrands = brands.length;
  const outOfStockItems = products.filter(p => !p.inStock);
  const featuredItems = products.filter(p => p.tags?.includes("Featured"));
  const samsungItems = products.filter(p => p.brandId === "samsung" || p.brandName?.toLowerCase() === "samsung");

  const statCards = [
    {
      title: "Total Mobiles in Catalog",
      count: totalProducts,
      desc: "All phone models currently listed",
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/products"
    },
    {
      title: "Samsung Mobiles (#1 Priority)",
      count: samsungItems.length,
      desc: "Always displayed first on site",
      icon: Zap,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/admin/products"
    },
    {
      title: "Out of Stock Alerts",
      count: outOfStockItems.length,
      desc: "Phones marked unavailable",
      icon: AlertTriangle,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      link: "/admin/products?stock=out"
    },
    {
      title: "Official Brands & Categories",
      count: totalBrands,
      desc: "Active smartphone brands",
      icon: Tag,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      link: "/admin/brands"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Greeting */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            Shop Manager Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Welcome, Farhan Memon 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Current WhatsApp Order Receiver: <strong className="text-emerald-600 font-bold">{settings.whatsappNumber || "03332621231"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/admin/products/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Phone</span>
          </Link>

          <Link
            to="/admin/prices"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <DollarSign className="w-4 h-4" />
            <span>Quick Daily Price Editor</span>
          </Link>
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-po transition group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">{stat.title}</span>
                <div className={`w-9 h-9 rounded-xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition">
                {stat.count}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{stat.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Link
          to="/admin/prices"
          className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-black text-lg">Update Daily Rates</h3>
            <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
              Wholesale rate list changed today? Edit all phone prices & stock in one spreadsheet table with 1-click batch save.
            </p>
          </div>
          <span className="text-xs font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Open Price Editor →
          </span>
        </Link>

        <Link
          to="/admin/banners"
          className="bg-gradient-to-br from-indigo-700 to-slate-900 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <Image className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-black text-lg">Hero Banner Slider</h3>
            <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
              Promote newly arrived models like Galaxy A27 5G, Hot 70, or Camon 50 on the top homepage slider.
            </p>
          </div>
          <span className="text-xs font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Manage Banners →
          </span>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-gradient-to-br from-slate-800 to-slate-950 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3 className="font-black text-lg">WhatsApp & Contact Settings</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Change the receiving WhatsApp number (03332621231), customize the prefilled message template, or update announcements.
            </p>
          </div>
          <span className="text-xs font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
            Open Store Settings →
          </span>
        </Link>
      </div>

      {/* Out of Stock Notice or Recent Products Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Mobiles Currently in Stock ({products.filter(p => p.inStock).length} active)
            </h3>
            <p className="text-xs text-slate-500">Quick snapshot of recent additions to IMC Mobile Bank</p>
          </div>
          <Link to="/admin/products" className="text-xs font-bold text-blue-600 hover:underline">
            View All Products ({products.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Phone Model</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Variant (RAM+ROM)</th>
                <th className="p-3">Public Price</th>
                <th className="p-3">Internal Dealer Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.slice(0, 7).map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                    <img 
                      src={prod.images?.[0] || "/images/placeholder-phone.jpg"} 
                      alt={prod.name} 
                      className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-slate-200"
                    />
                    <span>{prod.name}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-600">{prod.brandName}</td>
                  <td className="p-3 text-slate-500">
                    {prod.variants?.[0] ? `${prod.variants[0].ram} + ${prod.variants[0].storage}` : "Standard"}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{formatPKR(prod.price)}</td>
                  <td className="p-3 font-mono text-slate-500">
                    {prod.dealerPrice ? formatPKR(prod.dealerPrice) : "—"}
                  </td>
                  <td className="p-3">
                    {prod.inStock ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      to={`/admin/products/edit/${prod.id}`}
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
