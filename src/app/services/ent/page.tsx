"use client";

import Link from "next/link";
import { ChevronRight, Ear, Clock } from "lucide-react";

const entServices = [
  { name: "Ear Checkup & Diagnostics", description: "Hearing and ear health", price: "Rs. 1,500", duration: "20 mins" },
  { name: "Nose Checkup & Diagnostics", description: "Nasal and sinus health", price: "Rs. 1,500", duration: "20 mins" },
  { name: "Throat Checkup & Diagnostics", description: "Throat and voice health", price: "Rs. 1,500", duration: "20 mins" },
];

export default function EntServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">ENT Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ENT Services</h1>
          <p className="text-lg text-purple-100 max-w-2xl">Ear, Nose & Throat specialist care</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid gap-4">
          {entServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-purple-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}