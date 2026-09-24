import { db, isFirebaseConfigured } from "../config/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  writeBatch 
} from "firebase/firestore";
import { INITIAL_PRODUCTS } from "../data/initialProducts";
import { INITIAL_BRANDS_LIST, DEFAULT_SETTINGS } from "../config/constants";
import { INITIAL_BANNERS } from "../data/initialBanners";

const LOCAL_PRODUCTS_KEY = "imc_products_data";
const LOCAL_BRANDS_KEY = "imc_brands_data";
const LOCAL_BANNERS_KEY = "imc_banners_data";
const LOCAL_SETTINGS_KEY = "imc_settings_data";

// Helper to get from LocalStorage with fallback
const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LocalStorage write error:", e);
  }
};

// ==========================================
// PRODUCTS
// ==========================================
export const fetchProducts = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetchProducts failed, falling back to local:", err);
    }
  }

  // Local storage fallback
  let localProducts = getLocal(LOCAL_PRODUCTS_KEY, null);
  if (!localProducts || localProducts.length === 0) {
    localProducts = INITIAL_PRODUCTS;
    setLocal(LOCAL_PRODUCTS_KEY, localProducts);
  }
  return localProducts;
};

export const saveProduct = async (product) => {
  const prodId = product.id || `prod_${Date.now()}`;
  const updatedProduct = { ...product, id: prodId, updatedAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "products", prodId), updatedProduct);
    } catch (err) {
      console.error("Firestore saveProduct error:", err);
    }
  }

  // Update local
  const current = getLocal(LOCAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
  const index = current.findIndex(p => p.id === prodId);
  let updatedList;
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updatedProduct;
  } else {
    updatedList = [updatedProduct, ...current];
  }
  setLocal(LOCAL_PRODUCTS_KEY, updatedList);
  return updatedProduct;
};

export const deleteProduct = async (productId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (err) {
      console.error("Firestore deleteProduct error:", err);
    }
  }

  const current = getLocal(LOCAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
  const updatedList = current.filter(p => p.id !== productId);
  setLocal(LOCAL_PRODUCTS_KEY, updatedList);
  return true;
};

export const bulkUpdatePrices = async (priceUpdates) => {
  // priceUpdates is an array of { id, price, oldPrice, inStock, variants }
  const currentProducts = await fetchProducts();
  const updatedProducts = currentProducts.map(prod => {
    const update = priceUpdates.find(u => u.id === prod.id);
    if (!update) return prod;
    return {
      ...prod,
      price: update.price !== undefined ? Number(update.price) : prod.price,
      oldPrice: update.oldPrice !== undefined ? Number(update.oldPrice) : prod.oldPrice,
      inStock: update.inStock !== undefined ? Boolean(update.inStock) : prod.inStock,
      variants: update.variants || prod.variants,
      dealerPrice: update.dealerPrice !== undefined ? Number(update.dealerPrice) : prod.dealerPrice,
      updatedAt: new Date().toISOString()
    };
  });

  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      for (const update of priceUpdates) {
        const prod = updatedProducts.find(p => p.id === update.id);
        if (prod) {
          const docRef = doc(db, "products", prod.id);
          batch.set(docRef, prod);
        }
      }
      await batch.commit();
    } catch (err) {
      console.error("Firestore bulkUpdatePrices error:", err);
    }
  }

  setLocal(LOCAL_PRODUCTS_KEY, updatedProducts);
  return updatedProducts;
};

// ==========================================
// BRANDS
// ==========================================
export const fetchBrands = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "brands"));
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return items.sort((a, b) => (a.order || 99) - (b.order || 99));
      }
    } catch (err) {
      console.warn("Firestore fetchBrands failed:", err);
    }
  }

  let localBrands = getLocal(LOCAL_BRANDS_KEY, null);
  if (!localBrands || localBrands.length === 0) {
    localBrands = INITIAL_BRANDS_LIST;
    setLocal(LOCAL_BRANDS_KEY, localBrands);
  }
  return localBrands.sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const saveBrand = async (brand) => {
  const brandId = brand.id || brand.slug || `brand_${Date.now()}`;
  const updatedBrand = { ...brand, id: brandId };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "brands", brandId), updatedBrand);
    } catch (err) {
      console.error("Firestore saveBrand error:", err);
    }
  }

  const current = getLocal(LOCAL_BRANDS_KEY, INITIAL_BRANDS_LIST);
  const index = current.findIndex(b => b.id === brandId);
  let updatedList;
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updatedBrand;
  } else {
    updatedList = [...current, updatedBrand];
  }
  setLocal(LOCAL_BRANDS_KEY, updatedList);
  return updatedBrand;
};

