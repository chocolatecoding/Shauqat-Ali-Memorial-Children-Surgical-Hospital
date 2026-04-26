"use client";

import Link from "next/link";
import { ChevronRight, Microscope, Clock } from "lucide-react";

const labServices = [
  { name: "Blood Tests (All Types)", description: "Complete blood count and more", price: "Rs. 800 - 5,000", duration: "15 mins" },
  { name: "Urine Tests (All Types)", description: "Urinalysis and culture", price: "Rs. 500 - 2,000", duration: "10 mins" },
  { name: "ECG / Electrocardiogram", description: "Heart rhythm monitoring", price: "Rs. 1,200", duration: "15 mins" },
  { name: "Comprehensive Laboratory Testing", description: "Full spectrum diagnostic testing", price: "Rs. 5,000 - 15,000", duration: "45 mins" },
];

export default function LaboratoryServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-green-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Laboratory Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Laboratory Services</h1>
          <p className="text-lg text-green-100 max-w-2xl">Comprehensive diagnostic testing services</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {labServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-green-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}