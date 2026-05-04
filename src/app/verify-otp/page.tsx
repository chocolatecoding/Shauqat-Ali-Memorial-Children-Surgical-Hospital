"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Inner component that uses useSearchParams
function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from URL params or session storage
    const emailParam = searchParams?.get("email");
    const tempEmail = sessionStorage.getItem("tempEmail");

    if (emailParam) {
      setEmail(emailParam);
    } else if (tempEmail) {
      setEmail(tempEmail);
    } else {
      router.push("/patient/login");
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/patient/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.removeItem("tempEmail");
        sessionStorage.removeItem("tempToken");
        router.push("/patient/dashboard");
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const tempToken = sessionStorage.getItem("tempToken");
    if (!tempToken) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/patient/resend-otp", {
        method: "POST",
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      if (res.ok) {
        alert("OTP resent successfully!");
      }
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Verify OTP</h1>
        <p className="text-center text-gray-600 mb-6">Enter OTP sent to {email}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="000000"
              className="w-full px-3 py-2 text-center text-2xl tracking-widest border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-red-600 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link href="/patient/login" className="text-sm text-gray-500 hover:text-red-600">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyOTPLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<VerifyOTPLoading />}>
      <VerifyOTPContent />
    </Suspense>
  );
}