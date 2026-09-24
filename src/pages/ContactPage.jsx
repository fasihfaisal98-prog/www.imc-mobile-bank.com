import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useStore } from "../context/StoreContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, Navigation, Globe } from "lucide-react";

export const ContactPage = () => {
  const { settings, getWhatsAppNumber } = useStore();
  const waNumber = getWhatsAppNumber();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const formatted = `Hello Farhan Bhai (IMC Mobile Bank),
My name is ${name}
Phone: ${phone || "Not specified"}
Inquiry: ${message}`;

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Contact & Visit Us | IMC Mobile Bank Cantt Saddar Hyderabad</title>
        <meta name="description" content="Visit IMC Mobile Bank at Shifa Paradise, Cantt Saddar, Hyderabad. WhatsApp 03332621231, Call Farhan Memon, or visit our retail shop." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <Breadcrumbs items={[{ label: "Contact Us", link: "/contact" }]} />

        <div className="my-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact IMC Mobile Bank
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visit our retail mobile phone outlet in Cantt Saddar Hyderabad or connect directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
          {/* Left: Contact Info & Store Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Shop Location & Contact
              </h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Physical Address:</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-0.5">
                      {settings.address || "Shop # 9/10, Shifa Paradise, near Belair Hospital, opposite Kachailo Bungalow, near Mr Wari Chat, Cantt Saddar, Hyderabad."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct WhatsApp / Phone:</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      <a href={`tel:${settings.phone || "03332621231"}`} className="font-bold text-blue-600 hover:underline">
                        {settings.phone || "0333-2621231"}
                      </a> (Contact Person: <strong>{settings.contactPerson || "Farhan Memon"}</strong>)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Address:</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      <a href={`mailto:${settings.email || "imcmobilebank@gmail.com"}`} className="hover:underline">
                        {settings.email || "imcmobilebank@gmail.com"}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Store Hours:</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Monday to Saturday: 11:00 AM – 11:00 PM <br />
                      Sunday: 04:00 PM – 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={settings.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navigate with Google Maps</span>
                </a>

                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp 0333-2621231</span>
                </a>
              </div>
            </div>

            {/* Storefront Exterior Image */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200">
              <img
                src={settings.storeExteriorImage || "/images/imc-store-exterior.jpg"}
                alt="IMC Mobile Bank Storefront"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right: Quick WhatsApp Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Send an Inquiry via WhatsApp</h3>
                  <p className="text-xs text-slate-500">Ask about any model, color, or price confirmation</p>
                </div>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Memon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0333 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Phone Inquiry <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Which phone are you looking for? (e.g. Is Samsung Galaxy A27 5G available in Awesome Iceblue?)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Farhan Memon on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
