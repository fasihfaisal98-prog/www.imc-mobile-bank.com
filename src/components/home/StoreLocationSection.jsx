import React from "react";
import { useStore } from "../../context/StoreContext";
import { MapPin, Navigation, Phone, MessageSquare, Clock, CheckCircle } from "lucide-react";

export const StoreLocationSection = () => {
  const { settings, getWhatsAppNumber } = useStore();
  const waNumber = getWhatsAppNumber();

  return (
    <section className="my-10 sm:my-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Store Photos Gallery */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
          <div className="relative rounded-2xl overflow-hidden shadow-md group h-56 sm:h-72">
            <img
              src={settings.storeExteriorImage || "/images/imc-store-exterior.jpg"}
              alt="IMC Mobile Bank Storefront"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold drop-shadow">
                Official Samsung Brand Store
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md group h-56 sm:h-72">
            <img
              src={settings.storeCrowdImage || "/images/imc-store-crowd.jpg"}
              alt="IMC Mobile Bank Customers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold drop-shadow">
                Cantt Saddar Hyderabad Outlet
              </span>
            </div>
          </div>
        </div>

        {/* Right: Store Details & Action */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-800">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Walk-in Store</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            IMC Mobile Bank — <span className="text-blue-600">Cantt Saddar</span>, Hyderabad
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Welcome to the flagship retail experience of IMC Mobile Bank. Located in the heart of Saddar Cantt, Hyderabad, we offer direct distributor rate box-pack smartphones with authentic warranty checks and hands-on demonstrations.
          </p>

          <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>
                <strong>Address:</strong> {settings.address}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Timings:</strong> Monday to Saturday: 11:00 AM – 11:00 PM | Sunday Open
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Proprietor:</strong> Farhan Memon ({settings.phone || "0333-2621231"})
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href={settings.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello Farhan Bhai, I want to visit IMC Mobile Bank in Saddar Cantt Hyderabad.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Farhan Memon</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
