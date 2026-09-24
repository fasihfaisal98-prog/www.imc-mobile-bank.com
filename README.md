# IMC Mobile Bank (imcmobilebank) — E-Commerce Website & Admin Panel

A production-ready e-commerce web platform and shopkeeper management system for **IMC Mobile Bank** (The Name of Trust), located in Cantt Saddar, Hyderabad, Sindh, Pakistan.

Inspired by PriceOye's modern white interface, this application features a dedicated **WhatsApp ordering workflow** (no online payment or checkout gateway required), mobile-first responsive architecture, PTA approved phone catalog, and a comprehensive, zero-code administrative portal for shop proprietor **Farhan Memon**.

---

## 📱 Features Overview

### 1. Public Storefront (PriceOye-Style)
- **Top Announcement Bar**: Editable ticker with instant WhatsApp and store visit quick links.
- **Sticky Header with Live Autocomplete**: Real-time search by brand, model name, and chipset with instant preview dropdown.
- **Category & Brand Nav (Samsung #1 Priority)**: Samsung is permanently locked to position #1, followed by Redmi/Xiaomi, Infinix, Tecno, and Nubia/ZTE.
- **Hero Banner Slider**: Dynamic promotional carousel highlighting Samsung Galaxy A27 5G, Infinix Hot 70, Tecno Camon 50 Pro, nubia V80 MAX, and S26 Ultra.
- **Brand Row**: Quick brand navigation with official logos and live model counters.
- **Categorized Sections**:
  - Samsung Mobiles (Always first)
  - Trending Best Sellers
  - Fresh New Arrivals
  - Redmi & Xiaomi
  - Infinix Hot & Note
  - Tecno Camon & Spark
  - Nubia & ZTE
  - Shop by Budget (Under 30K / 30K–50K / 50K–100K / 100K+)
- **Product Card**: High-resolution image, discount percentages, official PTA badges, RAM/ROM tag, and quick WhatsApp order CTA.
- **Product Detail Page**: Multi-angle image zoom gallery, interactive RAM/Storage variant selector, color selector, quantity counter, technical specifications table, highlights, and related models.
- **Showroom Showcase**: Actual photographs of the IMC Mobile Bank outlet at Shifa Paradise, Cantt Saddar, Hyderabad.
- **Floating WhatsApp Button**: Bottom-right floating pulse button for direct chat with Farhan Memon.

### 2. WhatsApp Direct Order Flow
- **Direct Order Button**: Present on every phone card and product detail page.
- **Customer Verification Modal**: Collects Name, WhatsApp Number, and City/Delivery Address before launching WhatsApp.
- **Pre-filled Message Generator**: Auto-constructs URL-encoded messages to WhatsApp number `923332621231`:
  ```text
  Hello IMC Mobile Bank, I want to order:
  Product: Samsung Galaxy A27 5G
  Variant: 8GB + 256GB (Awesome Iceblue)
  Price: Rs. 119,999
  Quantity: 1
  Link: https://imcmobilebank.pk/product/samsung-galaxy-a27-5g

  Customer Details:
  Name: Farhan Memon
  Phone: 0333-2621231
  City/Address: Cantt Saddar, Hyderabad
  ```
- **Cart Drawer**: Multi-item basket saved to `localStorage` with a single "Send Entire Order on WhatsApp" button.

### 3. Non-Technical Shopkeeper Admin Panel (`/admin`)
- **Dashboard**: Live counters for total products, brands, out-of-stock alerts, and fast navigation shortcuts.
- **Product Manager**: Search, filter by brand/stock, duplicate, toggle availability, and edit products.
- **Friendly Add/Edit Form**: Large inputs, auto-generated URL slugs, Cloudinary image upload, variant matrix, custom specs generator, and **Internal Dealer Price** (strictly hidden from public view).
- **Quick Daily Price Editor**: Spreadsheet-style bulk rate editor where the shopkeeper updates retail prices, strike prices, dealer rates, and stock status across dozens of phones in 1 click.
- **Bulk CSV Import**: Downloadable CSV template and PapaParse validation with preview table.
- **Brand Prioritizer**: Reorder brands with Samsung locked at #1.
- **Banner Slider Manager**: Add and manage promotional carousel slides.
- **Settings**: WhatsApp recipient number (`03332621231`), customizable message templates, announcement text, shop physical address, and SEO metadata.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **Routing**: React Router DOM (v7)
- **SEO**: react-helmet-async
- **Data Persistence**: Firebase Firestore with local fallback mode
- **Authentication**: Firebase Auth (Email & Password)
- **Media Uploads**: Cloudinary unsigned upload + URL fallback
- **CSV Engine**: PapaParse

---

## 🚀 Getting Started

### 1. Installation
Navigate into the project directory and install dependencies:
```bash
cd imcmobilebank
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔐 Admin Panel Access

- **URL**: `http://localhost:5173/admin/login`
- **Default Email**: `admin@imcmobilebank.pk`
- **Default Password**: `admin12345`

*Note: The platform includes a fallback mode that allows the shopkeeper to use the complete admin panel and edit prices right away, even before setting up Firebase credentials.*

---

## 🔥 Firebase Setup Guide (Production)

### 1. Create a Firebase Project
1. Visit the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Name the project `imcmobilebank` (or your preferred name) and disable Google Analytics (optional).

### 2. Enable Firestore Database
1. Go to **Build** → **Firestore Database** → **Create Database**.
2. Select **Start in production mode** and pick your preferred location (e.g. `asia-south1`).
3. Under the **Rules** tab, paste the contents of `firestore.rules`:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /brands/{brandId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /banners/{bannerId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /settings/{settingId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```
4. Click **Publish**.

### 3. Enable Email/Password Authentication
1. Go to **Build** → **Authentication** → **Get Started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Under the **Users** tab, click **Add user** and enter:
   - Email: `admin@imcmobilebank.pk`
   - Password: `your-secure-password`

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=imcmobilebank.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=imcmobilebank
VITE_FIREBASE_STORAGE_BUCKET=imcmobilebank.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:...

# Cloudinary (Optional, for unsigned uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=imcmobile_unsigned
```

### 5. Seed Firestore with Initial 48 Mobile Phones
Run the automated seed script to populate Firestore with all Samsung, Redmi/Xiaomi, Infinix, Tecno, and Nubia models:
```bash
node scripts/seed.js
```

---

## ☁️ Deployment Guide

### Deploying to Vercel
1. Install the Vercel CLI or import the repository via [vercel.com](https://vercel.com).
2. Configure the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. In **Environment Variables**, add all keys from your `.env` file.
4. Deploy!

### Deploying to Netlify
1. Create a `_redirects` file in `public/` (or use Vite build output):
   ```text
   /*    /index.html   200
   ```
2. Set the build command to `npm run build` and publish directory to `dist`.
3. Add your environment variables in Netlify site settings.

---

## 📍 Store Information

- **Business Name**: IMC Mobile Bank (The Name of Trust)
- **Proprietor**: Farhan Memon
- **WhatsApp / Call**: `03332621231` (`wa.me/923332621231`)
- **Email**: `imcmobilebank@gmail.com`
- **Address**: Shop # 9/10, Shifa Paradise, near Belair Hospital, opposite Kachailo Bungalow, near Mr Wari Chat, Cantt Saddar, Hyderabad, Sindh.
