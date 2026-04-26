"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity,
  Heart,
  Stethoscope,
  Briefcase,
  Baby,
  Droplet,
  Ear,
  FileText,
  Wind,
  Bone,
  Brain,
  Camera,
  Microscope as MicroscopeIcon,
  CheckCircle2,
  Star,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Service categories data with prices
const serviceCategories = [
  {
    id: 1,
    title: "X-Ray Services",
    icon: Bone,
    description: "Advanced digital X-ray imaging for accurate diagnosis",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    services: [
      { name: "Dental X-rays", description: "Detailed imaging for teeth and jaw", price: "Rs. 1,500", icon: Camera },
      { name: "All Bone X-rays", description: "Complete skeletal imaging", price: "Rs. 2,000", icon: Bone },
      { name: "Chest X-rays", description: "Lung and heart imaging", price: "Rs. 1,800", icon: Heart },
      { name: "Spine X-rays", description: "Vertebral column imaging", price: "Rs. 2,500", icon: Activity },
      { name: "Skull X-rays", description: "Cranial imaging", price: "Rs. 2,200", icon: Brain },
      { name: "Intestinal X-rays", description: "Gastrointestinal imaging", price: "Rs. 2,800", icon: Droplet },
      { name: "Jaw X-rays", description: "TMJ and jaw bone imaging", price: "Rs. 1,800", icon: Camera },
      { name: "Digital X-ray", description: "Low radiation digital imaging", price: "Rs. 2,500", icon: Camera },
    ]
  },
  {
    id: 2,
    title: "Ultrasound Services",
    icon: Baby,
    description: "High-definition ultrasound for detailed diagnosis",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    services: [
      { name: "Breast Ultrasound", description: "Breast tissue imaging", price: "Rs. 3,500", icon: Heart },
      { name: "Gynecology and Obstetrics Cases", description: "Women's health imaging", price: "Rs. 4,000", icon: Baby },
      { name: "Complete Liver, Gallbladder, Abdomen", description: "Full abdominal organ imaging", price: "Rs. 4,500", icon: Activity },
      { name: "Kidney, Bladder, Prostate", description: "Urinary system imaging", price: "Rs. 3,800", icon: Droplet },
      { name: "Internal Gynecological & Urological", description: "Specialized internal imaging", price: "Rs. 4,200", icon: Stethoscope },
      { name: "Fetal Growth Monitoring", description: "Pregnancy and fetal development", price: "Rs. 5,000", icon: Baby },
      { name: "Color Doppler Ultrasound", description: "Blood flow and vascular imaging", price: "Rs. 6,000", icon: Activity },
    ]
  },
  {
    id: 3,
    title: "Laboratory Services",
    icon: MicroscopeIcon,
    description: "Comprehensive diagnostic testing services",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    services: [
      { name: "Blood Tests (All Types)", description: "Complete blood count and more", price: "Rs. 800 - 5,000", icon: Droplet },
      { name: "Urine Tests (All Types)", description: "Urinalysis and culture", price: "Rs. 500 - 2,000", icon: Droplet },
      { name: "ECG / Electrocardiogram", description: "Heart rhythm monitoring", price: "Rs. 1,200", icon: Heart },
      { name: "Comprehensive Laboratory Testing", description: "Full spectrum diagnostic testing", price: "Rs. 5,000 - 15,000", icon: MicroscopeIcon },
    ]
  },
  {
    id: 4,
    title: "ENT Services",
    icon: Ear,
    description: "Ear, Nose & Throat specialist care",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    services: [
      { name: "Ear Checkup & Diagnostics", description: "Hearing and ear health", price: "Rs. 1,500", icon: Ear },
      { name: "Nose Checkup & Diagnostics", description: "Nasal and sinus health", price: "Rs. 1,500", icon: Wind },
      { name: "Throat Checkup & Diagnostics", description: "Throat and voice health", price: "Rs. 1,500", icon: Activity },
    ]
  },
  {
    id: 5,
    title: "Comprehensive Medical Services",
    icon: Briefcase,
    description: "Complete healthcare solutions",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    services: [
      { name: "Full Diagnostics & Consultations", description: "Complete medical evaluation", price: "Rs. 3,000 - 10,000", icon: Stethoscope },
      { name: "Lab & Imaging Integration", description: "Seamless diagnostic integration", price: "Custom Package", icon: FileText },
      { name: "AI-Powered Smart Report Summaries", description: "Easy-to-understand reports", price: "Free with reports", icon: Brain },
    ]
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <Activity className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-semibold tracking-wide">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Comprehensive <span className="text-red-600">Medical Services</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            We offer a wide range of diagnostic and medical services using state-of-the-art technology at affordable prices
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {serviceCategories.map((category, idx) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(idx)}
              className={`group flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === idx
                  ? `${category.bgColor} ${category.textColor} shadow-lg scale-105`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <category.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{category.title}</span>
              <span className="sm:hidden">{category.title.split(" ")[0]}</span>
            </motion.button>
          ))}
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          {serviceCategories.map((category, idx) => (
            activeTab === idx && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Category Header */}
                <div className={`bg-linear-to-r ${category.color} p-6 md:p-8 text-white`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{category.title}</h3>
                        <p className="text-white/80 text-sm mt-1">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        {category.services.length} Services
                      </span>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.services.map((service, serviceIdx) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: serviceIdx * 0.05 }}
                        className="group border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-red-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center shrink-0`}>
                            <service.icon className={`w-5 h-5 ${category.textColor}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                              {service.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                            <div className="mt-3">
                              <span className="font-bold text-red-600">{service.price}</span>
                              {service.price === "Custom Package" && (
                                <span className="text-xs text-gray-400 ml-1">(Contact for details)</span>
                              )}
                              {service.price === "Free with reports" && (
                                <span className="text-xs text-green-600 ml-1">✓ Included</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA - Only View All Services */}
                <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2 mt-[-5]">
                    
                      <p className="text-sm text-gray-600">
                        All prices include professional fees and basic reports
                      </p>
                    </div>
                    <Link href={"/services"}>
                    <Button variant="outline" className="rounded-md text-sm py-6 px-5 border-red-600 text-red-600 hover:bg-red-50">
                      <Star className="w-4 h-4 mr-2" />
                      View All Services
                    </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Why choose us?</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Modern Equipment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Expert Doctors</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Affordable Care</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>24/7 Emergency</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Insurance Accepted</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}