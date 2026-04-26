"use client";

import Link from "next/link";
import { ChevronRight, Baby, Clock, Heart } from "lucide-react";

const pediatricsServices = [
  { name: "Child Checkup", description: "Regular health monitoring", price: "Rs. 1,500", duration: "30 mins" },
  { name: "Vaccinations", description: "Complete immunization schedule", price: "Varies", duration: "20 mins" },
  { name: "Pediatric Consultation", description: "Expert child specialist consultation", price: "Rs. 2,000", duration: "30 mins" },
  { name: "Growth Assessment", description: "Height, weight, development tracking", price: "Rs. 1,000", duration: "20 mins" },
  { name: "Nutrition Counseling", description: "Child nutrition guidance", price: "Rs. 1,500", duration: "30 mins" },
];

export default function PediatricsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-teal-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Pediatrics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pediatrics Services</h1>
          <p className="text-lg text-teal-100 max-w-2xl">Specialized healthcare for children</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {pediatricsServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <Baby className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-14">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-14 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-teal-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}