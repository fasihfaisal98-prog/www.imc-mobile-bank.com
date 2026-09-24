import React from "react";
import { useStore } from "../../context/StoreContext";
import { ShieldCheck, MessageSquare, MapPin, BadgeDollarSign, CheckCircle2 } from "lucide-react";

export const TrustBadges = () => {
  const { settings } = useStore();
  const badges = settings.trustBadges || [];

  const icons = [ShieldCheck, MessageSquare, MapPin, BadgeDollarSign];

  return (
    <section className="my-8 sm:my-10 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          Why Buy From IMC Mobile Bank?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {settings.tagline || "The Name of Trust"} — Reliable Mobile Solutions in Cantt Saddar Hyderabad
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, idx) => {
          const IconComponent = icons[idx % icons.length] || CheckCircle2;
          return (
            <div 
              key={idx} 
              className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 hover:border-slate-500 transition-colors flex flex-col items-center text-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {badge.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
