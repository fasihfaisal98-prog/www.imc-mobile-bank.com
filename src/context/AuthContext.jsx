import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, isFirebaseConfigured } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext();

const LOCAL_AUTH_KEY = "imc_admin_auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local fallback auth
      try {
        const saved = localStorage.getItem(LOCAL_AUTH_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Local auth parse error:", e);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      return await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Demo / offline mode credentials
      // Allows shopkeeper to manage store immediately before setting up Firebase
      if (
        (email.trim().toLowerCase() === "admin@imcmobilebank.pk" || email.trim().toLowerCase() === "farhan@imcmobilebank.pk" || email.trim().toLowerCase() === "admin") &&
        password === "admin12345"
      ) {
        const fakeUser = {
          email: email.includes("@") ? email : "admin@imcmobilebank.pk",
          displayName: "Farhan Memon (Owner)",
          uid: "local_admin_123"
        };
        setUser(fakeUser);
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(fakeUser));
        return fakeUser;
      } else {
        throw new Error("Invalid email or password. Default demo login: admin@imcmobilebank.pk / admin12345");
      }
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    } else {
      localStorage.removeItem(LOCAL_AUTH_KEY);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
