"use client";

import Link from "next/link";
import { ChevronRight, Heart, Clock, Activity } from "lucide-react";

export default function ECGPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-red-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">ECG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ECG / Electrocardiogram</h1>
          <p className="text-lg text-red-100 max-w-2xl">Heart rhythm monitoring and analysis</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ECG Test</h2>
            <p className="text-gray-600 mb-4">Quick and painless heart health assessment</p>
            <div className="flex justify-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">Rs. 1,200</p>
                <p className="text-xs text-gray-500">Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">15 mins</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
            </div>
            <Link href="/patient/login">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold">
                Book Appointment
              </button>
            </Link>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              What to Expect
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Small electrodes will be attached to your chest, arms, and legs</li>
              <li>• The test takes about 10-15 minutes</li>
              <li>• No preparation required</li>
              <li>• Results are available immediately</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}