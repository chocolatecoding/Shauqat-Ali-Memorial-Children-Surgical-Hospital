"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Bone, Clock, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const xrayServices = [
  { name: "Dental X-rays", description: "Detailed imaging for teeth and jaw", price: "Rs. 1,500", duration: "15 mins" },
  { name: "All Bone X-rays", description: "Complete skeletal imaging", price: "Rs. 2,000", duration: "20 mins" },
  { name: "Chest X-rays", description: "Lung and heart imaging", price: "Rs. 1,800", duration: "15 mins" },
  { name: "Spine X-rays", description: "Vertebral column imaging", price: "Rs. 2,500", duration: "25 mins" },
  { name: "Skull X-rays", description: "Cranial imaging", price: "Rs. 2,200", duration: "20 mins" },
  { name: "Intestinal X-rays", description: "Gastrointestinal imaging", price: "Rs. 2,800", duration: "30 mins" },
  { name: "Jaw X-rays", description: "TMJ and jaw bone imaging", price: "Rs. 1,800", duration: "15 mins" },
  { name: "Digital X-ray", description: "Low radiation digital imaging", price: "Rs. 2,500", duration: "20 mins" },
];

export default function XRayServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">X-Ray Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">X-Ray Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Advanced digital X-ray imaging for accurate diagnosis with low radiation exposure
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {xrayServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {service.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need an X-Ray?</h2>
          <p className="text-gray-600 mb-6">Book your appointment today</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Schedule Appointment</Button>
        </div>
      </section>
    </div>
  );
}