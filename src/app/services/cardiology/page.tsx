"use client";

import Link from "next/link";
import { ChevronRight, Heart, Clock, Activity, Stethoscope } from "lucide-react";

const cardiologyServices = [
  { name: "ECG", description: "Heart rhythm analysis", price: "Rs. 1,200", duration: "15 mins" },
  { name: "Echocardiography", description: "Heart ultrasound", price: "Rs. 4,500", duration: "30 mins" },
  { name: "Stress Test", description: "Heart function during exercise", price: "Rs. 3,500", duration: "45 mins" },
  { name: "Cardiac Consultation", description: "Expert cardiologist consultation", price: "Rs. 2,000", duration: "30 mins" },
  { name: "Holter Monitoring", description: "24-hour heart monitoring", price: "Rs. 5,000", duration: "24 hours" },
];

export default function CardiologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-red-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Cardiology</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cardiology Services</h1>
          <p className="text-lg text-red-100 max-w-2xl">Comprehensive heart care services</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {cardiologyServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-14">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-14 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-red-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}