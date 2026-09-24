import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { saveBanner, deleteBanner } from "../../services/storageService";
import { Image as ImageIcon, Plus, Trash2, Edit, Save, CheckCircle2, Eye, EyeOff } from "lucide-react";

export const AdminBanners = () => {
  const { banners, refreshData } = useStore();

  const [editingBanner, setEditingBanner] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleToggleActive = async (banner) => {
    const updated = { ...banner, active: !banner.active };
    await saveBanner(updated);
    await refreshData();
    showToast(`Banner "${banner.title}" is now ${updated.active ? "Active" : "Hidden"}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this banner slide?")) {
      await deleteBanner(id);
      await refreshData();
      showToast("Banner deleted successfully.");
    }
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    if (!editingBanner.title.trim()) return;

    await saveBanner(editingBanner);
    await refreshData();
    setEditingBanner(null);
    showToast("Banner slide saved!");
  };

  const handleStartNew = () => {
    setEditingBanner({
      id: `banner_${Date.now()}`,
      title: "",
      tagline: "",
      subtitle: "",
      price: "Rs. ",
      buttonText: "Order on WhatsApp",
      link: "/mobiles",
      badge: "Official Warranty",
      bgGradient: "from-blue-950 via-slate-900 to-indigo-950",
      accentColor: "#38bdf8",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1000&auto=format&fit=crop&q=80",
      active: true,
      order: banners.length + 1
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in border border-indigo-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Hero Banner Slider Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize the top animated banners featured on the homepage of IMC Mobile Bank.
          </p>
        </div>

        <button
          onClick={handleStartNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Editing Form Modal / Inline */}
      {editingBanner && (
        <form onSubmit={handleSaveBanner} className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-300 shadow-xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              {editingBanner.title ? `Edit: ${editingBanner.title}` : "Create New Banner Slide"}
            </h3>
            <button
              type="button"
              onClick={() => setEditingBanner(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Headline / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Samsung Galaxy A27 5G"
                value={editingBanner.title}
                onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Catchy Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Be Hot. Be Different."
                value={editingBanner.tagline}
                onChange={(e) => setEditingBanner({ ...editingBanner, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Specs Summary / Subtitle
              </label>
              <input
                type="text"
                placeholder='e.g. 50MP OIS • 6.7" 120Hz Super AMOLED'
                value={editingBanner.subtitle}
                onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Display Price Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Rs. 119,999"
                value={editingBanner.price}
                onChange={(e) => setEditingBanner({ ...editingBanner, price: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Image URL (Phone render)
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={editingBanner.image}
                onChange={(e) => setEditingBanner({ ...editingBanner, image: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Target Link (Page or Product)
              </label>
              <input
                type="text"
                placeholder="/product/samsung-galaxy-a27-5g"
                value={editingBanner.link}
                onChange={(e) => setEditingBanner({ ...editingBanner, link: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingBanner(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Slide</span>
            </button>
          </div>
        </form>
      )}

      {/* Current Banners Grid */}
      <div className="space-y-4">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-5 justify-between"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500 shrink-0">
                {idx + 1}
              </span>
              <img
                src={banner.image || "/images/placeholder-phone.jpg"}
                alt={banner.title}
                className="w-16 h-16 object-contain rounded-xl bg-slate-900 p-1 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{banner.title}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                    {banner.price}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{banner.subtitle}</p>
                <span className="text-[10px] text-blue-600 font-mono">Link: {banner.link}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <button
                type="button"
                onClick={() => handleToggleActive(banner)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  banner.active !== false
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {banner.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{banner.active !== false ? "Active" : "Hidden"}</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingBanner(banner)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                title="Edit slide"
              >
                <Edit className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(banner.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                title="Delete slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
