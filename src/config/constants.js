export const DEFAULT_SETTINGS = {
  storeName: "IMC Mobile Bank",
  tagline: "The Name of Trust",
  contactPerson: "Farhan Memon",
  whatsappNumber: "03332621231",
  whatsappInternational: "923332621231",
  phone: "03332621231",
  email: "imcmobilebank@gmail.com",
  website: "www.imcmobilebank.pk",
  address: "Shop # 9/10, Shifa Paradise, near Belair Hospital, opposite Kachailo Bungalow, near Mr Wari Chat, Cantt Saddar, Hyderabad",
  city: "Hyderabad",
  province: "Sindh",
  googleMapsUrl: "https://maps.google.com/?q=Cantt+Saddar+Hyderabad+Shifa+Paradise",
  announcementBar: "⚡ 100% Genuine PTA Approved Mobile Phones | Same Day Store Pickup & Courier Across Pakistan | WhatsApp Order: 0333-2621231",
  priceUpdatedNotice: "Prices updated: September 2026. Prices may change, confirm on WhatsApp.",
  logoUrl: "/images/imc-logo.jpg",
  storeExteriorImage: "/images/imc-store-exterior.jpg",
  storeCrowdImage: "/images/imc-store-crowd.jpg",
  socials: {
    tiktok: "https://tiktok.com/@imcmobilebank",
    facebook: "https://www.facebook.com/IMCMOBILEBANK",
    youtube: "https://www.youtube.com/@imcmobilebank",
    instagram: "https://www.instagram.com/imcmobilebank",
  },
  whatsappTemplate: `Hello IMC Mobile Bank, I want to order:
Product: {product}
Variant: {variant}
Price: {price}
Quantity: {quantity}
Link: {url}

Customer Details:
Name: {name}
Phone: {phone}
City/Address: {city_address}`,
  cartWhatsappTemplate: `Hello IMC Mobile Bank, I would like to place an order for the following items:

{items}

Total Order Amount: {total}

Customer Details:
Name: {name}
Phone: {phone}
City/Address: {city_address}`,
  trustBadges: [
    {
      title: "100% Genuine & PTA Approved",
      desc: "All devices are authentic box-pack with official brand warranty & PTA approval."
    },
    {
      title: "Direct WhatsApp Order",
      desc: "Instant human response & price confirmation directly from Farhan Memon."
    },
    {
      title: "Physical Walk-In Store",
      desc: "Visit our outlet at Shifa Paradise, Cantt Saddar, Hyderabad."
    },
    {
      title: "Best Market Rate",
      desc: "Direct distributor rates without retail markup or hidden costs."
    }
  ],
  seo: {
    metaTitle: "IMC Mobile Bank - Official Samsung, Xiaomi, Infinix & Tecno Mobiles in Hyderabad",
    metaDescription: "Buy 100% genuine PTA approved smartphones at wholesale rates in Hyderabad, Pakistan. Samsung, Redmi, Infinix, Tecno, Nubia. Order directly via WhatsApp 03332621231."
  }
};

export const INITIAL_BRANDS_LIST = [
  { id: "samsung", name: "Samsung", slug: "samsung", order: 1, isLocked: true, logo: "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$" },
  { id: "redmi-xiaomi", name: "Redmi / Xiaomi", slug: "redmi-xiaomi", order: 2, isLocked: false, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/200px-Xiaomi_logo.svg.png" },
  { id: "infinix", name: "Infinix", slug: "infinix", order: 3, isLocked: false, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Infinix_Mobility_Logo.svg/200px-Infinix_Mobility_Logo.svg.png" },
  { id: "tecno", name: "Tecno", slug: "tecno", order: 4, isLocked: false, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tecno_Mobile_logo.svg/200px-Tecno_Mobile_logo.svg.png" },
  { id: "nubia-zte", name: "Nubia / ZTE", slug: "nubia-zte", order: 5, isLocked: false, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/ZTE_2019_logo.svg/200px-ZTE_2019_logo.svg.png" }
];

export const PRICE_RANGES = [
  { id: "under-30k", label: "Under Rs. 30,000", min: 0, max: 30000 },
  { id: "30k-50k", label: "Rs. 30,000 - 50,000", min: 30000, max: 50000 },
  { id: "50k-100k", label: "Rs. 50,000 - 100,000", min: 50000, max: 100000 },
  { id: "above-100k", label: "Above Rs. 100,000", min: 100000, max: 2000000 }
];

export const formatPKR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rs. 0";
  return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
};
