"use client";

import Link from "next/link";
import { ChevronRight, Brain, Clock } from "lucide-react";

const neurologyServices = [
  { name: "Brain MRI", description: "Detailed brain imaging", price: "Rs. 15,000", duration: "45 mins" },
  { name: "EEG", description: "Brain electrical activity", price: "Rs. 3,500", duration: "60 mins" },
  { name: "Nerve Conduction Study", description: "Nerve function testing", price: "Rs. 4,500", duration: "45 mins" },
  { name: "Neurological Consultation", description: "Expert neurologist consultation", price: "Rs. 2,500", duration: "30 mins" },
  { name: "Headache Management", description: "Migraine and headache treatment", price: "Rs. 2,000", duration: "30 mins" },
];

export default function NeurologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-purple-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Neurology</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Neurology Services</h1>
          <p className="text-lg text-purple-100 max-w-2xl">Expert neurological care and diagnosis</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {neurologyServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-14">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-14 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-purple-600">{service.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}