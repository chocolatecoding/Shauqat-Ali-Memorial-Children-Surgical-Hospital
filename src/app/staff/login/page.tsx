"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Use window.location.href for hard redirect
        window.location.href = "/staff/dashboard";
      } else {
        setError(data.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Cannot connect to server. Make sure backend is running on port 5000");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Brand Section */}
      <div className="relative flex-1 bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center py-16 p-6 md:p-8 lg:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 animate-spin-slow"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='white' d='M20,20 L80,20 L80,80 L20,80 Z'/%3E%3Ccircle cx='50' cy='50' r='10'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '60px',
            }}
          />
        </div>

        <Link
          href="/"
          className="absolute top-5 left-5 md:top-8 md:left-8 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all hover:-translate-x-1 z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="relative z-10 max-w-md w-full animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 text-left">
            Staff Portal
          </h1>
          <p className="text-white/90 text-sm md:text-base mb-6 text-left leading-relaxed">
            Secure access for authorized hospital staff members to manage patient reports.
          </p>

          <div className="space-y-3 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Manage Patient Reports</span>
            </div>
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Upload Medical Records</span>
            </div>
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Generate Patient IDs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md animate-fade-in-right">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Staff Login
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to access staff dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Hospital Email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Please wait..." : "Staff Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-red-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out; }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  );
}