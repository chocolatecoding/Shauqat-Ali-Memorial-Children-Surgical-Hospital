"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, ArrowLeft, CheckCircle2, AlertCircle, Key, Clock } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

export default function PatientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [patientId, setPatientId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Send OTP - Call Flask Backend
  const sendOTP = async () => {
    if (!email || !patientId) {
      setError("Please enter both email and Patient ID");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call Flask backend API
      const response = await fetch(`${API_BASE}/patient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, patient_id: patientId }),
      });

      const data = await response.json();

      if (data.success) {
        // Store temp token for OTP verification
        sessionStorage.setItem("tempEmail", email);
        sessionStorage.setItem("tempToken", data.temp_token);
        setShowOtpField(true);
        setTimeLeft(60);
        setCanResend(false);
        setError("");
        setOtp("");
      } else {
        setError(data.error || "Invalid credentials. Please check your email and Patient ID.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      setError("Network error. Make sure backend is running on port 5000");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    if (!canResend) return;
    
    const tempToken = sessionStorage.getItem("tempToken");
    if (!tempToken) {
      setError("Session expired. Please login again.");
      setShowOtpField(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/patient/resend-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tempToken}`
        },
      });

      const data = await response.json();

      if (data.success) {
        setTimeLeft(60);
        setCanResend(false);
        setError("");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP - Call Flask Backend
  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    const tempEmail = sessionStorage.getItem("tempEmail");
    if (!tempEmail) {
      setError("Session expired. Please login again.");
      setShowOtpField(false);
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/patient/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email: tempEmail }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.removeItem("tempEmail");
        sessionStorage.removeItem("tempToken");
        router.push("/patient/dashboard");
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Brand Section */}
      <div className="relative flex-1 bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center py-20 px-6 md:p-8 lg:p-12 overflow-hidden">
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
            Welcome Back!
          </h1>
          <p className="text-white/90 text-sm md:text-base mb-6 text-left leading-relaxed">
            Your medical reports, simplified with artificial intelligence.
            Access your health information securely and effortlessly.
          </p>

          <div className="space-y-3 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>AI-Powered Summaries</span>
            </div>
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Voice Explanations</span>
            </div>
            <div className="flex items-center gap-3 text-white/95 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>24/7 Secure Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md animate-fade-in-right">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {showOtpField ? "Verify OTP" : "Patient Login"}
            </h2>
            <p className="text-gray-500 text-sm">
              {showOtpField 
                ? `Enter the 6-digit code sent to ${sessionStorage.getItem("tempEmail") || email}`
                : "Sign in to continue to your dashboard"
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {!showOtpField ? (
            <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-800"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Patient ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter your Patient ID"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-800"
                    required
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  You received this ID via email after registration
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOTP} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Enter OTP Code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setOtp(value);
                      setError("");
                    }}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-gray-800"
                    autoFocus
                    disabled={isVerifying}
                  />
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className={`w-4 h-4 ${timeLeft > 0 ? "text-red-500" : "text-gray-400"}`} />
                    <span className={timeLeft > 0 ? "text-red-500 font-medium" : "text-gray-500"}>
                      {timeLeft > 0 ? `${formatTime(timeLeft)} remaining` : "OTP expired"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resendOTP}
                    disabled={!canResend || isLoading}
                    className={`text-sm font-medium transition-all ${
                      canResend 
                        ? "text-red-600 hover:text-red-700 hover:underline" 
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? "Sending..." : "Resend OTP"}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowOtpField(false);
                  setOtp("");
                  setTimeLeft(0);
                  setError("");
                  sessionStorage.removeItem("tempEmail");
                  sessionStorage.removeItem("tempToken");
                }}
                className="w-full text-gray-500 text-sm py-2 hover:text-gray-700 transition-colors"
              >
                ← Back to Login
              </button>

              <button
                type="submit"
                disabled={isVerifying || !otp || otp.length !== 6}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Having trouble? Contact support at{" "}
              <a href="mailto:support@smartreport.com" className="text-red-500 hover:underline">
                support@smartreport.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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