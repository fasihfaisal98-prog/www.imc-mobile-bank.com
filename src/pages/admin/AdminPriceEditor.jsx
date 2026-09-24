import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import { bulkUpdatePrices } from "../../services/storageService";
import { formatPKR } from "../../config/constants";
import { DollarSign, Save, Search, CheckCircle2, Lock, ArrowUpDown, Filter } from "lucide-react";

export const AdminPriceEditor = () => {
  const { products, brands, refreshData } = useStore();

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      setTableData(
        products.map((p) => ({
          id: p.id,
          name: p.name,
          brandName: p.brandName,
          brandId: p.brandId,
          price: p.variants?.[0]?.price || p.price || 0,
          oldPrice: p.variants?.[0]?.oldPrice || p.oldPrice || "",
          dealerPrice: p.dealerPrice || "",
          inStock: p.inStock !== false,
          variants: p.variants || [],
          hasChanges: false
        }))
      );
    }
  }, [products]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCellChange = (id, field, value) => {
    setTableData((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: value,
          hasChanges: true
        };
      })
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const updates = tableData.map((item) => {
        // Also update primary variant price to match
        const updatedVariants = item.variants.map((v, i) => {
          if (i === 0) {
            return {
              ...v,
              price: Number(item.price),
              oldPrice: item.oldPrice ? Number(item.oldPrice) : null,
              inStock: Boolean(item.inStock)
            };
          }
          return v;
        });

        return {
          id: item.id,
          price: Number(item.price),
          oldPrice: item.oldPrice ? Number(item.oldPrice) : null,
          dealerPrice: item.dealerPrice ? Number(item.dealerPrice) : null,
          inStock: Boolean(item.inStock),
          variants: updatedVariants
        };
      });

      await bulkUpdatePrices(updates);
      await refreshData();
      showToast("✅ All prices and stock statuses updated successfully in 1 click!");
    } catch (err) {
      alert("Error saving prices: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered rows
  const filteredRows = tableData.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedBrand !== "all" && item.brandId !== selectedBrand) return false;
    return true;
  });

  const changedCount = tableData.filter((t) => t.hasChanges).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in border border-emerald-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Fast Rate List Update
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Spreadsheet Price & Stock Editor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit wholesale & retail rates across all phones simultaneously. Hit "Save All Changes" to publish.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>
            {isSaving ? "Saving..." : `Save All Price Changes ${changedCount > 0 ? `(${changedCount} modified)` : ""}`}
          </span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search phones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">#</th>
                <th className="p-3.5">Phone Model</th>
                <th className="p-3.5">Brand</th>
                <th className="p-3.5 min-w-[150px]">
                  Public Retail Price (Rs.) *
                </th>
                <th className="p-3.5 min-w-[150px]">
                  Old Strike Price (Rs.)
                </th>
                <th className="p-3.5 min-w-[160px] bg-slate-800">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Internal Dealer Rate (Rs.)</span>
                  </div>
                </th>
                <th className="p-3.5 text-center min-w-[120px]">
                  Stock Switch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-blue-50/50 transition ${row.hasChanges ? "bg-amber-50/50" : ""}`}
                >
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="p-3 font-bold text-slate-900">
                    <span className="block truncate max-w-[200px] sm:max-w-xs">{row.name}</span>
                    {row.hasChanges && (
                      <span className="text-[10px] text-amber-600 font-bold">● Unsaved edits</span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-slate-600">
                    {row.brandName}
                  </td>

                  {/* Public Price Input */}
                  <td className="p-2.5">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) => handleCellChange(row.id, "price", e.target.value)}
                      className="w-full px-2.5 py-1.5 font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none text-xs"
                    />
                  </td>

                  {/* Old Strike Price Input */}
                  <td className="p-2.5">
                    <input
                      type="number"
                      placeholder="Optional"
                      value={row.oldPrice}
                      onChange={(e) => handleCellChange(row.id, "oldPrice", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-slate-500 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-xs"
                    />
                  </td>

                  {/* Hidden Internal Dealer Price Input */}
                  <td className="p-2.5 bg-amber-50/30">
                    <input
                      type="number"
                      placeholder="Shopkeeper only"
                      value={row.dealerPrice}
                      onChange={(e) => handleCellChange(row.id, "dealerPrice", e.target.value)}
                      className="w-full px-2.5 py-1.5 font-mono font-bold text-amber-900 bg-white border border-amber-300 rounded-lg focus:border-amber-500 outline-none text-xs"
                    />
                  </td>

                  {/* Stock Toggle */}
                  <td className="p-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleCellChange(row.id, "inStock", !row.inStock)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                        row.inStock
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {row.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Save button on bottom for quick access */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Save All Price Changes Now</span>
        </button>
      </div>
    </div>
  );
};
