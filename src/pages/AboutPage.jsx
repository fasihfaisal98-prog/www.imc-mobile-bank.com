import React from "react";
import { Helmet } from "react-helmet-async";
import { useStore } from "../context/StoreContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { ShieldCheck, MapPin, Award, Users, MessageSquare, Phone, Clock } from "lucide-react";

export const AboutPage = () => {
  const { settings, getWhatsAppNumber } = useStore();
  const waNumber = getWhatsAppNumber();

  return (
    <>
      <Helmet>
        <title>About IMC Mobile Bank | The Name of Trust in Hyderabad</title>
        <meta name="description" content="Discover IMC Mobile Bank Hyderabad, operated by Farhan Memon in Cantt Saddar. Your trusted dealer for genuine PTA approved Samsung, Xiaomi, Infinix, Tecno & Nubia phones." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <Breadcrumbs items={[{ label: "About Us", link: "/about" }]} />

        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 my-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
              The Name of Trust
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              About IMC Mobile Bank
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Serving smartphone buyers across Hyderabad and Sindh with 100% genuine box-pack, PTA approved devices, guaranteed official brand warranties, and transparent wholesale-level rates.
            </p>
          </div>
        </div>

        {/* Story & Store Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Built on Decades of Trust & Excellence
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded and managed by <strong>Farhan Memon</strong>, IMC Mobile Bank has grown into one of the most reputable retail smartphone destinations in Hyderabad. Located conveniently at Shifa Paradise, Cantt Saddar, our outlet provides a direct link between leading international smartphone manufacturers and discerning buyers.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike online platforms that take advance payments with slow delivery times, IMC Mobile Bank connects you directly to Farhan Memon on WhatsApp. Confirm current market rates, inspect specifications, and enjoy same-day hand pickup at our showroom or secured courier delivery nationwide.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">PTA Approved Only</h4>
                <p className="text-xs text-slate-500 mt-1">Zero non-PTA or kit phones. Only sealed company packs.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Thousands of Customers</h4>
                <p className="text-xs text-slate-500 mt-1">Trusted by families, students, and professionals in Hyderabad.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={settings.storeCrowdImage || "/images/imc-store-crowd.jpg"}
                alt="IMC Mobile Bank Showroom in Hyderabad Cantt"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-600 text-center font-medium">
              📍 Our active showroom at Shifa Paradise, Cantt Saddar, Hyderabad
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-emerald-600 text-white rounded-3xl p-8 my-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Want to discuss phone rates or order?</h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Speak directly with Farhan Memon on WhatsApp 0333-2621231 for immediate price matching and stock checks.
            </p>
          </div>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg transition whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Chat with Farhan Memon</span>
          </a>
        </div>
      </div>
    </>
  );
};
