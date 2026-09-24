import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useStore } from "../context/StoreContext";
import { ImageGallery } from "../components/product/ImageGallery";
import { VariantSelector } from "../components/product/VariantSelector";
import { SpecsTable } from "../components/product/SpecsTable";
import { ProductCard } from "../components/common/ProductCard";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { formatPKR } from "../config/constants";
import { ArrowLeft, ShieldCheck, Truck, Store, MessageSquare } from "lucide-react";

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products, settings } = useStore();

  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The requested phone may have been updated or removed from the catalog.
        </p>
        <Link 
          to="/mobiles" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Mobiles</span>
        </Link>
      </div>
    );
  }

  // Related products (same brand or price tier, exclude current)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brandId === product.brandId || Math.abs(p.price - product.price) < 40000))
    .slice(0, 4);

  const price = product.variants?.[0]?.price || product.price;

  return (
    <>
      <Helmet>
        <title>{`${product.name} Price in Pakistan - Rs. ${price.toLocaleString()} | IMC Mobile Bank`}</title>
        <meta 
          name="description" 
          content={`Buy 100% genuine PTA approved ${product.name} at IMC Mobile Bank Hyderabad. Official brand warranty, fast WhatsApp order, best rate in Pakistan.`} 
        />
        <meta property="og:title" content={`${product.name} - IMC Mobile Bank`} />
        <meta property="og:description" content={`Official price: Rs. ${price.toLocaleString()}. Order now on WhatsApp: 0333-2621231.`} />
        <meta property="og:image" content={product.images?.[0] || ""} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Mobiles", link: "/mobiles" },
            { label: product.brandName, link: `/brand/${product.brandId}` },
            { label: product.name, link: "" }
          ]}
        />

        {/* Product Top Grid: Gallery on left, Variant/Order on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
          <div className="lg:col-span-6 sticky top-24">
            <ImageGallery 
              images={product.images} 
              productName={product.name} 
              discountPercent={
                product.oldPrice && product.oldPrice > price
                  ? Math.round(((product.oldPrice - price) / product.oldPrice) * 100)
                  : null
              }
            />
          </div>

          <div className="lg:col-span-6">
            <VariantSelector product={product} />
          </div>
        </div>

        {/* Detailed Specs & Highlights */}
        <div className="my-10">
          <SpecsTable product={product} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="my-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Customers Also Viewed
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Similar phones from {product.brandName} and popular models in stock
                </p>
              </div>
              <Link 
                to={`/brand/${product.brandId}`}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
              >
                View more {product.brandName} →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
