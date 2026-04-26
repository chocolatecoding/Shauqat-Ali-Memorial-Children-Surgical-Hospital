"use client";

import Link from "next/link";
import { ChevronRight, Microscope, Clock, CheckCircle2, Package } from "lucide-react";

const packages = [
  { name: "Basic Health Package", tests: ["CBC", "Blood Sugar", "Urinalysis"], price: "Rs. 2,500", duration: "2 hours" },
  { name: "Full Body Checkup", tests: ["CBC", "Lipid Profile", "LFT", "KFT", "Blood Sugar"], price: "Rs. 5,000", duration: "4 hours" },
  { name: "Cardiac Profile", tests: ["Lipid Profile", "ECG", "Troponin", "CRP"], price: "Rs. 4,500", duration: "3 hours" },
  { name: "Diabetic Panel", tests: ["HbA1c", "Blood Sugar", "Lipid Profile", "KFT"], price: "Rs. 3,800", duration: "3 hours" },
];

export default function ComprehensiveLabPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-orange-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Comprehensive Lab</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Laboratory Testing</h1>
          <p className="text-lg text-orange-100 max-w-2xl">Full spectrum diagnostic testing under one roof</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
              </div>
              <div className="mb-4">
                {pkg.tests.map((test, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {test}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{pkg.price}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {pkg.duration}</p>
                </div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}