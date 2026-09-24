import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export const AdminLogin = () => {
  const { login, isFirebaseConfigured } = useAuth();
  const { settings } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@imcmobilebank.pk");
  const [password, setPassword] = useState("admin12345");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to login. Please check email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img
            src={settings.logoUrl || "/images/imc-logo.jpg"}
            alt="IMC Mobile Bank"
            className="h-12 w-auto mx-auto object-contain rounded bg-slate-50 p-1"
          />
          <h1 className="text-xl font-black text-slate-900">
            IMC Mobile Bank — Shopkeeper Portal
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to manage product prices, stock, and WhatsApp settings
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@imcmobilebank.pk"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
          >
            {submitting ? "Signing in..." : "Enter Shop Admin Panel"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Default Shopkeeper Credentials:</span>
          </div>
          <p>
            Email: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">Private for customers</code>
          </p>
          <p>
            Password: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">Private for customers</code>
          </p>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 underline">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
