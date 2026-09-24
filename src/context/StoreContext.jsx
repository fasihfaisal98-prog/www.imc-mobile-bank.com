import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  fetchProducts, 
  fetchBrands, 
  fetchBanners, 
  fetchSettings 
} from "../services/storageService";
import { DEFAULT_SETTINGS, formatPKR } from "../config/constants";

const StoreContext = createContext();
const CART_STORAGE_KEY = "imc_cart_items";

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // WhatsApp Single-Product Modal state
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalVariant, setModalVariant] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalColor, setModalColor] = useState(null);

  // Load all data on mount
  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, brs, bans, sets] = await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchBanners(),
        fetchSettings()
      ]);
      setProducts(prods);
      
      // Ensure Samsung is always locked to #1 in brands
      const sortedBrands = [...brs].sort((a, b) => {
        if (a.id === "samsung" || a.slug === "samsung") return -1;
        if (b.id === "samsung" || b.slug === "samsung") return 1;
        return (a.order || 99) - (b.order || 99);
      });
      setBrands(sortedBrands);

      setBanners(bans.filter(b => b.active !== false));
      setSettings(sets || DEFAULT_SETTINGS);
    } catch (err) {
      console.error("StoreContext load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart save error:", e);
    }
  }, [cartItems]);

  // Cart actions
  const addToCart = (product, variant = null, color = null, quantity = 1) => {
    const selectedVariant = variant || (product.variants && product.variants[0]) || null;
    const variantId = selectedVariant ? selectedVariant.id || `${selectedVariant.ram}_${selectedVariant.storage}` : "default";
    const colorName = color ? color.name : "";
    const cartItemId = `${product.id}_${variantId}_${colorName}`;
    const price = selectedVariant ? selectedVariant.price : product.price;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.images?.[0] || "",
          variant: selectedVariant ? `${selectedVariant.ram} + ${selectedVariant.storage}` : "",
          color: colorName,
          price,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // WhatsApp Order Modal controls
  const openWhatsAppModal = (product, variant = null, color = null, quantity = 1) => {
    setModalProduct(product);
    setModalVariant(variant || product.variants?.[0] || null);
    setModalColor(color || product.colors?.[0] || null);
    setModalQuantity(quantity);
    setIsWhatsAppModalOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setModalProduct(null);
    setModalVariant(null);
  };

  // WhatsApp URL generation helper
  const getWhatsAppNumber = () => {
    const num = settings.whatsappNumber || "03332621231";
    // Convert e.g. 03332621231 to 923332621231
    let clean = num.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) {
      clean = "92" + clean.substring(1);
    }
    return clean || "923332621231";
  };

  const buildSingleOrderMessage = ({ product, variant, color, quantity, customerName, customerPhone, customerCityAddress }) => {
    const template = settings.whatsappTemplate || DEFAULT_SETTINGS.whatsappTemplate;
    const variantStr = variant 
      ? `${variant.ram} + ${variant.storage}${color ? ` (${color.name || color})` : ""}`
      : (color ? color.name || color : "Standard");
    const priceStr = formatPKR((variant ? variant.price : product.price) * (quantity || 1));
    const productUrl = `${window.location.origin}/product/${product.slug || product.id}`;

    let msg = template
      .replace(/{product}/g, product.name)
      .replace(/{variant}/g, variantStr)
      .replace(/{price}/g, priceStr)
      .replace(/{quantity}/g, String(quantity || 1))
      .replace(/{url}/g, productUrl)
      .replace(/{name}/g, customerName)
      .replace(/{phone}/g, customerPhone)
      .replace(/{city_address}/g, customerCityAddress);

    return msg;
  };

  const buildCartOrderMessage = ({ customerName, customerPhone, customerCityAddress }) => {
    const template = settings.cartWhatsappTemplate || DEFAULT_SETTINGS.cartWhatsappTemplate;
    const itemsList = cartItems.map((item, idx) => 
      `${idx + 1}. ${item.name} (${item.variant || "Standard"}${item.color ? `, ${item.color}` : ""})\n   Qty: ${item.quantity} x ${formatPKR(item.price)} = ${formatPKR(item.price * item.quantity)}`
    ).join("\n\n");

    const totalStr = formatPKR(cartTotal);

    let msg = template
      .replace(/{items}/g, itemsList)
      .replace(/{total}/g, totalStr)
      .replace(/{name}/g, customerName)
      .replace(/{phone}/g, customerPhone)
      .replace(/{city_address}/g, customerCityAddress);

    return msg;
  };

  return (
    <StoreContext.Provider value={{
      products,
      brands,
      banners,
      settings,
      loading,
      refreshData: loadData,
      // Cart
      cartItems,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
      // WhatsApp Modal
      isWhatsAppModalOpen,
      modalProduct,
      modalVariant,
      modalColor,
      modalQuantity,
      openWhatsAppModal,
      closeWhatsAppModal,
      // Helpers
      getWhatsAppNumber,
      buildSingleOrderMessage,
      buildCartOrderMessage
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
