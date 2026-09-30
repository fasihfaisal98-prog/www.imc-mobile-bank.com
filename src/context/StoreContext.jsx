import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  fetchProducts,
  fetchBrands,
  fetchBanners,
  fetchSettings,
} from "../services/storageService";

import { DEFAULT_SETTINGS, formatPKR } from "../config/constants";

const StoreContext = createContext();

const CART_STORAGE_KEY = "imc_cart_items";

export const StoreProvider = ({ children }) => {
  // =========================================================
  // STORE DATA
  // =========================================================

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // CART
  // =========================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      /*
       * IMPORTANT:
       * Remove old "image" values saved by previous versions.
       *
       * The cart now stores productId only.
       * The latest product image is retrieved from products/Firestore.
       */
      return parsed.map((item) => {
        const { image, ...cleanItem } = item;
        return cleanItem;
      });
    } catch (error) {
      console.error("Cart loading error:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // =========================================================
  // WHATSAPP MODAL
  // =========================================================

  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalVariant, setModalVariant] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalColor, setModalColor] = useState(null);

  // =========================================================
  // LOAD ALL DATA
  // =========================================================

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const [prods, brs, bans, sets] = await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchBanners(),
        fetchSettings(),
      ]);

      // Products
      setProducts(Array.isArray(prods) ? prods : []);

      // Brands
      const sortedBrands = [...(Array.isArray(brs) ? brs : [])].sort(
        (a, b) => {
          if (a.id === "samsung" || a.slug === "samsung") {
            return -1;
          }

          if (b.id === "samsung" || b.slug === "samsung") {
            return 1;
          }

          return (a.order || 99) - (b.order || 99);
        }
      );

      setBrands(sortedBrands);

      // Banners
      setBanners(
        (Array.isArray(bans) ? bans : []).filter(
          (banner) => banner.active !== false
        )
      );

      // Settings
      setSettings(sets || DEFAULT_SETTINGS);
    } catch (error) {
      console.error("StoreContext load error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data when website opens
  useEffect(() => {
    loadData();
  }, [loadData]);

  // =========================================================
  // SAVE CART TO LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Cart save error:", error);
    }
  }, [cartItems]);

  // =========================================================
  // GET LATEST PRODUCT
  // =========================================================

  /*
   * This function finds the latest product from Firestore data.
   *
   * This is important because we DO NOT store the image
   * inside localStorage anymore.
   */
  const getProductById = useCallback(
    (productId) => {
      return products.find(
        (product) => String(product.id) === String(productId)
      );
    },
    [products]
  );

  // =========================================================
  // GET LATEST PRODUCT IMAGE
  // =========================================================

  const getProductImage = useCallback(
    (productId) => {
      const product = getProductById(productId);

      if (!product) {
        return "";
      }

      /*
       * Main image
       */
      if (
        Array.isArray(product.images) &&
        product.images.length > 0
      ) {
        return product.images[0];
      }

      /*
       * Fallback for products using a single image field
       */
      if (product.image) {
        return product.image;
      }

      return "";
    },
    [getProductById]
  );

  // =========================================================
  // CART ITEMS WITH LATEST PRODUCT DATA
  // =========================================================

  /*
   * IMPORTANT:
   *
   * cartItems = data stored in localStorage
   *
   * cartItemsWithProducts = cart + latest Firestore product data
   *
   * This means if you change an image in Firestore,
   * the cart can display the new image.
   */

  const cartItemsWithProducts = cartItems.map((item) => {
    const latestProduct = getProductById(item.productId);

    return {
      ...item,

      // Latest product information
      name: latestProduct?.name || item.name,
      slug: latestProduct?.slug || item.slug,

      // IMPORTANT:
      // Always use latest image from Firestore
      image:
        latestProduct?.images?.[0] ||
        latestProduct?.image ||
        "",

      // Keep cart price because it represents the selected
      // variant/order at the time the product was added.
      price: item.price,
    };
  });

  // =========================================================
  // ADD TO CART
  // =========================================================

  const addToCart = (
    product,
    variant = null,
    color = null,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    const selectedVariant =
      variant ||
      (product.variants && product.variants.length > 0
        ? product.variants[0]
        : null);

    const variantId = selectedVariant
      ? selectedVariant.id ||
        `${selectedVariant.ram}_${selectedVariant.storage}`
      : "default";

    const colorName = color ? color.name : "";

    const cartItemId = `${product.id}_${variantId}_${colorName}`;

    const price = selectedVariant
      ? selectedVariant.price
      : product.price;

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.cartItemId === cartItemId
      );

      // If product already exists in cart
      if (existingItem) {
        return previousItems.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      // Add new product
      return [
        ...previousItems,
        {
          cartItemId,

          /*
           * IMPORTANT:
           * We ONLY save productId.
           *
           * We DO NOT save:
           *
           * image: product.images?.[0]
           *
           * because that causes old images to remain
           * on different devices.
           */

          productId: product.id,

          name: product.name,

          slug: product.slug,

          variant: selectedVariant
            ? `${selectedVariant.ram} + ${selectedVariant.storage}`
            : "",

          color: colorName,

          price,

          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  // =========================================================
  // REMOVE FROM CART
  // =========================================================

  const removeFromCart = (cartItemId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.cartItemId !== cartItemId
      )
    );
  };

  // =========================================================
  // UPDATE CART QUANTITY
  // =========================================================

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================================================
  // CART TOTAL
  // =========================================================

  const cartTotal = cartItemsWithProducts.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // =========================================================
  // CART COUNT
  // =========================================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =========================================================
  // WHATSAPP MODAL
  // =========================================================

  const openWhatsAppModal = (
    product,
    variant = null,
    color = null,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    setModalProduct(product);

    setModalVariant(
      variant || product.variants?.[0] || null
    );

    setModalColor(
      color || product.colors?.[0] || null
    );

    setModalQuantity(quantity);

    setIsWhatsAppModalOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
    setModalProduct(null);
    setModalVariant(null);
    setModalColor(null);
    setModalQuantity(1);
  };

  // =========================================================
  // WHATSAPP NUMBER
  // =========================================================

  const getWhatsAppNumber = () => {
    const number =
      settings.whatsappNumber || "03332621231";

    let cleanNumber = number.replace(/[^0-9]/g, "");

    if (cleanNumber.startsWith("0")) {
      cleanNumber = "92" + cleanNumber.substring(1);
    }

    return cleanNumber || "923332621231";
  };

  // =========================================================
  // SINGLE PRODUCT WHATSAPP MESSAGE
  // =========================================================

  const buildSingleOrderMessage = ({
    product,
    variant,
    color,
    quantity,
    customerName,
    customerPhone,
    customerCityAddress,
  }) => {
    const template =
      settings.whatsappTemplate ||
      DEFAULT_SETTINGS.whatsappTemplate;

    const variantString = variant
      ? `${variant.ram} + ${variant.storage}${
          color
            ? ` (${color.name || color})`
            : ""
        }`
      : color
      ? color.name || color
      : "Standard";

    const priceString = formatPKR(
      (variant ? variant.price : product.price) *
        (quantity || 1)
    );

    const productUrl = `${window.location.origin}/product/${
      product.slug || product.id
    }`;

    const message = template
      .replace(/{product}/g, product.name)
      .replace(/{variant}/g, variantString)
      .replace(/{price}/g, priceString)
      .replace(/{quantity}/g, String(quantity || 1))
      .replace(/{url}/g, productUrl)
      .replace(/{name}/g, customerName || "")
      .replace(/{phone}/g, customerPhone || "")
      .replace(
        /{city_address}/g,
        customerCityAddress || ""
      );

    return message;
  };

  // =========================================================
  // CART WHATSAPP MESSAGE
  // =========================================================

  const buildCartOrderMessage = ({
    customerName,
    customerPhone,
    customerCityAddress,
  }) => {
    const template =
      settings.cartWhatsappTemplate ||
      DEFAULT_SETTINGS.cartWhatsappTemplate;

    const itemsList = cartItemsWithProducts
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${
            item.variant || "Standard"
          }${
            item.color
              ? `, ${item.color}`
              : ""
          })\n   Qty: ${
            item.quantity
          } x ${formatPKR(item.price)} = ${formatPKR(
            item.price * item.quantity
          )}`
      )
      .join("\n\n");

    const totalString = formatPKR(cartTotal);

    const message = template
      .replace(/{items}/g, itemsList)
      .replace(/{total}/g, totalString)
      .replace(/{name}/g, customerName || "")
      .replace(/{phone}/g, customerPhone || "")
      .replace(
        /{city_address}/g,
        customerCityAddress || ""
      );

    return message;
  };

  // =========================================================
  // PROVIDER
  // =========================================================

  return (
    <StoreContext.Provider
      value={{
        // Store data
        products,
        brands,
        banners,
        settings,
        loading,

        // Refresh
        refreshData: loadData,

        // Product helpers
        getProductById,
        getProductImage,

        // Cart
        cartItems,

        /*
         * IMPORTANT:
         * Use this in your Cart component.
         *
         * It contains the latest image from Firestore.
         */
        cartItemsWithProducts,

        isCartOpen,

        openCart: () => setIsCartOpen(true),

        closeCart: () => setIsCartOpen(false),

        addToCart,

        removeFromCart,

        updateCartQuantity,

        clearCart,

        cartTotal,

        cartCount,

        // WhatsApp modal
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

        buildCartOrderMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// =========================================================
// HOOK
// =========================================================

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
};
