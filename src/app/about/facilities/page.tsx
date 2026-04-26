"use client";

import { Activity, Heart, Microscope, Stethoscope, Brain, Bone, Droplet, Eye, Phone } from "lucide-react";

const facilities = [
  {
    name: "Digital X-Ray",
    description: "Low radiation digital imaging for accurate diagnosis",
    icon: Bone,
    features: ["Dental X-rays", "Chest X-rays", "Spine X-rays", "Bone X-rays"]
  },
  {
    name: "Ultrasound",
    description: "High-definition ultrasound for detailed imaging",
    icon: Droplet,
    features: ["Abdominal", "Pelvic", "Obstetric", "Doppler"]
  },
  {
    name: "Laboratory",
    description: "Comprehensive diagnostic testing services",
    icon: Microscope,
    features: ["Blood Tests", "Urine Tests", "ECG", "Pathology"]
  },
  {
    name: "Emergency Care",
    description: "24/7 emergency medical services",
    icon: Heart,
    features: ["Trauma Care", "Critical Care", "Ambulance", "ICU"]
  },
  {
    name: "Operation Theater",
    description: "Modern surgical facilities",
    icon: Activity,
    features: ["General Surgery", "Laparoscopic", "Orthopedic", "ENT"]
  },
  {
    name: "Patient Rooms",
    description: "Comfortable and clean patient accommodations",
    icon: Stethoscope,
    features: ["Private Rooms", "Semi-private", "ICU Beds", "Recovery Area"]
  }
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Facilities</h1>
          <p className="text-red-100 max-w-2xl mx-auto">
            State-of-the-art medical facilities for quality healthcare
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <facility.icon className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{facility.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {facility.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-linear-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">24/7 Emergency Services</h2>
          <p className="text-red-100 mb-6">Immediate medical assistance available round the clock</p>
          <a href="tel:03480639599" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            <Phone className="w-4 h-4" />
            Call Emergency: 03480639599
          </a>
        </div>
      </section>
    </div>
  );
}