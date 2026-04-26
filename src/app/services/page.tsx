"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Bone, 
  Baby, 
  Microscope, 
  Ear, 
  Activity, 
  Heart, 
  Brain, 
  Droplet,
  ChevronRight,
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  {
    title: "X-Ray Services",
    href: "/services/x-ray",
    icon: Bone,
    description: "Advanced digital X-ray imaging for accurate diagnosis",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    services: ["Dental X-rays", "Chest X-rays", "Spine X-rays", "Bone X-rays"]
  },
  {
    title: "Ultrasound Services",
    href: "/services/ultrasound",
    icon: Baby,
    description: "High-definition ultrasound for detailed imaging",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    services: ["Breast Ultrasound", "Abdominal Ultrasound", "Pelvic Ultrasound", "Doppler Ultrasound"]
  },
  {
    title: "Laboratory Services",
    href: "/services/laboratory",
    icon: Microscope,
    description: "Comprehensive diagnostic testing services",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    services: ["Blood Tests", "Urine Tests", "ECG", "Pathology"]
  },
  {
    title: "ENT Services",
    href: "/services/ent",
    icon: Ear,
    description: "Ear, Nose & Throat specialist care",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    services: ["Ear Checkup", "Nose Checkup", "Throat Checkup", "Hearing Test"]
  },
  {
    title: "Cardiology",
    href: "/services/cardiology",
    icon: Heart,
    description: "Comprehensive heart care services",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    services: ["ECG", "Echocardiography", "Stress Test", "Cardiac Consultation"]
  },
  {
    title: "Neurology",
    href: "/services/neurology",
    icon: Brain,
    description: "Expert neurological care and diagnosis",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
    services: ["Brain Imaging", "Nerve Studies", "Neurological Consultation"]
  },
  {
    title: "Pediatrics",
    href: "/services/pediatrics",
    icon: Activity,
    description: "Specialized care for children",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
    services: ["Child Checkup", "Vaccinations", "Pediatric Consultation"]
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Medical Services</h1>
            <p className="text-lg text-red-100">
              Comprehensive healthcare services under one roof with modern technology and expert care
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((service, index) => (
            <Link href={service.href} key={index}>
              <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
                <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.textColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.services.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {item}
                    </span>
                  ))}
                  {service.services.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{service.services.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-red-600 font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-linear-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">24/7 Emergency Services</h2>
          <p className="text-red-100 mb-6">Immediate medical assistance available round the clock</p>
          <a href="tel:03480639599" className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Call Emergency: 03480639599
          </a>
        </div>
      </section>
    </div>
  );
}