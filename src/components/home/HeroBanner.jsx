import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export const HeroBanner = () => {
  const { banners, getWhatsAppNumber } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBanners = banners && banners.length > 0 ? banners : [];

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const current = activeBanners[currentIndex];
  const waNumber = getWhatsAppNumber();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-slate-950 my-3 sm:my-5">
      {/* Banner Slide Container */}
      <div 
        className={`w-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] bg-gradient-to-r ${current.bgGradient || "from-slate-900 via-indigo-950 to-slate-900"} text-white flex items-center relative transition-all duration-700`}
      >
        {/* Background glow effects */}
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30" 
          style={{ backgroundColor: current.accentColor || "#38bdf8" }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: current.accentColor || "#38bdf8" }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Text details (Left) */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4 text-center md:text-left">
            {current.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{current.badge}</span>
              </div>
            )}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {current.title}
            </h1>

            {current.tagline && (
              <p className="text-base sm:text-xl font-bold text-amber-300 tracking-wide">
                "{current.tagline}"
              </p>
            )}

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              {current.subtitle}
            </p>

            {current.price && (
              <div className="pt-1 flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Official Rate:</span>
                <span className="text-xl sm:text-3xl font-black text-white">
                  {current.price}
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  `Hello IMC Mobile Bank, I saw the hero banner for "${current.title}" and want to order/inquire about it.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{current.buttonText || "Order on WhatsApp"}</span>
              </a>

              {current.link && (
                <Link
                  to={current.link}
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm backdrop-blur-sm border border-white/20 flex items-center gap-2 transition"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Device Showcase Image (Right) */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            <div className="relative group">
              <img
                src={current.image || "/images/placeholder-phone.jpg"}
                alt={current.title}
                className="max-h-60 sm:max-h-80 md:max-h-96 w-auto object-contain drop-shadow-2xl rounded-2xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 transition-all rounded-full ${
                  idx === currentIndex ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
