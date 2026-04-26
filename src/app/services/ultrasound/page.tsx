"use client";

import Link from "next/link";
import { ChevronRight, Baby, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const ultrasoundServices = [
  { name: "Breast Ultrasound", description: "Breast tissue imaging", price: "Rs. 3,500", duration: "25 mins" },
  { name: "Gynecology and Obstetrics Cases", description: "Women's health imaging", price: "Rs. 4,000", duration: "30 mins" },
  { name: "Complete Liver, Gallbladder, Abdomen", description: "Full abdominal organ imaging", price: "Rs. 4,500", duration: "35 mins" },
  { name: "Kidney, Bladder, Prostate", description: "Urinary system imaging", price: "Rs. 3,800", duration: "25 mins" },
  { name: "Internal Gynecological & Urological", description: "Specialized internal imaging", price: "Rs. 4,200", duration: "30 mins" },
  { name: "Fetal Growth Monitoring", description: "Pregnancy and fetal development", price: "Rs. 5,000", duration: "40 mins" },
  { name: "Color Doppler Ultrasound", description: "Blood flow and vascular imaging", price: "Rs. 6,000", duration: "35 mins" },
];

export default function UltrasoundServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-pink-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Ultrasound Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ultrasound Services</h1>
          <p className="text-lg text-pink-100 max-w-2xl">High-definition ultrasound for detailed diagnosis</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {ultrasoundServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                </div>
              </div>
              <p className="text-lg font-bold text-pink-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}