import React from "react";
import { CheckCircle2, Cpu, Smartphone, BatteryCharging, Camera, Wifi, Shield } from "lucide-react";

export const SpecsTable = ({ product }) => {
  if (!product) return null;

  const specs = product.specs || {};
  const highlights = product.highlights || [];
  const customSpecs = product.customSpecs || [];

  const mainSpecsList = [
    { label: "Display", value: specs.display, icon: Smartphone },
    { label: "Battery & Charging", value: specs.battery, icon: BatteryCharging },
    { label: "Main Camera", value: specs.mainCamera, icon: Camera },
    { label: "Front / Selfie Camera", value: specs.selfieCamera, icon: Camera },
    { label: "Processor & Chipset", value: specs.chipset, icon: Cpu },
    { label: "Network & Connectivity", value: specs.network, icon: Wifi },
  ];

  return (
    <div className="space-y-8">
      {/* Highlights Section */}
      {highlights.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-5 bg-blue-600 rounded-full"></span>
            Key Highlights & Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications Table (PriceOye clean style) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-5 bg-emerald-600 rounded-full"></span>
          Full Technical Specifications
        </h3>

        <div className="overflow-hidden rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {mainSpecsList.map((item, idx) => {
            if (!item.value) return null;
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`grid grid-cols-1 sm:grid-cols-12 p-4 transition-colors ${
                  idx % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                }`}
              >
                <div className="sm:col-span-4 flex items-center gap-2.5 font-bold text-xs sm:text-sm text-slate-800">
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="sm:col-span-8 text-xs sm:text-sm text-slate-600 mt-1 sm:mt-0 font-medium">
                  {item.value}
                </div>
              </div>
            );
          })}

          {/* Custom specs added dynamically by shopkeeper */}
          {customSpecs.map((cs, idx) => (
            <div 
              key={`cs_${idx}`} 
              className="grid grid-cols-1 sm:grid-cols-12 p-4 bg-white"
            >
              <div className="sm:col-span-4 flex items-center gap-2.5 font-bold text-xs sm:text-sm text-slate-800">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{cs.label}</span>
              </div>
              <div className="sm:col-span-8 text-xs sm:text-sm text-slate-600 mt-1 sm:mt-0 font-medium">
                {cs.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      {product.description && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full"></span>
            Product Overview & Description
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};
