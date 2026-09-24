import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { saveSettings, resetToInitialData } from "../../services/storageService";
import { 
  Settings as SettingsIcon, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Globe, 
  Save, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export const AdminSettings = () => {
  const { settings, refreshData } = useStore();

  const [form, setForm] = useState({ ...settings });
  const [toastMessage, setToastMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveSettings(form);
      await refreshData();
      showToast("Store settings & WhatsApp templates saved successfully!");
    } catch (err) {
      alert("Error saving settings: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCatalog = async () => {
    if (window.confirm("Restore factory catalog with 48 official phones across Samsung, Xiaomi, Infinix, Tecno, Nubia? Any custom additions will be reset.")) {
      resetToInitialData();
      await refreshData();
      showToast("Store catalog reset to official September 2026 factory seed data!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Store & WhatsApp Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure receiving WhatsApp number, order message formats, announcement bar, and social accounts.
          </p>
        </div>

        <button
          onClick={handleResetCatalog}
          type="button"
          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl border border-red-200 flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Factory Seed Catalog</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Core WhatsApp Order Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                1. WhatsApp Order Configuration (Core System)
              </h2>
              <p className="text-xs text-slate-500">
                All customer orders will be sent directly to this WhatsApp number.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Receiving WhatsApp Number *
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber || ""}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="03332621231"
                className="w-full px-4 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Format: 03332621231 (automatically formatted to international wa.me/923332621231)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                value={form.contactPerson || ""}
                onChange={(e) => handleChange("contactPerson", e.target.value)}
                placeholder="Farhan Memon"
                className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* WhatsApp Message Template */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-bold uppercase text-slate-700">
              Single-Product Order WhatsApp Message Template:
            </label>
            <textarea
              rows="6"
              value={form.whatsappTemplate || ""}
              onChange={(e) => handleChange("whatsappTemplate", e.target.value)}
              className="w-full px-4 py-3 text-xs font-mono rounded-xl border border-slate-300 focus:border-emerald-500 outline-none leading-relaxed"
            ></textarea>
            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              Available dynamic placeholder tags: <code className="text-emerald-700 font-bold">{`{product}`}</code>, <code className="text-emerald-700 font-bold">{`{variant}`}</code>, <code className="text-emerald-700 font-bold">{`{price}`}</code>, <code className="text-emerald-700 font-bold">{`{quantity}`}</code>, <code className="text-emerald-700 font-bold">{`{url}`}</code>, <code className="text-emerald-700 font-bold">{`{name}`}</code>, <code className="text-emerald-700 font-bold">{`{phone}`}</code>, <code className="text-emerald-700 font-bold">{`{city_address}`}</code>.
            </div>
          </div>
        </div>

        {/* 2. Announcement & Notices */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            2. Announcement Bar & Rate Notices
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Top Announcement Bar Text:
            </label>
            <input
              type="text"
              value={form.announcementBar || ""}
              onChange={(e) => handleChange("announcementBar", e.target.value)}
              placeholder="⚡ 100% Genuine PTA Approved Mobile Phones | Same Day Store Pickup & Courier Across Pakistan"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Prices Updated Disclaimer:
            </label>
            <input
              type="text"
              value={form.priceUpdatedNotice || ""}
              onChange={(e) => handleChange("priceUpdatedNotice", e.target.value)}
              placeholder="Prices updated: September 2026. Prices may change, confirm on WhatsApp."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* 3. Physical Shop Contact Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            3. Showroom Address & Contact Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Shop Telephone / Calling Phone:
              </label>
              <input
                type="text"
                value={form.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="03332621231"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Email Address:
              </label>
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="imcmobilebank@gmail.com"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Store Physical Address:
            </label>
            <textarea
              rows="2"
              value={form.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Shop # 9/10, Shifa Paradise, near Belair Hospital, opposite Kachailo Bungalow, near Mr Wari Chat, Cantt Saddar, Hyderabad"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Google Maps Location Link:
            </label>
            <input
              type="url"
              value={form.googleMapsUrl || ""}
              onChange={(e) => handleChange("googleMapsUrl", e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* 4. Social Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            4. Social Media Accounts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                TikTok URL:
              </label>
              <input
                type="text"
                value={form.socials?.tiktok || ""}
                onChange={(e) => handleNestedChange("socials", "tiktok", e.target.value)}
                placeholder="https://tiktok.com/@imcmobilebank"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Facebook URL:
              </label>
              <input
                type="text"
                value={form.socials?.facebook || ""}
                onChange={(e) => handleNestedChange("socials", "facebook", e.target.value)}
                placeholder="https://www.facebook.com/IMCMOBILEBANK"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                YouTube URL:
              </label>
              <input
                type="text"
                value={form.socials?.youtube || ""}
                onChange={(e) => handleNestedChange("socials", "youtube", e.target.value)}
                placeholder="https://www.youtube.com/@imcmobilebank"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Instagram URL:
              </label>
              <input
                type="text"
                value={form.socials?.instagram || ""}
                onChange={(e) => handleNestedChange("socials", "instagram", e.target.value)}
                placeholder="https://www.instagram.com/imcmobilebank"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. SEO Meta Tags */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            5. SEO Search Engine Optimization
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Homepage Meta Title:
            </label>
            <input
              type="text"
              value={form.seo?.metaTitle || ""}
              onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Homepage Meta Description:
            </label>
            <textarea
              rows="3"
              value={form.seo?.metaDescription || ""}
              onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 outline-none"
            ></textarea>
          </div>
        </div>

        {/* Sticky Submit Bar */}
        <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Changes take effect across the entire website instantly.
          </span>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Settings..." : "Save All Store Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
