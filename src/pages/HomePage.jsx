import React from "react";
import { Helmet } from "react-helmet-async";
import { useStore } from "../context/StoreContext";
import { HeroBanner } from "../components/home/HeroBanner";
import { BrandRow } from "../components/home/BrandRow";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { ShopByPrice } from "../components/home/ShopByPrice";
import { TrustBadges } from "../components/home/TrustBadges";
import { StoreLocationSection } from "../components/home/StoreLocationSection";
import { SkeletonCard } from "../components/common/SkeletonCard";

export const HomePage = () => {
  const { products, settings, loading } = useStore();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full h-80 bg-slate-200 animate-pulse rounded-3xl mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Filter groups
  // CRITICAL: Samsung Mobiles MUST appear FIRST!
  const samsungProducts = products.filter(p => p.brandId === "samsung" || p.brandName?.toLowerCase() === "samsung");
  const bestSellers = products.filter(p => p.tags?.includes("Best Seller"));
  const newArrivals = products.filter(p => p.tags?.includes("New Arrival"));
  const redmiProducts = products.filter(p => p.brandId === "redmi-xiaomi" || p.brandName?.toLowerCase().includes("xiaomi") || p.brandName?.toLowerCase().includes("redmi"));
  const infinixProducts = products.filter(p => p.brandId === "infinix" || p.brandName?.toLowerCase().includes("infinix"));
  const tecnoProducts = products.filter(p => p.brandId === "tecno" || p.brandName?.toLowerCase().includes("tecno"));
  const nubiaProducts = products.filter(p => p.brandId === "nubia-zte" || p.brandName?.toLowerCase().includes("nubia") || p.brandName?.toLowerCase().includes("zte"));

  return (
    <>
      <Helmet>
        <title>{settings.seo?.metaTitle || "IMC Mobile Bank - The Name of Trust | Official Smartphones in Hyderabad"}</title>
        <meta name="description" content={settings.seo?.metaDescription || "Shop 100% genuine PTA approved mobile phones in Hyderabad. Samsung, Xiaomi, Infinix, Tecno, Nubia. Order directly on WhatsApp."} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* 1. Hero Banner Slider */}
        <HeroBanner />

        {/* 2. Official Brand Pills (Samsung First) */}
        <BrandRow />

        {/* 3. SAMSUNG MOBILES SECTION (ALWAYS FIRST AS REQUIRED!) */}
        <FeaturedSection
          title="Samsung Galaxy Collection"
          subtitle="Explore official PTA approved Samsung Galaxy S-Series, A-Series and Fan Editions"
          products={samsungProducts}
          viewAllLink="/brand/samsung"
          isSamsungSection={true}
          badgeText="Samsung Premier Brand"
        />

        {/* 4. Best Sellers */}
        <FeaturedSection
          title="Trending Best Sellers"
          subtitle="Most ordered smartphones by customers across Sindh and Pakistan"
          products={bestSellers}
          viewAllLink="/mobiles?tag=Best Seller"
          badgeText="Customer Favorites"
        />

        {/* 5. New Arrivals */}
        <FeaturedSection
          title="Fresh New Arrivals"
          subtitle="Latest model releases updated September 2026"
          products={newArrivals}
          viewAllLink="/mobiles?tag=New Arrival"
          badgeText="Just In"
        />

        {/* 6. Redmi & Xiaomi */}
        <FeaturedSection
          title="Redmi & Xiaomi Series"
          subtitle="Unbeatable value, powerful Leica cameras and 120Hz CrystalRes displays"
          products={redmiProducts}
          viewAllLink="/brand/redmi-xiaomi"
          badgeText="Redmi / Xiaomi"
        />

        {/* 7. Infinix Series */}
        <FeaturedSection
          title="Infinix Hot, Note & GT Series"
          subtitle="Be Hot. Be Different. Lightning fast charging and high endurance batteries"
          products={infinixProducts}
          viewAllLink="/brand/infinix"
          badgeText="Infinix Official"
        />

        {/* 8. Tecno Series */}
        <FeaturedSection
          title="Tecno Camon & Spark Series"
          subtitle="Zoom In. Snap Joy. Sony LYT-700C night cameras and curved AMOLED screens"
          products={tecnoProducts}
          viewAllLink="/brand/tecno"
          badgeText="Tecno Official"
        />

        {/* 9. Nubia & ZTE */}
        <FeaturedSection
          title="Nubia & ZTE Power"
          subtitle="Super Durable, Super Smart. Massive extended RAM and gaming cooling"
          products={nubiaProducts}
          viewAllLink="/brand/nubia-zte"
          badgeText="Nubia / ZTE"
        />

        {/* 10. Shop by Price Budget Grid */}
        <ShopByPrice />

        {/* 11. Trust Badges Row */}
        <TrustBadges />

        {/* 12. Cantt Saddar Store Location Section */}
        <StoreLocationSection />
      </div>
    </>
  );
};
