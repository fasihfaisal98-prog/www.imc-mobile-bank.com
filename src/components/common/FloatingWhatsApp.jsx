import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { MessageSquare, X } from "lucide-react";

export const FloatingWhatsApp = () => {
  const { settings, getWhatsAppNumber } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);
  const waNumber = getWhatsAppNumber();

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hello IMC Mobile Bank, I am browsing your website and want to inquire about phone availability and rates."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-white text-slate-800 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs flex items-center gap-2 animate-fade-in max-w-[240px]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="font-medium leading-tight">
            Chat with <span className="font-bold text-slate-900">{settings.contactPerson || "Farhan Memon"}</span> on WhatsApp!
          </p>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:shadow-emerald-500/40 relative group"
        aria-label="Chat on WhatsApp"
        title="Direct WhatsApp with IMC Mobile Bank"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40"></span>
        <MessageSquare className="w-7 h-7 relative z-10 fill-white" />
      </a>
    </div>
  );
};
