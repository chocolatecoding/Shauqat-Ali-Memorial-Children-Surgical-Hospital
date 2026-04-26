"use client";

import Link from "next/link";
import { ChevronRight, Droplet, Clock } from "lucide-react";

const bloodTests = [
  { name: "Complete Blood Count (CBC)", description: "Complete blood cell analysis", price: "Rs. 800", duration: "15 mins" },
  { name: "Lipid Profile", description: "Cholesterol and triglycerides", price: "Rs. 1,200", duration: "15 mins" },
  { name: "Liver Function Test (LFT)", description: "Liver enzyme analysis", price: "Rs. 1,500", duration: "20 mins" },
  { name: "Kidney Function Test (KFT)", description: "Creatinine, urea, uric acid", price: "Rs. 1,200", duration: "15 mins" },
  { name: "Thyroid Profile", description: "T3, T4, TSH levels", price: "Rs. 1,800", duration: "20 mins" },
  { name: "Vitamin D Test", description: "Vitamin D level analysis", price: "Rs. 2,500", duration: "15 mins" },
  { name: "Vitamin B12 Test", description: "Vitamin B12 level analysis", price: "Rs. 1,800", duration: "15 mins" },
  { name: "HbA1c", description: "Blood sugar average (3 months)", price: "Rs. 1,200", duration: "15 mins" },
];

export default function BloodTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-green-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blood Tests</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blood Tests</h1>
          <p className="text-lg text-green-100 max-w-2xl">Comprehensive blood analysis for accurate diagnosis</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {bloodTests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-8 mt-1">{test.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-8 mt-1"><Clock className="w-3 h-3" /> {test.duration}</span>
              </div>
              <p className="text-lg font-bold text-green-600">{test.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}