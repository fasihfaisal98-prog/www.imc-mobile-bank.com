import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { deleteProduct, saveProduct } from "../../services/storageService";
import { formatPKR } from "../../config/constants";
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Edit, 
  Copy, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Lock
} from "lucide-react";

export const AdminProducts = () => {
  const { products, brands, refreshData } = useStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleDuplicate = async (product) => {
    const newSlug = `${product.slug}-copy-${Date.now()}`;
    const duplicated = {
      ...product,
      id: `prod_${Date.now()}`,
      name: `${product.name} (Copy)`,
      slug: newSlug,
      sortOrder: (product.sortOrder || 50) + 1
    };
    await saveProduct(duplicated);
    await refreshData();
    showToast(`Duplicated "${product.name}" successfully!`);
  };

  const handleToggleStock = async (product) => {
    const updated = { ...product, inStock: !product.inStock };
    await saveProduct(updated);
    await refreshData();
    showToast(`${product.name} is now ${updated.inStock ? "In Stock" : "Out of Stock"}`);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await refreshData();
    setDeleteConfirmId(null);
    showToast("Product deleted successfully.");
  };

  // Filtered products list
  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedBrand !== "all" && p.brandId !== selectedBrand) return false;
    if (selectedStock === "in" && !p.inStock) return false;
    if (selectedStock === "out" && p.inStock) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Products Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your mobile phone models, prices, variants, and stock availability
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-sm transition self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Phone</span>
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search phones by model name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>

        {/* Brand Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name} {b.slug === "samsung" ? "(Samsung #1)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full sm:w-36 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Stock Status</option>
            <option value="in">In Stock Only</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Phone Name</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Variants & Pricing</th>
                <th className="p-4">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Lock className="w-3 h-3 text-amber-500" />
                    <span>Dealer Rate (Hidden)</span>
                  </div>
                </th>
                <th className="p-4">Tags</th>
                <th className="p-4">Availability</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                    {/* Name & Thumb */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0] || "/images/placeholder-phone.jpg"}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/admin/products/edit/${prod.id}`}
                            className="font-bold text-slate-900 hover:text-blue-600 block text-xs sm:text-sm"
                          >
                            {prod.name}
                          </Link>
                          <span className="text-[10px] text-slate-400">
                            Slug: /{prod.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="p-4 font-semibold text-slate-700">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        prod.brandId === "samsung" ? "bg-blue-100 text-blue-800 font-bold" : "bg-slate-100 text-slate-800"
                      }`}>
                        {prod.brandName}
                      </span>
                    </td>

                    {/* Variants & Price */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {formatPKR(prod.price)}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {prod.variants?.length || 1} Variant(s)
                        {prod.variants?.[0] && ` (${prod.variants[0].ram}+${prod.variants[0].storage})`}
                      </div>
                    </td>

                    {/* Hidden Dealer Price (Shopkeeper only) */}
                    <td className="p-4">
                      <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {prod.dealerPrice ? formatPKR(prod.dealerPrice) : "Not set"}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.tags?.map((t) => (
                          <span
                            key={t}
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              t === "Featured" ? "bg-amber-100 text-amber-800" :
                              t === "Best Seller" ? "bg-purple-100 text-purple-800" :
                              "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Stock switch */}
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStock(prod)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer transition ${
                          prod.inStock
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                        title="Click to toggle In Stock / Out of Stock"
                      >
                        {prod.inStock ? "● In Stock" : "○ Out of Stock"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/admin/products/edit/${prod.id}`}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(prod)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                          title="Duplicate this phone"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 text-base">Delete This Product?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this phone from IMC Mobile Bank? This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
