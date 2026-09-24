import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { StoreProvider } from "./context/StoreContext";

// Public Components
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { CartDrawer } from "./components/common/CartDrawer";
import { WhatsAppModal } from "./components/common/WhatsAppModal";
import { FloatingWhatsApp } from "./components/common/FloatingWhatsApp";

// Public Pages
import { HomePage } from "./pages/HomePage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin Pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminProductForm } from "./pages/admin/AdminProductForm";
import { AdminPriceEditor } from "./pages/admin/AdminPriceEditor";
import { AdminBulkImport } from "./pages/admin/AdminBulkImport";
import { AdminBrands } from "./pages/admin/AdminBrands";
import { AdminBanners } from "./pages/admin/AdminBanners";
import { AdminSettings } from "./pages/admin/AdminSettings";

// Public Layout
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8] text-[#212529]">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer />
      <WhatsAppModal />
      <FloatingWhatsApp />
    </div>
  );
};

// Protected Admin Route
const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm font-semibold">
        Verifying admin authorization...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout />;
};

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/mobiles" element={<ProductListingPage />} />
                <Route path="/brand/:slug" element={<ProductListingPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedAdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
                <Route path="prices" element={<AdminPriceEditor />} />
                <Route path="import" element={<AdminBulkImport />} />
                <Route path="brands" element={<AdminBrands />} />
                <Route path="banners" element={<AdminBanners />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
