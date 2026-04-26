"use client";

import Link from "next/link";
import { ChevronRight, Scan, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ctServices = [
  { name: "Head CT Scan", description: "Brain and skull imaging", price: "Rs. 8,000", duration: "20 mins" },
  { name: "Chest CT Scan", description: "Lung and heart imaging", price: "Rs. 10,000", duration: "25 mins" },
  { name: "Abdominal CT Scan", description: "Full abdominal organ imaging", price: "Rs. 12,000", duration: "30 mins" },
  { name: "Spine CT Scan", description: "Vertebral column imaging", price: "Rs. 9,000", duration: "25 mins" },
  { name: "Pelvic CT Scan", description: "Pelvic organ imaging", price: "Rs. 8,500", duration: "20 mins" },
];

export default function CtScanPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-cyan-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">CT Scan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CT Scan Services</h1>
          <p className="text-lg text-cyan-100 max-w-2xl">High-resolution computed tomography for detailed cross-sectional imaging</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {ctServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Scan className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                </div>
                <p className="text-sm text-gray-500 ml-14">{service.description}</p>
                <div className="flex items-center gap-3 mt-2 ml-14">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                </div>
              </div>
              <p className="text-lg font-bold text-cyan-600">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-cyan-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>Contrast dye may be required for certain scans. Please consult your doctor.</span>
          </div>
        </div>
      </section>
    </div>
  );
}