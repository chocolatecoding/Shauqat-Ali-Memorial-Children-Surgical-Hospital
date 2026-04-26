"use client";

import Link from "next/link";
import { ChevronRight, Brain, Clock, AlertCircle } from "lucide-react";

const mriServices = [
  { name: "Brain MRI", description: "Brain and neurological imaging", price: "Rs. 15,000", duration: "45 mins" },
  { name: "Spine MRI", description: "Spinal cord and vertebrae imaging", price: "Rs. 12,000", duration: "40 mins" },
  { name: "Joint MRI", description: "Knee, shoulder, hip joint imaging", price: "Rs. 10,000", duration: "35 mins" },
  { name: "Abdominal MRI", description: "Liver, kidney, pancreas imaging", price: "Rs. 14,000", duration: "45 mins" },
  { name: "Cardiac MRI", description: "Heart and blood vessel imaging", price: "Rs. 18,000", duration: "60 mins" },
];

export default function MRIPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-indigo-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">MRI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MRI Services</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">Advanced magnetic resonance imaging for detailed soft tissue visualization</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {mriServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-14">{service.description}</p>
                <span className="text-xs text-gray-400 flex items-center gap-1 ml-14 mt-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-lg font-bold text-indigo-600">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span>Please inform the technician if you have any metal implants or claustrophobia.</span>
          </div>
        </div>
      </section>
    </div>
  );
}