export const saveAllBrands = async (brandsList) => {
  if (isFirebaseConfigured && db) {
    try {
      const batch = writeBatch(db);
      for (const brand of brandsList) {
        const docRef = doc(db, "brands", brand.id);
        batch.set(docRef, brand);
      }
      await batch.commit();
    } catch (err) {
      console.error("Firestore saveAllBrands error:", err);
    }
  }
  setLocal(LOCAL_BRANDS_KEY, brandsList);
  return brandsList;
};

// ==========================================
// BANNERS
// ==========================================
export const fetchBanners = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "banners"));
      if (!snap.empty) {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return items.sort((a, b) => (a.order || 99) - (b.order || 99));
      }
    } catch (err) {
      console.warn("Firestore fetchBanners failed:", err);
    }
  }

  let localBanners = getLocal(LOCAL_BANNERS_KEY, null);
  if (!localBanners || localBanners.length === 0) {
    localBanners = INITIAL_BANNERS;
    setLocal(LOCAL_BANNERS_KEY, localBanners);
  }
  return localBanners.sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const saveBanner = async (banner) => {
  const bannerId = banner.id || `banner_${Date.now()}`;
  const updated = { ...banner, id: bannerId };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "banners", bannerId), updated);
    } catch (err) {
      console.error("Firestore saveBanner error:", err);
    }
  }

  const current = getLocal(LOCAL_BANNERS_KEY, INITIAL_BANNERS);
  const index = current.findIndex(b => b.id === bannerId);
  let updatedList;
  if (index >= 0) {
    updatedList = [...current];
    updatedList[index] = updated;
  } else {
    updatedList = [...current, updated];
  }
  setLocal(LOCAL_BANNERS_KEY, updatedList);
  return updated;
};

export const deleteBanner = async (bannerId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "banners", bannerId));
    } catch (err) {
      console.error("Firestore deleteBanner error:", err);
    }
  }
  const current = getLocal(LOCAL_BANNERS_KEY, INITIAL_BANNERS);
  const updatedList = current.filter(b => b.id !== bannerId);
  setLocal(LOCAL_BANNERS_KEY, updatedList);
  return true;
};

// ==========================================
// SETTINGS
// ==========================================
export const fetchSettings = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "settings"));
      if (!snap.empty) {
        const found = snap.docs.find(d => d.id === "store_config");
        if (found) {
          return { ...DEFAULT_SETTINGS, ...found.data() };
        }
      }
    } catch (err) {
      console.warn("Firestore fetchSettings failed:", err);
    }
  }

  return getLocal(LOCAL_SETTINGS_KEY, DEFAULT_SETTINGS);
};

export const saveSettings = async (settings) => {
  const merged = { ...DEFAULT_SETTINGS, ...settings, updatedAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "settings", "store_config"), merged);
    } catch (err) {
      console.error("Firestore saveSettings error:", err);
    }
  }

  setLocal(LOCAL_SETTINGS_KEY, merged);
  return merged;
};

// ==========================================
// CLOUDINARY UNSIGNED UPLOAD
// ==========================================
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (cloudName && uploadPreset) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
      throw new Error(data.error?.message || "Failed to upload image to Cloudinary");
    } catch (err) {
      console.warn("Cloudinary upload failed, using Data URL preview:", err);
    }
  }

  // Fallback to Data URL for instant browser preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

// Factory reset for demo or troubleshooting
export const resetToInitialData = () => {
  setLocal(LOCAL_PRODUCTS_KEY, INITIAL_PRODUCTS);
  setLocal(LOCAL_BRANDS_KEY, INITIAL_BRANDS_LIST);
  setLocal(LOCAL_BANNERS_KEY, INITIAL_BANNERS);
  setLocal(LOCAL_SETTINGS_KEY, DEFAULT_SETTINGS);
  return true;
};
