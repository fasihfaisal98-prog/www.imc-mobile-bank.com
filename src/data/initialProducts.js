export const INITIAL_PRODUCTS = [
  // ==========================================
  // SAMSUNG (Listed First as required)
  // ==========================================
  {
    id: "samsung-galaxy-a27-5g",
    name: "Samsung Galaxy A27 5G",
    slug: "samsung-galaxy-a27-5g",
    brandId: "samsung",
    brandName: "Samsung",
    price: 119999,
    oldPrice: 129999,
    dealerPrice: 112000,
    inStock: true,
    sortOrder: 1,
    tags: ["Featured", "Best Seller", "New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 119999, oldPrice: 129999, inStock: true }
    ],
    colors: [
      { name: "Awesome Navy", hex: "#1e293b" },
      { name: "Awesome Iceblue", hex: "#93c5fd" },
      { name: "Awesome Lilac", hex: "#c084fc" }
    ],
    specs: {
      display: "6.7\" Super AMOLED 120Hz FHD+",
      battery: "5000mAh with 25W Super Fast Charging",
      mainCamera: "50MP (OIS) + 5MP Ultra-Wide + 2MP Macro",
      selfieCamera: "13MP HDR Camera",
      chipset: "Exynos 1480 Octa-Core 4nm",
      network: "5G Supported (Dual SIM)"
    },
    highlights: [
      "Official Samsung PTA Approved with 1-Year Brand Warranty",
      "Vibrant 6.7-inch Super AMOLED 120Hz Display",
      "50MP Triple Camera System with Optical Image Stabilization (OIS)",
      "Long-lasting 5000mAh Battery with 25W Fast Charging",
      "Sleek contemporary design with IP67 Water and Dust Resistance"
    ],
    description: "The Samsung Galaxy A27 5G combines premium Samsung flagship aesthetics with dependable all-day performance. Engineered for speed, clear night photography, and immersive 120Hz viewing, it is the premier choice for modern smartphone users in Pakistan."
  },
  {
    id: "samsung-galaxy-a07",
    name: "Samsung Galaxy A07",
    slug: "samsung-galaxy-a07",
    brandId: "samsung",
    brandName: "Samsung",
    price: 42999,
    oldPrice: 45999,
    dealerPrice: 39500,
    inStock: true,
    sortOrder: 2,
    tags: ["Best Seller"],
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", price: 42999, oldPrice: 45999, inStock: true },
      { id: "v2", ram: "4GB", storage: "128GB", price: 52500, oldPrice: 55999, inStock: true },
      { id: "v3", ram: "6GB", storage: "128GB", price: 62500, oldPrice: 66999, inStock: true }
    ],
    colors: [
      { name: "Black", hex: "#111827" },
      { name: "Silver", hex: "#e2e8f0" },
      { name: "Light Green", hex: "#86efac" }
    ],
    specs: {
      display: "6.7\" PLS LCD 90Hz",
      battery: "5000mAh 25W Fast Charge",
      mainCamera: "50MP Dual Camera (50MP + 2MP)",
      selfieCamera: "8MP Front Camera",
      chipset: "MediaTek Helio G85",
      network: "4G LTE Dual SIM"
    },
    highlights: [
      "Large 6.7\" 90Hz immersive display",
      "50MP high-resolution camera",
      "5000mAh all-day battery",
      "Official Samsung Pakistan Warranty"
    ],
    description: "Samsung Galaxy A07 brings reliable Samsung quality at an accessible price point with expansive 6.7-inch display and crisp 50MP photography."
  },
  {
    id: "samsung-galaxy-a17",
    name: "Samsung Galaxy A17",
    slug: "samsung-galaxy-a17",
    brandId: "samsung",
    brandName: "Samsung",
    price: 72999,
    oldPrice: 77999,
    dealerPrice: 68000,
    inStock: true,
    sortOrder: 3,
    tags: ["New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB", price: 72999, oldPrice: 77999, inStock: true },
      { id: "v2", ram: "8GB", storage: "256GB", price: 94999, oldPrice: 99999, inStock: true }
    ],
    colors: [
      { name: "Blue Black", hex: "#0f172a" },
      { name: "Light Blue", hex: "#7dd3fc" },
      { name: "Yellow", hex: "#fde047" }
    ],
    specs: {
      display: "6.7\" Super AMOLED 90Hz",
      battery: "5000mAh Fast Charging",
      mainCamera: "50MP + 5MP Ultra-Wide + 2MP",
      selfieCamera: "13MP",
      chipset: "MediaTek Helio G99",
      network: "4G LTE"
    },
    highlights: ["Super AMOLED vivid screen", "50MP Triple Camera", "Up to 8GB RAM + 256GB storage"],
    description: "Experience Super AMOLED richness with Samsung Galaxy A17, perfect for multitasking and streaming on the go."
  },
  {
    id: "samsung-galaxy-a17-5g",
    name: "Samsung Galaxy A17 5G",
    slug: "samsung-galaxy-a17-5g",
    brandId: "samsung",
    brandName: "Samsung",
    price: 99999,
    oldPrice: 105999,
    dealerPrice: 93500,
    inStock: true,
    sortOrder: 4,
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 99999, oldPrice: 105999, inStock: true }
    ],
    colors: [
      { name: "Black", hex: "#1e293b" },
      { name: "Silver", hex: "#cbd5e1" }
    ],
    specs: {
      display: "6.7\" Super AMOLED 120Hz",
      battery: "5000mAh",
      mainCamera: "50MP + 5MP + 2MP",
      selfieCamera: "13MP",
      chipset: "Exynos 1330 5G",
      network: "5G High Speed"
    },
    highlights: ["Ultra-fast 5G connectivity", "Smooth 120Hz Super AMOLED", "50MP Triple Camera"],
    description: "Future-proof mobile performance with Samsung Galaxy A17 5G."
  },
  {
    id: "samsung-galaxy-a26-5g",
    name: "Samsung Galaxy A26 5G",
    slug: "samsung-galaxy-a26-5g",
    brandId: "samsung",
    brandName: "Samsung",
    price: 94999,
    oldPrice: 99999,
    dealerPrice: 88000,
    inStock: true,
    sortOrder: 5,
    tags: ["Best Seller"],
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 94999, oldPrice: 99999, inStock: true }
    ],
    colors: [
      { name: "Graphite", hex: "#334155" },
      { name: "Lime", hex: "#a3e635" }
    ],
    specs: {
      display: "6.7\" FHD+ AMOLED 120Hz",
      battery: "5000mAh 25W",
      mainCamera: "50MP (OIS) + 8MP + 2MP",
      selfieCamera: "13MP",
      chipset: "Exynos 1380",
      network: "5G Dual SIM"
    },
    highlights: ["50MP OIS Camera", "120Hz AMOLED Screen", "256GB Built-in Storage"],
    description: "Samsung Galaxy A26 5G delivers sharp photography and ultra-responsive browsing in a streamlined chassis."
  },
  {
    id: "samsung-galaxy-a37-5g",
    name: "Samsung Galaxy A37 5G",
    slug: "samsung-galaxy-a37-5g",
    brandId: "samsung",
    brandName: "Samsung",
    price: 149999,
    oldPrice: 159999,
    dealerPrice: 139000,
    inStock: true,
    sortOrder: 6,
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 149999, oldPrice: 159999, inStock: true }
    ],
    colors: [
      { name: "Awesome Lilac", hex: "#d8b4fe" },
      { name: "Awesome Navy", hex: "#0f172a" },
      { name: "Awesome Lemon", hex: "#fef08a" }
    ],
    specs: {
      display: "6.7\" Super AMOLED 120Hz Vision Booster",
      battery: "5000mAh 25W",
      mainCamera: "50MP (OIS) + 8MP + 5MP",
      selfieCamera: "13MP",
      chipset: "Dimensity 7200 / Exynos",
      network: "5G"
    },
    highlights: ["Vision Booster Technology", "50MP Triple OIS Camera", "IP67 Water Resistance"],
    description: "The Galaxy A37 5G elevates your multimedia experience with stunning display brightness and premium IP67 build."
  },
  {
    id: "samsung-galaxy-a57-5g",
    name: "Samsung Galaxy A57 5G",
    slug: "samsung-galaxy-a57-5g",
    brandId: "samsung",
    brandName: "Samsung",
    price: 166999,
    oldPrice: 179999,
    dealerPrice: 155000,
    inStock: true,
    sortOrder: 7,
    tags: ["Featured", "Best Seller"],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 166999, oldPrice: 179999, inStock: true },
      { id: "v2", ram: "12GB", storage: "256GB", price: 184999, oldPrice: 199999, inStock: true },
      { id: "v3", ram: "12GB", storage: "512GB", price: 224999, oldPrice: 239999, inStock: true }
    ],
    colors: [
      { name: "Awesome Iceblue", hex: "#bae6fd" },
      { name: "Awesome Navy", hex: "#1e1b4b" }
    ],
    specs: {
      display: "6.7\" Super AMOLED 120Hz Gorilla Glass Victus+",
      battery: "5000mAh 25W Super Fast",
      mainCamera: "50MP (OIS) + 12MP Ultra-Wide + 5MP Macro",
      selfieCamera: "32MP High-Res Front",
      chipset: "Exynos 1480 4nm AMD RDNA2 GPU",
      network: "5G Dual SIM"
    },
    highlights: ["Metal Frame with Gorilla Glass Victus+", "Flagship 50MP Sony Sensor with OIS", "Up to 512GB Storage & 12GB RAM"],
    description: "Samsung's top tier A-series flagship. Aluminum build, studio grade cameras, and 4 years of Android OS upgrades."
  },
  {
    id: "samsung-galaxy-s25-fe",
    name: "Samsung Galaxy S25 FE",
    slug: "samsung-galaxy-s25-fe",
    brandId: "samsung",
    brandName: "Samsung",
    price: 219999,
    oldPrice: 235000,
    dealerPrice: 205000,
    inStock: true,
    sortOrder: 8,
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 219999, oldPrice: 235000, inStock: true },
      { id: "v2", ram: "8GB", storage: "512GB", price: 254999, oldPrice: 269999, inStock: true }
    ],
    colors: [
      { name: "Blue", hex: "#3b82f6" },
      { name: "Mint", hex: "#6ee7b7" },
      { name: "Graphite", hex: "#1f2937" }
    ],
    specs: {
      display: "6.7\" Dynamic AMOLED 2X 120Hz LTPO",
      battery: "4900mAh 45W Fast Charge",
      mainCamera: "50MP OIS + 12MP Ultra-Wide + 8MP 3X Telephoto",
      selfieCamera: "10MP Dual Pixel",
      chipset: "Exynos 2400e / Snapdragon 8 Gen 3 Flagship",
      network: "5G High Speed"
    },
    highlights: ["Galaxy AI Integration", "3X Optical Telephoto Zoom", "Armor Aluminum Frame"],
    description: "Fan Edition perfection. Galaxy AI, Pro-grade triple camera with telephoto zoom, and seamless Galaxy ecosystem."
  },
  {
    id: "samsung-galaxy-s26",
    name: "Samsung Galaxy S26",
    slug: "samsung-galaxy-s26",
    brandId: "samsung",
    brandName: "Samsung",
    price: 319999,
    oldPrice: 339999,
    dealerPrice: 298000,
    inStock: true,
    sortOrder: 9,
    tags: ["New Arrival", "Featured"],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 319999, oldPrice: 339999, inStock: true },
      { id: "v2", ram: "12GB", storage: "512GB", price: 379999, oldPrice: 399999, inStock: true }
    ],
    colors: [
      { name: "Onyx Black", hex: "#0f172a" },
      { name: "Marble Gray", hex: "#94a3b8" },
      { name: "Cobalt Violet", hex: "#7c3aed" }
    ],
    specs: {
      display: "6.3\" Dynamic AMOLED 2X 1-120Hz 2600 nits",
      battery: "4300mAh Super Fast Charge",
      mainCamera: "50MP Dual Pixel OIS + 10MP 3X Tele + 12MP Ultra",
      selfieCamera: "12MP Dual Pixel AF",
      chipset: "Snapdragon 8 Gen 4 / Exynos 2500 Flagship",
      network: "5G Advanced"
    },
    highlights: ["Next-Gen Galaxy AI 2.0", "Compact 6.3\" Ergonomic Flagship", "Armor Aluminum & Gorilla Glass Armor"],
    description: "Compact flagship excellence with supreme Galaxy AI, groundbreaking camera sensors, and blazing Snapdragon speed."
  },
  {
    id: "samsung-galaxy-s26-plus",
    name: "Samsung Galaxy S26+",
    slug: "samsung-galaxy-s26-plus",
    brandId: "samsung",
    brandName: "Samsung",
    price: 384999,
    oldPrice: 405000,
    dealerPrice: 360000,
    inStock: true,
    sortOrder: 10,
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 384999, oldPrice: 405000, inStock: true },
      { id: "v2", ram: "12GB", storage: "512GB", price: 444999, oldPrice: 465000, inStock: true }
    ],
    colors: [
      { name: "Onyx Black", hex: "#0f172a" },
      { name: "Amber Yellow", hex: "#f59e0b" }
    ],
    specs: {
      display: "6.7\" QHD+ Dynamic AMOLED 2X 1-120Hz",
      battery: "4900mAh 45W Charging",
      mainCamera: "50MP Dual Pixel OIS + 10MP Tele + 12MP Ultra",
      selfieCamera: "12MP Dual Pixel AF",
      chipset: "Snapdragon 8 Gen 4 / Exynos 2500",
      network: "5G Advanced"
    },
    highlights: ["Quad HD+ razor-sharp resolution", "45W Fast Charging support", "Galaxy AI suite"],
    description: "Bigger canvas, razor-sharp QHD+ visuals, and substantial battery capacity for demanding mobile pros."
  },
  {
    id: "samsung-galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    slug: "samsung-galaxy-s26-ultra",
    brandId: "samsung",
    brandName: "Samsung",
    price: 449999,
    oldPrice: 475000,
    dealerPrice: 420000,
    inStock: true,
    sortOrder: 11,
    tags: ["Featured", "Best Seller", "New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 449999, oldPrice: 475000, inStock: true },
      { id: "v2", ram: "12GB", storage: "512GB", price: 519999, oldPrice: 549999, inStock: true },
      { id: "v3", ram: "16GB", storage: "1TB", price: 609999, oldPrice: 639999, inStock: true }
    ],
    colors: [
      { name: "Titanium Gray", hex: "#64748b" },
      { name: "Titanium Black", hex: "#0f172a" },
      { name: "Titanium Violet", hex: "#6b21a8" }
    ],
    specs: {
      display: "6.9\" Dynamic AMOLED 2X Anti-Reflective 1-120Hz 3000 nits",
      battery: "5000mAh 45W 2.0 Fast Charge",
      mainCamera: "200MP Main + 10MP 3X Tele + 50MP 5X Tele OIS",
      selfieCamera: "12MP Front with AI Portrait",
      chipset: "Snapdragon 8 Gen 4 for Galaxy (3nm)",
      network: "5G Dual SIM & eSIM"
    },
    highlights: [
      "Built-in S-Pen Stylus",
      "200MP Ultra Pro Camera with 100X Space Zoom",
      "Titanium Frame with Corning Gorilla Armor anti-glare",
      "Galaxy AI Live Translate, Circle to Search & Photo Assist"
    ],
    description: "The pinnacle of mobile engineering. Built with aerospace-grade titanium, integrated S Pen, unmatched 200MP quad zoom, and industry-leading Galaxy AI."
  },

  // ==========================================
  // REDMI / XIAOMI
  // ==========================================
  {
    id: "redmi-a5",
    name: "Redmi A5",
    slug: "redmi-a5",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 30999,
    oldPrice: 33999,
    dealerPrice: 28500,
    inStock: true,
    sortOrder: 12,
    tags: ["Best Seller"],
    images: ["blob:https://gemini.google.com/fcdc3964-71d1-4087-a141-bd23c119def2"],
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", price: 30999, oldPrice: 33999, inStock: true },
      { id: "v2", ram: "4GB", storage: "128GB", price: 33999, oldPrice: 36999, inStock: true }
    ],
    colors: [{ name: "Midnight Black", hex: "#111827" }, { name: "Ocean Blue", hex: "#0284c7" }],
    specs: {
      display: "6.88\" 120Hz Eye-Care Display",
      battery: "5200mAh 18W Fast Charging",
      mainCamera: "32MP Dual AI Camera + QVGA",
      selfieCamera: "8MP Front AI",
      chipset: "Octa-core 2.0GHz Processor",
      network: "4G LTE Dual SIM"
    },
    highlights: ["Immense 6.88\" Smooth 120Hz screen", "5200mAh high capacity battery", "Sleek glass-feel back"],
    description: "Redmi A5 delivers unparalleled value with high refresh rate, generous battery life, and crisp 32MP dual camera."
  },
  {
    id: "redmi-a7-pro",
    name: "Redmi A7 Pro",
    slug: "redmi-a7-pro",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 38999,
    oldPrice: 41999,
    dealerPrice: 35500,
    inStock: true,
    sortOrder: 13,
    tags: ["New Arrival"],
    images: ["blob:https://gemini.google.com/d857fd7c-fca8-4d7f-a253-7af333954b66"],
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", price: 38999, oldPrice: 41999, inStock: true },
      { id: "v2", ram: "4GB", storage: "128GB", price: 44999, oldPrice: 47999, inStock: true }
    ],
    colors: [{ name: "Forest Green", hex: "#15803d" }, { name: "Graphite Gray", hex: "#374151" }],
    specs: {
      display: "6.9\" HD+ 90Hz Display",
      battery: "6000mAh Massive Battery",
      mainCamera: "13MP + Auxiliary Lens",
      selfieCamera: "8MP Front Camera",
      chipset: "Unisoc T606 / Helio Octa-core",
      network: "4G LTE"
    },
    highlights: ["Huge 6000mAh 2-day battery", "Generous 6.9\" Cinema screen", "Side fingerprint scanner"],
    description: "Built for endurance with a massive 6000mAh battery and vast 6.9\" display."
  },
  {
    id: "redmi-15c",
    name: "Redmi 15C",
    slug: "redmi-15c",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 46999,
    oldPrice: 49999,
    dealerPrice: 43000,
    inStock: true,
    sortOrder: 14,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "4GB", storage: "128GB", price: 46999, oldPrice: 49999, inStock: true },
      { id: "v2", ram: "6GB", storage: "128GB", price: 49999, oldPrice: 53999, inStock: true }
    ],
    colors: [{ name: "Mint Green", hex: "#6ee7b7" }, { name: "Midnight Black", hex: "#111827" }],
    specs: {
      display: "6.9\" 120Hz Dot Drop Screen",
      battery: "6000mAh 18W",
      mainCamera: "50MP AI Main + QVGA",
      selfieCamera: "8MP",
      chipset: "MediaTek Helio G81-Ultra",
      network: "4G LTE"
    },
    highlights: ["50MP AI Ultra-Clear Camera", "6000mAh Long-lasting Cell", "Up to 6GB RAM + Virtual Expansion"],
    description: "Redmi 15C combines Helio G81-Ultra processing power with a huge 6000mAh battery and sharp 50MP optics."
  },
  {
    id: "redmi-15",
    name: "Redmi 15",
    slug: "redmi-15",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 58999,
    oldPrice: 62999,
    dealerPrice: 54000,
    inStock: true,
    sortOrder: 15,
    tags: ["Featured"],
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", price: 58999, oldPrice: 62999, inStock: true }
    ],
    colors: [{ name: "Sandy Gold", hex: "#fde047" }, { name: "Moonlight Blue", hex: "#38bdf8" }],
    specs: {
      display: "6.9\" FHD+ 120Hz AdaptiveSync",
      battery: "7000mAh Monster Battery 33W Fast Charging",
      mainCamera: "50MP AI Main + QVGA",
      selfieCamera: "8MP HD Front",
      chipset: "Snapdragon 680 / Helio G91-Ultra",
      network: "4G LTE"
    },
    highlights: ["Phenomenal 7000mAh Battery", "33W Turbo Charging", "8GB RAM + 128GB ROM"],
    description: "With its massive 7000mAh battery and 33W charging, Redmi 15 powers through 3 days on a single charge."
  },
  {
    id: "redmi-note-14",
    name: "Redmi Note 14",
    slug: "redmi-note-14",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 57999,
    oldPrice: 62999,
    dealerPrice: 53500,
    inStock: true,
    sortOrder: 16,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", price: 57999, oldPrice: 62999, inStock: true },
      { id: "v2", ram: "8GB", storage: "256GB", price: 61999, oldPrice: 66999, inStock: true }
    ],
    colors: [{ name: "Glacier Blue", hex: "#38bdf8" }, { name: "Onyx Black", hex: "#0f172a" }],
    specs: {
      display: "6.67\" FHD+ AMOLED 120Hz 1800 nits",
      battery: "5500mAh 33W Fast Charging",
      mainCamera: "108MP Main + 2MP Macro + 2MP Depth",
      selfieCamera: "20MP High Res",
      chipset: "Helio G99-Ultra Octa-Core",
      network: "4G Dual SIM"
    },
    highlights: ["108MP Ultra-Clear Triple Camera", "120Hz FHD+ AMOLED Display", "In-screen fingerprint sensor"],
    description: "The fan-favorite Redmi Note 14 features an outstanding 108MP camera and vivid AMOLED panel."
  },
  {
    id: "redmi-note-14-pro",
    name: "Redmi Note 14 Pro",
    slug: "redmi-note-14-pro",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 85999,
    oldPrice: 91999,
    dealerPrice: 79000,
    inStock: true,
    sortOrder: 17,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 85999, oldPrice: 91999, inStock: true },
      { id: "v2", ram: "12GB", storage: "512GB", price: 100999, oldPrice: 107999, inStock: true }
    ],
    colors: [{ name: "Titan Black", hex: "#0f172a" }, { name: "Lavender Purple", hex: "#c084fc" }],
    specs: {
      display: "6.67\" 1.5K 120Hz Curved AMOLED Gorilla Glass Victus 2",
      battery: "5500mAh 45W / 67W Turbo Charge",
      mainCamera: "200MP OIS Flagship + 8MP Ultra-Wide + 2MP Macro",
      selfieCamera: "32MP Selfie Camera",
      chipset: "MediaTek Dimensity / Helio G100-Ultra",
      network: "4G LTE"
    },
    highlights: ["200MP OIS Flagship Grade Camera", "1.5K 120Hz Curved AMOLED", "IP68 Dust & Water Protection"],
    description: "Redmi Note 14 Pro brings genuine flagship 200MP camera technology and curved AMOLED elegance to the mid-range."
  },
  {
    id: "redmi-note-15",
    name: "Redmi Note 15",
    slug: "redmi-note-15",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 75999,
    oldPrice: 81999,
    dealerPrice: 70000,
    inStock: true,
    sortOrder: 18,
    tags: ["New Arrival"],
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", price: 75999, oldPrice: 81999, inStock: true },
      { id: "v2", ram: "8GB", storage: "256GB", price: 80999, oldPrice: 86999, inStock: true }
    ],
    colors: [{ name: "Frost White", hex: "#f8fafc" }, { name: "Graphite", hex: "#1e293b" }],
    specs: {
      display: "6.77\" AMOLED 120Hz FHD+",
      battery: "6000mAh 33W Fast Charge",
      mainCamera: "108MP Main + 2MP Depth",
      selfieCamera: "20MP Front",
      chipset: "Snapdragon 685 / G99-Max",
      network: "4G LTE"
    },
    highlights: ["Vast 6.77\" 120Hz AMOLED", "6000mAh High-Density Battery", "108MP Ultra Clarity"],
    description: "Latest generation Redmi Note 15 with bigger 6.77-inch AMOLED screen and 6000mAh battery."
  },
  {
    id: "redmi-note-15-pro",
    name: "Redmi Note 15 Pro",
    slug: "redmi-note-15-pro",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 100999,
    oldPrice: 108999,
    dealerPrice: 93000,
    inStock: true,
    sortOrder: 19,
    tags: ["Featured", "New Arrival"],
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 100999, oldPrice: 108999, inStock: true },
      { id: "v2", ram: "12GB", storage: "512GB", price: 120999, oldPrice: 129999, inStock: true }
    ],
    colors: [{ name: "Emerald Green", hex: "#065f46" }, { name: "Obsidian Black", hex: "#0f172a" }],
    specs: {
      display: "6.77\" 1.5K AMOLED 120Hz Dolby Vision",
      battery: "6500mAh 67W Turbo Charge",
      mainCamera: "200MP OIS Sony / Samsung Sensor + 8MP",
      selfieCamera: "32MP Selfie Master",
      chipset: "Dimensity 7300-Ultra",
      network: "4G LTE"
    },
    highlights: ["200MP OIS Camera with 4X In-Sensor Zoom", "Huge 6500mAh 67W Battery", "1.5K CrystalRes Screen"],
    description: "High performance redefined with 6500mAh battery, 67W turbocharging, and flagship 200MP OIS optics."
  },
  {
    id: "redmi-note-15-pro-plus-5g",
    name: "Redmi Note 15 Pro+ 5G",
    slug: "redmi-note-15-pro-plus-5g",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 174999,
    oldPrice: 189999,
    dealerPrice: 162000,
    inStock: true,
    sortOrder: 20,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "512GB", price: 174999, oldPrice: 189999, inStock: true }
    ],
    colors: [{ name: "Titanium Silver", hex: "#94a3b8" }, { name: "Midnight Black", hex: "#020617" }],
    specs: {
      display: "6.83\" 1.5K Curved AMOLED 120Hz 3000 nits",
      battery: "6500mAh 90W HyperCharge",
      mainCamera: "200MP Flagship OIS + 8MP Ultra-Wide",
      selfieCamera: "32MP 4K Selfie",
      chipset: "Snapdragon 7s Gen 3 5G (4nm)",
      network: "5G Dual SIM"
    },
    highlights: ["90W HyperCharge (0-100% in 25 mins)", "Flagship 200MP OIS Sensor", "IP69 Water Resistance"],
    description: "Redmi's ultimate powerhouse with 90W HyperCharge, IP69 rating, and Snapdragon 7s Gen 3 processor."
  },
  {
    id: "xiaomi-17t",
    name: "Xiaomi 17T",
    slug: "xiaomi-17t",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 239999,
    oldPrice: 254999,
    dealerPrice: 222000,
    inStock: true,
    sortOrder: 21,
    tags: ["Featured"],
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "512GB", price: 239999, oldPrice: 254999, inStock: true }
    ],
    colors: [{ name: "Titan Black", hex: "#0f172a" }, { name: "Titan Blue", hex: "#1e3a8a" }],
    specs: {
      display: "6.59\" 144Hz CrystalRes AMOLED",
      battery: "6500mAh 67W HyperCharge",
      mainCamera: "50MP Leica Main OIS + 50MP Leica Telephoto + 12MP Leica Ultra",
      selfieCamera: "32MP Leica Selfie",
      chipset: "MediaTek Dimensity 8400-Ultra (4nm)",
      network: "5G Dual SIM"
    },
    highlights: ["Leica Professional Optical Lenses", "Triple 50MP Camera System", "144Hz AI CrystalRes Display"],
    description: "Xiaomi 17T with Leica professional optics delivers authentic photographic art and top-tier Dimensity 8400 performance."
  },
  {
    id: "xiaomi-17t-pro",
    name: "Xiaomi 17T Pro",
    slug: "xiaomi-17t-pro",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 289999,
    oldPrice: 309999,
    dealerPrice: 268000,
    inStock: true,
    sortOrder: 22,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "512GB", price: 289999, oldPrice: 309999, inStock: true }
    ],
    colors: [{ name: "Titan Gray", hex: "#475569" }, { name: "Titan Black", hex: "#020617" }],
    specs: {
      display: "6.83\" 144Hz WQHD+ AMOLED 4000 nits",
      battery: "7000mAh 120W HyperCharge",
      mainCamera: "50MP Light Fusion 900 Leica OIS + 50MP Leica Tele + 12MP Ultra",
      selfieCamera: "32MP Leica Front",
      chipset: "MediaTek Dimensity 9400 Flagship (3nm)",
      network: "5G High Speed"
    },
    highlights: ["120W HyperCharge with 7000mAh battery", "Leica Summilux Lens", "Dimensity 9400 flagship 3nm chip"],
    description: "Flagship marvel featuring Leica Summilux lens, 7000mAh battery, and supersonic 120W HyperCharge."
  },
  {
    id: "xiaomi-17",
    name: "Xiaomi 17",
    slug: "xiaomi-17",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 329999,
    oldPrice: 349999,
    dealerPrice: 306000,
    inStock: true,
    sortOrder: 23,
    tags: ["New Arrival"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "512GB", price: 329999, oldPrice: 349999, inStock: true }
    ],
    colors: [{ name: "Black", hex: "#0f172a" }, { name: "White", hex: "#f8fafc" }, { name: "Jade Green", hex: "#166534" }],
    specs: {
      display: "6.3\" 1-120Hz LTPO AMOLED ultra-slim bezel",
      battery: "6330mAh 90W wired + 50W wireless",
      mainCamera: "50MP Light Fusion 900 Leica + 50MP Leica Floating Tele + 50MP Ultra",
      selfieCamera: "50MP Leica Selfie",
      chipset: "Snapdragon 8 Gen 4 (3nm)",
      network: "5G Dual SIM"
    },
    highlights: ["Triple 50MP Leica Pro camera setup", "Compact 6.3\" golden hand size", "Snapdragon 8 Gen 4 processor"],
    description: "Compact flagship perfection with 50MP floating telephoto macro lens and Snapdragon 8 Gen 4 engine."
  },
  {
    id: "xiaomi-17-ultra",
    name: "Xiaomi 17 Ultra",
    slug: "xiaomi-17-ultra",
    brandId: "redmi-xiaomi",
    brandName: "Redmi / Xiaomi",
    price: 479999,
    oldPrice: 509999,
    dealerPrice: 445000,
    inStock: true,
    sortOrder: 24,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "16GB", storage: "512GB", price: 479999, oldPrice: 509999, inStock: true }
    ],
    colors: [{ name: "Pure Titanium", hex: "#475569" }, { name: "Ceramic White", hex: "#ffffff" }],
    specs: {
      display: "6.9\" WQHD+ 120Hz LTPO AMOLED Xiaomi Shield Glass",
      battery: "6000mAh 90W wired + 80W wireless",
      mainCamera: "50MP 1-inch Sony LYT-900 Leica + 200MP Periscope Tele + 50MP Tele + 50MP Ultra",
      selfieCamera: "50MP Leica 4K60",
      chipset: "Snapdragon 8 Gen 4 (3nm)",
      network: "5G High Speed"
    },
    highlights: ["1-inch Sony LYT-900 Sensor with Stepless Variable Aperture", "200MP Periscope Telephoto Zoom", "Professional Leica Photography Kit compatible"],
    description: "The ultimate photographic smartphone. 1-inch main sensor, revolutionary 200MP periscope zoom, and titanium craftsmanship."
  },

  // ==========================================
  // INFINIX
  // ==========================================
  {
    id: "infinix-hot-70-pro-5g",
    name: "Infinix Hot 70 Pro 5G (X6896)",
    slug: "infinix-hot-70-pro-5g",
    brandId: "infinix",
    brandName: "Infinix",
    price: 86999,
    oldPrice: 92999,
    dealerPrice: 80500,
    inStock: true,
    sortOrder: 25,
    tags: ["Featured", "Best Seller", "New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", price: 86999, oldPrice: 92999, inStock: true }
    ],
    colors: [
      { name: "Dynamic Pearl White", hex: "#f1f5f9" },
      { name: "Eclipse Black", hex: "#09090b" },
      { name: "Aurora Green", hex: "#10b981" }
    ],
    specs: {
      display: "6.78\" 120Hz 3D Curved AMOLED",
      battery: "6000mAh with 45W Lightning FastCharge",
      mainCamera: "108MP OIS Ultra-Clear Main + 2MP Depth + AI",
      selfieCamera: "32MP Dual Flash Selfie",
      chipset: "Dimensity 7020 5G Octa-Core",
      network: "5G Dual SIM"
    },
    highlights: [
      "Tagline: \"Be Hot. Be Different.\"",
      "45W Lightning FastCharge & 6000mAh Massive Battery",
      "Dynamic Shine Design with Pearl-Smooth Finish",
      "Dust and Water Resistant with XOS Smooth Upgrades",
      "PTA Approved with 1-Year Official Carlcare Warranty"
    ],
    description: "Be Hot. Be Different. The Infinix Hot 70 Pro 5G features 45W Lightning FastCharge, colossal 6000mAh battery, dynamic pearl-smooth finish, and crystal 108MP optics."
  },
  {
    id: "infinix-hot-70",
    name: "Infinix Hot 70 (X6895B)",
    slug: "infinix-hot-70",
    brandId: "infinix",
    brandName: "Infinix",
    price: 64999,
    oldPrice: 69999,
    dealerPrice: 60000,
    inStock: true,
    sortOrder: 26,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB", price: 64999, oldPrice: 69999, inStock: true }
    ],
    colors: [{ name: "Pearl White", hex: "#f8fafc" }, { name: "Titanium Gray", hex: "#334155" }],
    specs: {
      display: "6.78\" 120Hz FHD+ Punch-Hole Screen",
      battery: "6000mAh with 45W Fast Charge",
      mainCamera: "50MP AI Dual Camera",
      selfieCamera: "16MP Front Camera",
      chipset: "Helio G100 Ultimate",
      network: "4G LTE"
    },
    highlights: [
      "45W Lightning FastCharge & 6000mAh battery",
      "Dynamic Shine Design with Pearl-Smooth Finish",
      "XOS 14 with guaranteed smoothness upgrades"
    ],
    description: "The Hot 70 brings flagship-grade 45W fast charging, 6000mAh battery, and shimmering pearl aesthetics."
  },
  {
    id: "infinix-smart-20",
    name: "Infinix Smart 20 (X6840)",
    slug: "infinix-smart-20",
    brandId: "infinix",
    brandName: "Infinix",
    price: 39999,
    oldPrice: 43999,
    dealerPrice: 36500,
    inStock: true,
    sortOrder: 27,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", price: 39999, oldPrice: 43999, inStock: true },
      { id: "v2", ram: "4GB", storage: "128GB", price: 46999, oldPrice: 50999, inStock: true }
    ],
    colors: [{ name: "Timber Black", hex: "#18181b" }, { name: "Shiny Gold", hex: "#fef08a" }],
    specs: {
      display: "6.6\" 90Hz Interactive Punch-Hole",
      battery: "5200mAh Type-C Fast Charge",
      mainCamera: "13MP Dual AI Camera",
      selfieCamera: "8MP Flash Front",
      chipset: "Octa-core 2.2GHz",
      network: "4G LTE"
    },
    highlights: ["Interactive Dynamic Bar display", "5200mAh big battery", "DTS Audio Boost stereo speaker"],
    description: "Infinix Smart 20 packs premium features into an entry price point, ideal for student life and daily calling."
  },
  {
    id: "infinix-hot-60i",
    name: "Infinix Hot 60i",
    slug: "infinix-hot-60i",
    brandId: "infinix",
    brandName: "Infinix",
    price: 58999,
    oldPrice: 62999,
    dealerPrice: 54500,
    inStock: true,
    sortOrder: 28,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB (X6728B)", price: 58999, oldPrice: 62999, inStock: true },
      { id: "v2", ram: "8GB", storage: "256GB (X6728)", price: 61999, oldPrice: 65999, inStock: true }
    ],
    colors: [{ name: "Sleek Black", hex: "#09090b" }, { name: "Dreamy Purple", hex: "#a855f7" }],
    specs: {
      display: "6.7\" 120Hz Punch-Hole Display",
      battery: "5160mAh 18W Fast Charge",
      mainCamera: "50MP Ultra Clear Dual Camera",
      selfieCamera: "8MP with Front Flash",
      chipset: "Helio G81",
      network: "4G LTE"
    },
    highlights: ["120Hz smooth scroll screen", "50MP Ultra Clear Camera", "5160mAh battery"],
    description: "Infinix Hot 60i combines high refresh rate, 5160mAh battery, and expansive storage up to 256GB."
  },
  {
    id: "infinix-hot-60-pro",
    name: "Infinix Hot 60 Pro (X6885)",
    slug: "infinix-hot-60-pro",
    brandId: "infinix",
    brandName: "Infinix",
    price: 77999,
    oldPrice: 83999,
    dealerPrice: 72000,
    inStock: true,
    sortOrder: 29,
    tags: ["Featured"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "128GB", price: 77999, oldPrice: 83999, inStock: true }
    ],
    colors: [{ name: "Titan Gold", hex: "#eab308" }, { name: "Space Gray", hex: "#334155" }],
    specs: {
      display: "6.78\" 120Hz AMOLED",
      battery: "5160mAh 33W Fast Charge",
      mainCamera: "50MP Sony Sensor + 2MP Depth",
      selfieCamera: "16MP",
      chipset: "Helio G99 Ultimate",
      network: "4G LTE"
    },
    highlights: ["120Hz AMOLED Panel", "Helio G99 Ultimate gaming engine", "Dual JBL tuned speakers"],
    description: "Infinix Hot 60 Pro features crisp AMOLED visuals and snappy gaming performance."
  },
  {
    id: "infinix-hot-60-pro-plus",
    name: "Infinix Hot 60 Pro+ (X6886)",
    slug: "infinix-hot-60-pro-plus",
    brandId: "infinix",
    brandName: "Infinix",
    price: 84999,
    oldPrice: 90999,
    dealerPrice: 78500,
    inStock: true,
    sortOrder: 30,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 84999, oldPrice: 90999, inStock: true }
    ],
    colors: [{ name: "Titanium Silver", hex: "#cbd5e1" }, { name: "Sleek Black", hex: "#09090b" }],
    specs: {
      display: "6.78\" 3D-Curved 120Hz AMOLED",
      battery: "5160mAh 33W Fast Charge",
      mainCamera: "50MP OIS Sony LYT-600 + 2MP",
      selfieCamera: "16MP",
      chipset: "Helio G100",
      network: "4G LTE"
    },
    highlights: ["Ultra-slim 3D-Curved AMOLED screen", "50MP OIS Sony LYT-600 Camera", "In-display fingerprint sensor"],
    description: "Super sleek 3D-Curved screen with optical image stabilization and 256GB storage."
  },
  {
    id: "infinix-note-60-5g",
    name: "Infinix Note 60 5G (X6879)",
    slug: "infinix-note-60-5g",
    brandId: "infinix",
    brandName: "Infinix",
    price: 109999,
    oldPrice: 118999,
    dealerPrice: 101000,
    inStock: true,
    sortOrder: 31,
    tags: ["Featured", "New Arrival"],
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 109999, oldPrice: 118999, inStock: true }
    ],
    colors: [{ name: "Vintage Green", hex: "#166534" }, { name: "Obsidian Black", hex: "#09090b" }],
    specs: {
      display: "6.78\" FHD+ AMOLED 120Hz",
      battery: "6500mAh 45W All-Round FastCharge",
      mainCamera: "108MP OIS + 2MP + 2MP",
      selfieCamera: "32MP Front",
      chipset: "Dimensity 7020 5G",
      network: "5G High Speed"
    },
    highlights: ["6500mAh huge battery with 45W charge", "108MP OIS Camera", "Wireless MagCharge support"],
    description: "Infinix Note 60 5G features 6500mAh battery life, 108MP OIS photography, and magnetic wireless charging."
  },
  {
    id: "infinix-note-60-pro-5g",
    name: "Infinix Note 60 Pro 5G (X6878)",
    slug: "infinix-note-60-pro-5g",
    brandId: "infinix",
    brandName: "Infinix",
    price: 125999,
    oldPrice: 135000,
    dealerPrice: 116000,
    inStock: true,
    sortOrder: 32,
    tags: ["Featured"],
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 125999, oldPrice: 135000, inStock: true }
    ],
    colors: [{ name: "Titan Gold", hex: "#ca8a04" }, { name: "Racing Edition", hex: "#1e293b" }],
    specs: {
      display: "6.78\" 3D Curved 144Hz AMOLED",
      battery: "6500mAh 70W All-Round FastCharge 2.0",
      mainCamera: "108MP OIS Super Zoom + 8MP Ultra-Wide",
      selfieCamera: "32MP Dual Flash",
      chipset: "Dimensity 7200 5G (4nm)",
      network: "5G Dual SIM"
    },
    highlights: ["70W All-Round FastCharge + 20W Wireless", "144Hz 3D Curved AMOLED", "Dual JBL Stereo Speakers"],
    description: "Next-generation 144Hz 3D curved screen paired with 70W fast charging and Dimensity 7200 speed."
  },
  {
    id: "infinix-note-60-ultra-5g",
    name: "Infinix Note 60 Ultra 5G (X6877)",
    slug: "infinix-note-60-ultra-5g",
    brandId: "infinix",
    brandName: "Infinix",
    price: 239999,
    oldPrice: 259999,
    dealerPrice: 222000,
    inStock: true,
    sortOrder: 33,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 239999, oldPrice: 259999, inStock: true }
    ],
    colors: [{ name: "Leather Brown", hex: "#78350f" }, { name: "Carbon Black", hex: "#0f172a" }],
    specs: {
      display: "6.8\" 2K LTPO AMOLED 144Hz 3000 nits",
      battery: "7000mAh 100W All-Round FastCharge + 50W Wireless",
      mainCamera: "200MP OIS Periscope Telephoto + 50MP Ultra-Wide",
      selfieCamera: "50MP 4K Front",
      chipset: "Dimensity 9300+ Flagship (4nm)",
      network: "5G High Speed"
    },
    highlights: ["100W FastCharge with 7000mAh battery", "200MP OIS Periscope Zoom Camera", "Dimensity 9300+ Flagship processor"],
    description: "Infinix's flagship masterpiece with 7000mAh battery, 100W charging, and 200MP periscope zoom."
  },
  {
    id: "infinix-note-edge-5g",
    name: "Infinix Note Edge 5G (X6887)",
    slug: "infinix-note-edge-5g",
    brandId: "infinix",
    brandName: "Infinix",
    price: 99999,
    oldPrice: 106999,
    dealerPrice: 92000,
    inStock: true,
    sortOrder: 34,
    tags: ["New Arrival"],
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 99999, oldPrice: 106999, inStock: true }
    ],
    colors: [{ name: "Emerald Edge", hex: "#047857" }, { name: "Midnight", hex: "#020617" }],
    specs: {
      display: "6.78\" Waterfall Curved 120Hz AMOLED",
      battery: "6500mAh 45W Fast Charge",
      mainCamera: "64MP OIS + 8MP Wide",
      selfieCamera: "32MP",
      chipset: "Dimensity 7050 5G",
      network: "5G"
    },
    highlights: ["Edge Waterfall 3D display", "6500mAh battery capacity", "Slim feather-weight profile"],
    description: "Sleek waterfall curved edges and 6500mAh battery with Dimensity 5G speed."
  },
  {
    id: "infinix-gt-50-pro",
    name: "Infinix GT 50 Pro (X6891)",
    slug: "infinix-gt-50-pro",
    brandId: "infinix",
    brandName: "Infinix",
    price: 189999,
    oldPrice: 204999,
    dealerPrice: 175000,
    inStock: true,
    sortOrder: 35,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 189999, oldPrice: 204999, inStock: true }
    ],
    colors: [{ name: "Cyber Blue", hex: "#0284c7" }, { name: "Mecha Silver", hex: "#94a3b8" }],
    specs: {
      display: "6.78\" 144Hz FHD+ AMOLED with Pixelworks Gaming Display Chip",
      battery: "6500mAh 45W Bypass Charging",
      mainCamera: "108MP OIS + 2MP + 2MP",
      selfieCamera: "32MP",
      chipset: "Dimensity 8300-Ultra / 8400 (4nm)",
      network: "5G High Speed"
    },
    highlights: ["Mecha Cyber Design with customizable LED lighting", "Dedicated Gaming Display Chip", "Bypass charging for zero battery heating while gaming"],
    description: "The gaming champion engineered for esports competitors. RGB Mecha lighting, bypass gaming power, and 144Hz refresh rate."
  },

  // ==========================================
  // TECNO
  // ==========================================
  {
    id: "tecno-camon-50-pro",
    name: "Tecno Camon 50 Pro",
    slug: "tecno-camon-50-pro",
    brandId: "tecno",
    brandName: "Tecno",
    price: 109999,
    oldPrice: 119999,
    dealerPrice: 102000,
    inStock: true,
    sortOrder: 36,
    tags: ["Featured", "Best Seller", "New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 109999, oldPrice: 119999, inStock: true }
    ],
    colors: [
      { name: "Alps Snowy White", hex: "#f8fafc" },
      { name: "Iceland Basalt Dark", hex: "#1e293b" },
      { name: "Emerald Lake", hex: "#065f46" }
    ],
    specs: {
      display: "144Hz 6.78\" Curved AMOLED 1.5K",
      battery: "6500mAh 5-Year Durability Battery with 70W Ultra Charge",
      mainCamera: "50MP Sony LYT-700C OIS + AI 60X Super Zoom Lens",
      selfieCamera: "50MP Eye-Tracking AutoFocus Front Camera",
      chipset: "MediaTek Helio G200 Ultimate",
      network: "4G LTE Advanced"
    },
    highlights: [
      "Tagline: \"Zoom In. Snap Joy.\"",
      "60X AI Zoom & 50MP Sony LYT-700C Ultra Night Camera",
      "144Hz Curved AMOLED Eye Protection Display",
      "IP69K / IP68 Underwater Photography Certified",
      "6500mAh Battery with 5-Year Health Durability Guarantee"
    ],
    description: "Zoom In. Snap Joy. The Tecno Camon 50 Pro is a photography prodigy featuring Sony LYT-700C sensor with OIS, 60X AI Super Zoom, IP69K underwater durability, and massive 6500mAh battery."
  },
  {
    id: "tecno-camon-50-ultra-5g",
    name: "Tecno Camon 50 Ultra 5G",
    slug: "tecno-camon-50-ultra-5g",
    brandId: "tecno",
    brandName: "Tecno",
    price: 119999,
    oldPrice: 129999,
    dealerPrice: 111000,
    inStock: true,
    sortOrder: 37,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "12GB", storage: "256GB", price: 119999, oldPrice: 129999, inStock: true }
    ],
    colors: [{ name: "Night Sky", hex: "#020617" }, { name: "Desert Sand", hex: "#d97706" }],
    specs: {
      display: "144Hz 6.78\" 3D Curved AMOLED",
      battery: "6500mAh 70W Ultra Charge",
      mainCamera: "50MP Sony LYT-700C + 50MP 100X Super Zoom Periscope + 8MP",
      selfieCamera: "50MP AF",
      chipset: "MediaTek Dimensity 7400 Ultimate (4nm)",
      network: "5G High Speed"
    },
    highlights: ["100X Super Zoom Periscope Camera", "Dimensity 7400 Ultimate 5G chip", "144Hz 3D Curved AMOLED"],
    description: "Flagship zoom photography in your palm with 100X Super Zoom and Dimensity 7400 5G power."
  },
  {
    id: "tecno-camon-50",
    name: "Tecno Camon 50",
    slug: "tecno-camon-50",
    brandId: "tecno",
    brandName: "Tecno",
    price: 99999,
    oldPrice: 107999,
    dealerPrice: 93000,
    inStock: true,
    sortOrder: 38,
    tags: ["New Arrival"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 99999, oldPrice: 107999, inStock: true }
    ],
    colors: [{ name: "Glacier White", hex: "#f1f5f9" }, { name: "Dark Shadow", hex: "#111827" }],
    specs: {
      display: "144Hz 6.78\" 1.5K AMOLED",
      battery: "6000mAh 45W Fast Charge",
      mainCamera: "50MP Sony LYT-700C Ultra Clear Camera + Depth",
      selfieCamera: "50MP Auto Focus",
      chipset: "MediaTek Helio G200 Ultimate",
      network: "4G LTE"
    },
    highlights: ["50MP Sony LYT-700C Ultra Clear Camera", "144Hz 1.5K AMOLED Screen", "6000mAh battery"],
    description: "Crisp 1.5K AMOLED clarity combined with Sony LYT-700C imaging brilliance."
  },
  {
    id: "tecno-spark-40-pro-plus",
    name: "Tecno Spark 40 Pro Plus",
    slug: "tecno-spark-40-pro-plus",
    brandId: "tecno",
    brandName: "Tecno",
    price: 79999,
    oldPrice: 85999,
    dealerPrice: 74000,
    inStock: true,
    sortOrder: 39,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8GB", storage: "256GB", price: 79999, oldPrice: 85999, inStock: true }
    ],
    colors: [{ name: "Lunar Orbit", hex: "#3b82f6" }, { name: "Temporal Orbs", hex: "#0f172a" }],
    specs: {
      display: "144Hz 6.78\" 3D AMOLED Curved Screen Gorilla Glass 5",
      battery: "5000mAh 33W Fast Charge",
      mainCamera: "50MP Main + AI Dual",
      selfieCamera: "32MP Front Glow Flash",
      chipset: "MediaTek Helio G200 6nm",
      network: "4G LTE"
    },
    highlights: ["Sleek 3D Curved AMOLED", "Helio G200 High Speed Processor", "In-display fingerprint"],
    description: "Curved AMOLED luxury at a groundbreaking price point with 256GB storage."
  },
  {
    id: "tecno-spark-50",
    name: "Tecno Spark 50",
    slug: "tecno-spark-50",
    brandId: "tecno",
    brandName: "Tecno",
    price: 60999,
    oldPrice: 65999,
    dealerPrice: 56500,
    inStock: true,
    sortOrder: 40,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "6GB", storage: "128GB", price: 60999, oldPrice: 65999, inStock: true }
    ],
    colors: [{ name: "Gravity Black", hex: "#09090b" }, { name: "Magic Skin Green", hex: "#15803d" }],
    specs: {
      display: "120Hz 6.78\" Smooth Display with Dynamic Port",
      battery: "5000mAh 18W",
      mainCamera: "50MP + AI Dual Camera",
      selfieCamera: "8MP with Dual Flash",
      chipset: "MediaTek Helio G81",
      network: "4G LTE"
    },
    highlights: ["120Hz Smooth display", "50MP AI Camera", "Dynamic Port notification capsule"],
    description: "Tecno Spark 50 offers 120Hz fluidity and stylish vegan leather textures."
  },
  {
    id: "tecno-spark-go-3",
    name: "Tecno Spark Go 3",
    slug: "tecno-spark-go-3",
    brandId: "tecno",
    brandName: "Tecno",
    price: 39999,
    oldPrice: 43999,
    dealerPrice: 36800,
    inStock: true,
    sortOrder: 41,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "4GB", storage: "64GB", price: 39999, oldPrice: 43999, inStock: true },
      { id: "v2", ram: "4GB", storage: "128GB", price: 46999, oldPrice: 50999, inStock: true }
    ],
    colors: [{ name: "Mystery White", hex: "#f8fafc" }, { name: "Startrail Black", hex: "#18181b" }],
    specs: {
      display: "120Hz 6.75\" Smooth Display",
      battery: "5000mAh Type-C",
      mainCamera: "13MP + AI Lens",
      selfieCamera: "8MP Front Flash",
      chipset: "Unisoc T7250 Octa-core",
      network: "4G LTE"
    },
    highlights: ["120Hz high refresh rate screen", "DTS stereo dual speakers", "5000mAh long battery life"],
    description: "Reliable entry-level champion with 120Hz high refresh screen and dual speakers."
  },

  // ==========================================
  // NUBIA / ZTE (RAM shown as Physical + Extended, e.g. 8+12GB)
  // ==========================================
  {
    id: "nubia-v80-max",
    name: "nubia V80 MAX",
    slug: "nubia-v80-max",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 48999,
    oldPrice: 53999,
    dealerPrice: 45000,
    inStock: true,
    sortOrder: 42,
    tags: ["Featured", "Best Seller", "New Arrival"],
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
    ],
    variants: [
      { id: "v1", ram: "8+12GB", storage: "256GB", price: 48999, oldPrice: 53999, inStock: true }
    ],
    colors: [
      { name: "Armor Titanium", hex: "#64748b" },
      { name: "Deep Space Black", hex: "#0f172a" },
      { name: "Nordic Blue", hex: "#0284c7" }
    ],
    specs: {
      display: "6.9\" Cinema-size 120Hz Display",
      battery: "6000mAh with Bypass Charging Technology",
      mainCamera: "50MP AI Ultra-Clear Camera + Depth",
      selfieCamera: "16MP AI Beauty Front",
      chipset: "Unisoc T760 / T616 Octa-Core Processor",
      network: "4G LTE Dual SIM"
    },
    highlights: [
      "Tagline: \"Super Durable, Super Smart.\"",
      "6000mAh Long-life Battery with Bypass Charging",
      "Expansive 6.9-inch 120Hz Screen",
      "Precise Navigation with lane-level accuracy GPS",
      "Certified Drop Resistance up to 1.8m",
      "8+12GB Dynamic RAM (20GB Total) + 256GB Storage"
    ],
    description: "Super Durable, Super Smart. nubia V80 MAX features military-grade 1.8m drop resistance, 6000mAh battery with cool bypass charging, lane-level GPS navigation, and 20GB total RAM."
  },
  {
    id: "redmagic-11-pro",
    name: "Redmagic 11 Pro",
    slug: "redmagic-11-pro",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 309999,
    oldPrice: 329999,
    dealerPrice: 288000,
    inStock: true,
    sortOrder: 43,
    tags: ["Featured", "Best Seller"],
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "16+12GB", storage: "512GB", price: 309999, oldPrice: 329999, inStock: true }
    ],
    colors: [{ name: "Deuterium Transparent", hex: "#374151" }, { name: "Sleet Black", hex: "#09090b" }],
    specs: {
      display: "6.85\" 1.5K 144Hz True Full Screen (Under-Display Camera)",
      battery: "7500mAh 120W ICE cooling",
      mainCamera: "50MP OIS + 50MP Ultra-Wide + 2MP",
      selfieCamera: "16MP Under-Display Camera (UDC)",
      chipset: "Snapdragon 8 Gen 4 Extreme Gaming Edition",
      network: "5G High Speed"
    },
    highlights: ["Active Turbofan 22,000 RPM Built-in Cooling", "Massive 7500mAh Battery with 120W charging", "520Hz Touch Shoulder Triggers for Gaming"],
    description: "The supreme gaming beast with built-in turbofan, bezel-less under-display camera, and monster 7500mAh battery."
  },
  {
    id: "nubia-v80-pro",
    name: "nubia V80 Pro",
    slug: "nubia-v80-pro",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 53999,
    oldPrice: 58999,
    dealerPrice: 49500,
    inStock: true,
    sortOrder: 44,
    tags: ["Featured", "New Arrival"],
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8+12GB", storage: "256GB", price: 53999, oldPrice: 58999, inStock: true }
    ],
    colors: [{ name: "Cosmic Gray", hex: "#334155" }, { name: "Sunrise Gold", hex: "#f59e0b" }],
    specs: {
      display: "6.72\" FHD+ 120Hz Ultra Smooth",
      battery: "5000mAh 33W Fast Charge",
      mainCamera: "108MP AI Ultra Camera + 2MP",
      selfieCamera: "16MP",
      chipset: "Unisoc T760 5G / T616",
      network: "4G LTE"
    },
    highlights: ["108MP Ultra-Resolution Lens", "8+12GB RAM (20GB total)", "33W Fast Charging"],
    description: "Stunning 108MP details and generous 256GB storage in an eye-catching slim frame."
  },
  {
    id: "nubia-v60-design",
    name: "nubia V60 Design",
    slug: "nubia-v60-design",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 41999,
    oldPrice: 45999,
    dealerPrice: 38000,
    inStock: true,
    sortOrder: 45,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "8+12GB", storage: "256GB", price: 41999, oldPrice: 45999, inStock: true }
    ],
    colors: [{ name: "Champagne Gold", hex: "#eab308" }, { name: "Dark Purple", hex: "#581c87" }],
    specs: {
      display: "6.6\" 90Hz HD+ with Live Island",
      battery: "5000mAh 22.5W Fast Charge",
      mainCamera: "50MP Triple AI Camera",
      selfieCamera: "8MP",
      chipset: "Unisoc T606 Octa-core",
      network: "4G LTE"
    },
    highlights: ["Sky-mirror glass back luxury design", "8+12GB RAM with 256GB ROM", "22.5W Fast Charging"],
    description: "Premium glass mirror aesthetic, 256GB storage, and smooth Live Island interactive capsule."
  },
  {
    id: "nubia-a56",
    name: "nubia A56",
    slug: "nubia-a56",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 33999,
    oldPrice: 36999,
    dealerPrice: 31000,
    inStock: true,
    sortOrder: 46,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "4+8GB", storage: "128GB", price: 33999, oldPrice: 36999, inStock: true }
    ],
    colors: [{ name: "Midnight Black", hex: "#0f172a" }, { name: "Cyan", hex: "#06b6d4" }],
    specs: {
      display: "6.56\" 90Hz Punch-Hole Screen",
      battery: "5000mAh Type-C",
      mainCamera: "13MP AI Dual Camera",
      selfieCamera: "5MP Front",
      chipset: "Unisoc Octa-Core",
      network: "4G LTE"
    },
    highlights: ["4+8GB Extended RAM", "128GB storage", "5000mAh battery"],
    description: "Budget powerhouse with 128GB storage and 90Hz display."
  },
  {
    id: "nubia-a36",
    name: "nubia A36",
    slug: "nubia-a36",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 30999,
    oldPrice: 33999,
    dealerPrice: 28000,
    inStock: true,
    sortOrder: 47,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "4+8GB", storage: "64GB", price: 30999, oldPrice: 33999, inStock: true }
    ],
    colors: [{ name: "Titanium Gray", hex: "#475569" }, { name: "Green", hex: "#15803d" }],
    specs: {
      display: "6.56\" 90Hz Screen",
      battery: "5000mAh Battery",
      mainCamera: "13MP AI Camera",
      selfieCamera: "5MP",
      chipset: "Octa-core 1.6GHz",
      network: "4G LTE"
    },
    highlights: ["4+8GB Dynamic RAM", "5000mAh battery", "90Hz Refresh Rate"],
    description: "Affordable reliability with 90Hz fluid screen and 5000mAh battery."
  },
  {
    id: "zte-blade-a35e",
    name: "ZTE Blade A35e",
    slug: "zte-blade-a35e",
    brandId: "nubia-zte",
    brandName: "Nubia / ZTE",
    price: 24999,
    oldPrice: 27999,
    dealerPrice: 22500,
    inStock: true,
    sortOrder: 48,
    tags: ["Best Seller"],
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"],
    variants: [
      { id: "v1", ram: "2+4GB", storage: "64GB", price: 24999, oldPrice: 27999, inStock: true }
    ],
    colors: [{ name: "Starry Black", hex: "#111827" }, { name: "Ice Blue", hex: "#38bdf8" }],
    specs: {
      display: "6.52\" Waterdrop Display",
      battery: "5000mAh",
      mainCamera: "8MP AI Camera",
      selfieCamera: "5MP",
      chipset: "Quad-Core / Octa-Core",
      network: "4G LTE"
    },
    highlights: ["Most affordable 4G smartphone", "5000mAh battery", "2+4GB RAM with 64GB storage"],
    description: "The most economical genuine PTA approved smartphone in Pakistan with 5000mAh battery."
  }
];
