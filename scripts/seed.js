/**
 * IMC Mobile Bank - Firestore Database Seed Script
 * 
 * Usage:
 *   node scripts/seed.js
 * 
 * Prerequisites:
 *   Ensure .env or system environment variables are set with:
 *   VITE_FIREBASE_API_KEY
 *   VITE_FIREBASE_AUTH_DOMAIN
 *   VITE_FIREBASE_PROJECT_ID
 *   VITE_FIREBASE_STORAGE_BUCKET
 *   VITE_FIREBASE_MESSAGING_SENDER_ID
 *   VITE_FIREBASE_APP_ID
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

// Load environment variables from .env or .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

import { INITIAL_PRODUCTS } from "../src/data/initialProducts.js";
import { INITIAL_BRANDS_LIST, DEFAULT_SETTINGS } from "../src/config/constants.js";
import { INITIAL_BANNERS } from "../src/data/initialBanners.js";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("❌ Firebase configuration not found in .env!");
  console.log("Please copy .env.example to .env and provide your Firebase project credentials.");
  process.exit(1);
}

console.log(`Connecting to Firebase Project: ${firebaseConfig.projectId}...`);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedFirestore() {
  console.log("🚀 Starting Firestore database seeding for IMC Mobile Bank...");

  try {
    // 1. Seed Settings
    console.log("Seeding store settings & contact information...");
    await setDoc(doc(db, "settings", "store_config"), {
      ...DEFAULT_SETTINGS,
      updatedAt: new Date().toISOString()
    });

    // 2. Seed Brands (Samsung #1)
    console.log("Seeding brand sequence (Samsung locked #1)...");
    for (const brand of INITIAL_BRANDS_LIST) {
      await setDoc(doc(db, "brands", brand.id), brand);
    }

    // 3. Seed Banners
    console.log("Seeding hero banner slides...");
    for (const banner of INITIAL_BANNERS) {
      await setDoc(doc(db, "banners", banner.id), banner);
    }

    // 4. Seed Products in Batches of 20
    console.log(`Seeding ${INITIAL_PRODUCTS.length} mobile phone models...`);
    const batchSize = 20;
    for (let i = 0; i < INITIAL_PRODUCTS.length; i += batchSize) {
      const batch = writeBatch(db);
      const chunk = INITIAL_PRODUCTS.slice(i, i + batchSize);
      for (const prod of chunk) {
        const ref = doc(db, "products", prod.id);
        batch.set(ref, {
          ...prod,
          updatedAt: new Date().toISOString()
        });
      }
      await batch.commit();
      console.log(`   Uploaded batch ${Math.floor(i / batchSize) + 1} (${chunk.length} phones)`);
    }

    console.log("✅ FIRESTORE SEEDING COMPLETED SUCCESSFULLY!");
    console.log(`Total Products: ${INITIAL_PRODUCTS.length}`);
    console.log(`Total Brands: ${INITIAL_BRANDS_LIST.length}`);
    console.log(`Total Banners: ${INITIAL_BANNERS.length}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Firestore seeding failed:", error);
    process.exit(1);
  }
}

seedFirestore();
