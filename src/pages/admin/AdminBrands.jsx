import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { saveBrand, saveAllBrands } from "../../services/storageService";
import { Tag, Lock, Plus, Save, MoveUp, MoveDown, CheckCircle2 } from "lucide-react";

export const AdminBrands = () => {
  const { brands, refreshData } = useStore();

  const [brandsList, setBrandsList] = useState(() => {
    return [...brands].sort((a, b) => {
      if (a.slug === "samsung" || a.id === "samsung") return -1;
      if (b.slug === "samsung" || b.id === "samsung") return 1;
      return (a.order || 99) - (b.order || 99);
    });
  });

  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandLogo, setNewBrandLogo] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleMove = async (index, direction) => {
    // If moving Samsung, it must stay #1
    if (index === 0 && direction === 1) return;
    const newIdx = index + direction;
    if (newIdx <= 0 || newIdx >= brandsList.length) return; // Keep Samsung at 0

    const updated = [...brandsList];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;

    // Reassign order
    const ordered = updated.map((b, i) => ({ ...b, order: i + 1 }));
    setBrandsList(ordered);
    await saveAllBrands(ordered);
    await refreshData();
    showToast("Brand order updated!");
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const slug = newBrandName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newBrand = {
      id: slug,
      name: newBrandName.trim(),
      slug: slug,
      order: brandsList.length + 1,
      isLocked: false,
      logo: newBrandLogo.trim() || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png"
    };

    await saveBrand(newBrand);
    await refreshData();
    setBrandsList([...brandsList, newBrand]);
    setNewBrandName("");
    setNewBrandLogo("");
    showToast(`Brand "${newBrand.name}" added successfully!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in border border-blue-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Brands & Categories Manager
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure mobile phone brands and their display ranking. Note: Samsung is permanently locked to #1 priority.
        </p>
      </div>

      {/* Brands List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Brand Priority Sequence (Navbar, Home, and Filters)
        </h2>

        <div className="space-y-3">
          {brandsList.map((brand, idx) => {
            const isSamsung = brand.slug === "samsung" || brand.id === "samsung";

            return (
              <div
                key={brand.id || brand.slug}
                className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                  isSamsung
                    ? "bg-blue-50/60 border-blue-300 shadow-xs"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-slate-700">
                    {idx + 1}
                  </div>

                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-8 object-contain bg-white rounded p-1 border border-slate-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  <div>
                    <h3 className={`text-sm font-bold ${isSamsung ? "text-blue-900 font-black" : "text-slate-900"}`}>
                      {brand.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      Slug: /{brand.slug}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSamsung ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                      Locked #1 Priority
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 1} // Can't swap into Samsung's spot at 0
                        onClick={() => handleMove(idx, -1)}
                        className="p-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg hover:bg-white"
                        title="Move Up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === brandsList.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="p-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg hover:bg-white"
                        title="Move Down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Brand Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Add New Mobile Brand
        </h2>

        <form onSubmit={handleAddBrand} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Brand Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vivo, Realme, Apple"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none font-semibold"
            />
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Logo Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://...logo.png"
              value={newBrandLogo}
              onChange={(e) => setNewBrandLogo(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Brand</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
