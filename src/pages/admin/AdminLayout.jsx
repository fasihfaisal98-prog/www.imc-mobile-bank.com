import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Upload, 
  Tag, 
  Image, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
  Smartphone,
  ChevronRight
} from "lucide-react";

export const AdminLayout = () => {
  const { user, logout, isFirebaseConfigured } = useAuth();
  const { settings } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { label: "All Products", path: "/admin/products", icon: Package },
    { label: "Quick Price Editor", path: "/admin/prices", icon: DollarSign, badge: "Daily Rates" },
    { label: "Bulk CSV Import", path: "/admin/import", icon: Upload },
    { label: "Brands & Categories", path: "/admin/brands", icon: Tag },
    { label: "Hero Banners", path: "/admin/banners", icon: Image },
    { label: "Store & WhatsApp Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <img 
            src={settings.logoUrl || "/images/imc-logo.jpg"} 
            alt="IMC Admin" 
            className="h-8 w-auto rounded bg-white p-0.5" 
          />
          <span className="font-black text-sm">IMC Admin Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            target="_blank" 
            className="p-1.5 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            title="Preview Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 bg-slate-800 rounded-lg text-slate-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar (Desktop & Mobile) */}
      <aside 
        className={`w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 z-40 fixed md:sticky top-0 h-screen transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Shopkeeper Header */}
          <div className="p-5 border-b border-slate-800">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src={settings.logoUrl || "/images/imc-logo.jpg"} 
                alt="IMC Logo" 
                className="h-10 w-auto rounded bg-white p-1" 
              />
              <div>
                <span className="font-black text-white text-base tracking-wide block">
                  IMC <span className="text-orange-500">ADMIN</span>
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Cantt Saddar Hyderabad
                </span>
              </div>
            </Link>

            {/* Mode badge */}
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isFirebaseConfigured ? "Connected to Firestore" : "Local Standalone Active"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-md font-bold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer: User profile and Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Live Shop Website</span>
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="min-w-0 pr-2">
              <span className="text-xs font-bold text-white block truncate">
                {user?.displayName || "Farhan Memon"}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.email || "admin@imcmobilebank.pk"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
