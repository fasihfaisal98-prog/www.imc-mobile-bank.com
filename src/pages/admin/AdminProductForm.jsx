import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { saveProduct, uploadImageToCloudinary } from "../../services/storageService";
import { formatPKR } from "../../config/constants";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Lock, 
  Check, 
  ShieldCheck, 
  Sparkles,
  MoveUp,
  MoveDown
} from "lucide-react";

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, brands, refreshData } = useStore();

  const isEditing = Boolean(id);
  const existingProduct = isEditing ? products.find(p => p.id === id) : null;

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brandId, setBrandId] = useState("samsung");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [sortOrder, setSortOrder] = useState(50);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Variants state
  const [variants, setVariants] = useState([
    { id: "v1", ram: "8GB", storage: "256GB", price: "", oldPrice: "", inStock: true }
  ]);

  // Colors state
  const [colors, setColors] = useState([
    { name: "Black", hex: "#0f172a" },
    { name: "Silver", hex: "#cbd5e1" }
  ]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#3b82f6");

  // Specs state
  const [specs, setSpecs] = useState({
    display: "",
    battery: "",
    mainCamera: "",
    selfieCamera: "",
    chipset: "",
    network: "5G Supported"
  });

  // Custom specs rows
  const [customSpecs, setCustomSpecs] = useState([]);

  // Highlights bullet list
  const [highlights, setHighlights] = useState(["Official PTA Approved Box Pack with Brand Warranty"]);
  const [newHighlight, setNewHighlight] = useState("");

  // Description
  const [description, setDescription] = useState("");

  // Populate when editing
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || "");
      setSlug(existingProduct.slug || "");
      setBrandId(existingProduct.brandId || "samsung");
      setPrice(existingProduct.price || "");
      setOldPrice(existingProduct.oldPrice || "");
      setDealerPrice(existingProduct.dealerPrice || "");
      setInStock(existingProduct.inStock !== false);
      setSortOrder(existingProduct.sortOrder || 50);
      setTags(existingProduct.tags || []);
      setImages(existingProduct.images || []);
      setVariants(existingProduct.variants?.length ? existingProduct.variants : [
        { id: "v1", ram: "8GB", storage: "256GB", price: existingProduct.price || "", oldPrice: "", inStock: true }
      ]);
      setColors(existingProduct.colors || []);
      setSpecs({
        display: existingProduct.specs?.display || "",
        battery: existingProduct.specs?.battery || "",
        mainCamera: existingProduct.specs?.mainCamera || "",
        selfieCamera: existingProduct.specs?.selfieCamera || "",
        chipset: existingProduct.specs?.chipset || "",
        network: existingProduct.specs?.network || "5G Supported"
      });
      setCustomSpecs(existingProduct.customSpecs || []);
      setHighlights(existingProduct.highlights || ["Official PTA Approved Box Pack with Brand Warranty"]);
      setDescription(existingProduct.description || "");
    }
  }, [existingProduct]);

  // Auto slug generator from name
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!isEditing || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  // Image Upload handler (supports Cloudinary unsigned or local preview data URL)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setImages((prev) => [...prev, uploadedUrl]);
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveImage = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= images.length) return;
    const newArr = [...images];
    const temp = newArr[index];
    newArr[index] = newArr[newIdx];
    newArr[newIdx] = temp;
    setImages(newArr);
  };

  // Variant handlers
  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: `v_${Date.now()}`, ram: "8GB", storage: "256GB", price: price || "", oldPrice: "", inStock: true }
    ]);
  };

  const handleUpdateVariant = (index, field, value) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Colors handlers
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColors((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName("");
  };

  const handleRemoveColor = (index) => {
    setColors((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Custom specs handlers
  const handleAddCustomSpec = () => {
    setCustomSpecs((prev) => [...prev, { label: "", value: "" }]);
  };

  const handleUpdateCustomSpec = (index, field, value) => {
    setCustomSpecs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveCustomSpec = (index) => {
    setCustomSpecs((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights((prev) => [...prev, newHighlight.trim()]);
    setNewHighlight("");
  };

  const handleRemoveHighlight = (index) => {
    setHighlights((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Tags toggle
  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a phone model name");
      return;
    }

    const brandObj = brands.find((b) => b.slug === brandId) || { name: brandId, slug: brandId };

    // Primary price from first variant or input
    const primaryPrice = variants[0]?.price ? Number(variants[0].price) : Number(price) || 0;

    const productPayload = {
      ...(existingProduct || {}),
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brandId: brandObj.slug,
      brandName: brandObj.name,
      price: primaryPrice,
      oldPrice: oldPrice ? Number(oldPrice) : null,
      dealerPrice: dealerPrice ? Number(dealerPrice) : null,
      inStock: Boolean(inStock),
      sortOrder: Number(sortOrder) || 50,
      tags,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
      variants: variants.map((v) => ({
        ...v,
        price: Number(v.price) || primaryPrice,
        oldPrice: v.oldPrice ? Number(v.oldPrice) : null,
        inStock: v.inStock !== false
      })),
      colors,
      specs,
      customSpecs: customSpecs.filter((cs) => cs.label && cs.value),
      highlights: highlights.filter(Boolean),
      description: description.trim()
    };

    await saveProduct(productPayload);
    await refreshData();
    navigate("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/products"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>
        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">
          {isEditing ? "Editing Mode" : "New Mobile Entry"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            1. Basic Phone Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Brand Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
              >
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name} {b.slug === "samsung" ? "(Samsung #1)" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone Model Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Samsung Galaxy A27 5G"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-medium"
              />
            </div>

            {/* URL Slug (Auto generated) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Website URL Slug (Auto)
              </label>
              <div className="flex items-center text-xs text-slate-500 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5">
                <span>/product/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-none text-slate-900 font-bold focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            {/* In-Stock Switch */}
            <div className="flex items-center gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-3 text-xs font-bold text-slate-800">
                  {inStock ? "Available In Stock" : "Marked Out of Stock"}
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Highlight Tags for Homepage Badges:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {["Featured", "Best Seller", "New Arrival"].map((t) => {
                const active = tags.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5" />}
                    <span>{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Images (Upload / Paste URL / Reorder) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                2. Product Images
              </h2>
              <p className="text-xs text-slate-500">
                The first image is the main photo displayed on the homepage and catalog.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {images.length} Image(s)
            </span>
          </div>

          {/* Upload and URL inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Direct Upload button */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-400 transition bg-slate-50 flex flex-col items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600 mb-1.5" />
              <label className="cursor-pointer text-xs font-bold text-blue-600 hover:underline">
                <span>Upload image from your device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] text-slate-400 mt-1">
                {uploadingImage ? "Uploading to Cloudinary..." : "PNG, JPG or WebP (max 5MB)"}
              </span>
            </div>

            {/* Paste Image URL */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-white flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Or Paste an Image URL:
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/phone.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="mt-2 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold self-end transition"
              >
                + Add Image URL
              </button>
            </div>
          </div>

          {/* Images preview strip with reorder */}
          {images.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Uploaded Images (First is Main):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group bg-slate-50 border border-slate-200 rounded-2xl p-2 flex flex-col items-center">
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                        Main
                      </span>
                    )}
                    <img
                      src={img}
                      alt="preview"
                      className="w-20 h-20 object-contain rounded-lg mb-2"
                    />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveImage(idx, -1)}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        title="Move Left"
                      >
                        <MoveUp className="w-3.5 h-3.5 rotate-[-90deg]" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === images.length - 1}
                        onClick={() => handleMoveImage(idx, 1)}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                        title="Move Right"
                      >
                        <MoveDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 text-red-500 hover:text-red-700 ml-1"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Variants & Pricing (RAM + Storage + Prices) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                3. Storage Variants & Pricing (RRP)
              </h2>
              <p className="text-xs text-slate-500">
                Add each RAM + ROM variation with its respective retail cash price.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddVariant}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Variant Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, idx) => (
              <div 
                key={v.id || idx} 
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl items-center"
              >
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">RAM</label>
                  <input
                    type="text"
                    placeholder="e.g. 8GB or 8+12GB"
                    value={v.ram}
                    onChange={(e) => handleUpdateVariant(idx, "ram", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Storage</label>
                  <input
                    type="text"
                    placeholder="e.g. 256GB"
                    value={v.storage}
                    onChange={(e) => handleUpdateVariant(idx, "storage", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-semibold"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Public Price (PKR) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 119999"
                    value={v.price}
                    onChange={(e) => handleUpdateVariant(idx, "price", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-bold text-slate-900"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Old Strike Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="Optional for discount"
                    value={v.oldPrice}
                    onChange={(e) => handleUpdateVariant(idx, "oldPrice", e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-500"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-4 sm:pt-0">
                  <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={v.inStock !== false}
                      onChange={(e) => handleUpdateVariant(idx, "inStock", e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span>Stock</span>
                  </label>

                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Remove variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Internal Hidden Dealer Price Notice */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Internal Dealer / Purchase Rate (Strictly Hidden from Public)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                This internal rate is exclusively visible to you in this admin panel. It is NEVER shown to customers on the website or in WhatsApp messages.
              </p>
              <div className="w-full sm:w-64 pt-1">
                <input
                  type="number"
                  placeholder="e.g. 112000 (Dealer Rate)"
                  value={dealerPrice}
                  onChange={(e) => setDealerPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-amber-300 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Colors */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            4. Available Color Choices
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            {colors.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="font-bold text-slate-800">{c.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(idx)}
                  className="text-slate-400 hover:text-red-500 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="text"
              placeholder="Color name (e.g. Titanium Blue)"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 w-48"
            />
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="w-10 h-8 p-0 rounded-lg cursor-pointer border border-slate-200"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              + Add Color
            </button>
          </div>
        </div>

        {/* 5. Technical Specifications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900">
              5. Technical Specifications
            </h2>
            <button
              type="button"
              onClick={handleAddCustomSpec}
              className="text-blue-600 hover:underline text-xs font-bold"
            >
              + Add Custom Spec Row
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Display</label>
              <input
                type="text"
                placeholder='e.g. 6.7" 120Hz Super AMOLED'
                value={specs.display}
                onChange={(e) => setSpecs({ ...specs, display: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Battery & Charging</label>
              <input
                type="text"
                placeholder="e.g. 5000mAh 25W Fast Charge"
                value={specs.battery}
                onChange={(e) => setSpecs({ ...specs, battery: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Camera</label>
              <input
                type="text"
                placeholder="e.g. 50MP (OIS) + 8MP + 2MP"
                value={specs.mainCamera}
                onChange={(e) => setSpecs({ ...specs, mainCamera: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Selfie Camera</label>
              <input
                type="text"
                placeholder="e.g. 13MP HDR Front"
                value={specs.selfieCamera}
                onChange={(e) => setSpecs({ ...specs, selfieCamera: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Processor / Chipset</label>
              <input
                type="text"
                placeholder="e.g. Exynos 1480 4nm"
                value={specs.chipset}
                onChange={(e) => setSpecs({ ...specs, chipset: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Network</label>
              <input
                type="text"
                placeholder="e.g. 5G Dual SIM or 4G LTE"
                value={specs.network}
                onChange={(e) => setSpecs({ ...specs, network: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Custom Spec rows */}
          {customSpecs.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase">Custom Specs:</span>
              {customSpecs.map((cs, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Water Resistance)"
                    value={cs.label}
                    onChange={(e) => handleUpdateCustomSpec(idx, "label", e.target.value)}
                    className="w-1/3 px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. IP68 Certified)"
                    value={cs.value}
                    onChange={(e) => handleUpdateCustomSpec(idx, "value", e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomSpec(idx)}
                    className="p-2 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. Highlights & Description */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            6. Highlights & Description
          </h2>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-700">
              Key Highlights (Bullet Points):
            </label>
            <div className="space-y-2">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                  <span>• {h}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Type a new highlight bullet..."
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                + Add Bullet
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Product Overview / Description:
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a clear overview of the smartphone..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Discard Changes
          </Link>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Product to Store</span>
          </button>
        </div>
      </form>
    </div>
  );
};
