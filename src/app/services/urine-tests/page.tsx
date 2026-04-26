"use client";

import Link from "next/link";
import { ChevronRight, Droplets, Clock, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const urineTests = [
  { 
    name: "Urinalysis (Complete)", 
    description: "Complete urine analysis including physical, chemical, and microscopic examination", 
    price: "Rs. 500", 
    duration: "15 mins",
    preparation: "No special preparation required",
    includes: ["Color and appearance", "Specific gravity", "pH level", "Protein", "Glucose", "Ketones", "Blood", "Microscopic analysis"]
  },
  { 
    name: "Urine Culture & Sensitivity", 
    description: "Detects bacterial infection and identifies effective antibiotics", 
    price: "Rs. 1,200", 
    duration: "48-72 hours",
    preparation: "Clean catch mid-stream sample required",
    includes: ["Bacterial identification", "Antibiotic sensitivity test", "Colony count"]
  },
  { 
    name: "Microalbumin", 
    description: "Early detection of kidney damage, especially in diabetic patients", 
    price: "Rs. 800", 
    duration: "15 mins",
    preparation: "First morning sample preferred",
    includes: ["Albumin-creatinine ratio", "Microalbumin level"]
  },
  { 
    name: "Urine Pregnancy Test", 
    description: "Quick and accurate pregnancy detection", 
    price: "Rs. 300", 
    duration: "5 mins",
    preparation: "First morning urine sample gives best results",
    includes: ["hCG hormone detection", "Pregnancy confirmation"]
  },
  { 
    name: "Urine Drug Screen", 
    description: "Detection of drugs and substances in urine", 
    price: "Rs. 1,500", 
    duration: "20 mins",
    preparation: "No special preparation required",
    includes: ["Multiple drug panel", "Confirmation testing available"]
  },
  { 
    name: "24-Hour Urine Collection", 
    description: "Quantitative analysis of various substances over 24 hours", 
    price: "Rs. 1,800", 
    duration: "24 hours collection",
    preparation: "Collect all urine for 24 hours in provided container",
    includes: ["Creatinine clearance", "Protein quantification", "Electrolytes"]
  },
  { 
    name: "Urine Electrolytes", 
    description: "Measures sodium, potassium, and chloride levels in urine", 
    price: "Rs. 600", 
    duration: "15 mins",
    preparation: "Random or 24-hour collection as advised",
    includes: ["Sodium", "Potassium", "Chloride"]
  },
  { 
    name: "Urine Protein (Spot)", 
    description: "Protein detection for kidney function assessment", 
    price: "Rs. 400", 
    duration: "10 mins",
    preparation: "Random sample acceptable",
    includes: ["Protein quantification", "Protein-creatinine ratio"]
  },
];

export default function UrineTestsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-teal-200 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services/laboratory" className="hover:text-white">Laboratory</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Urine Tests</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Urine Tests</h1>
          <p className="text-lg text-teal-100 max-w-2xl">
            Comprehensive urine analysis for accurate diagnosis of kidney function, infections, and metabolic disorders
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 container mx-auto px-4">
        <div className="space-y-6">
          {urineTests.map((test, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{test.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 ml-0 md:ml-15">{test.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-3 ml-0 md:ml-15">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-500">{test.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-500">Accurate Results</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold text-teal-600">{test.price}</p>
                    <Link href="/patient/login">
                      <Button className="mt-2 bg-teal-600 hover:bg-teal-700 rounded-full px-6 text-sm">
                        Book Test
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Includes Section */}
              <div className="bg-teal-50 px-6 py-4 border-t border-teal-100">
                <div className="flex flex-wrap gap-4">
                  <span className="text-sm font-medium text-teal-800">Test Includes:</span>
                  {test.includes.map((item, idx) => (
                    <span key={idx} className="text-xs text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-teal-600">
                  <span className="font-medium">Preparation: </span>
                  {test.preparation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preparation Tips for Urine Test</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Do's
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Drink adequate water before test</li>
                  <li>• Inform your doctor about medications</li>
                  <li>• Use sterile container provided by lab</li>
                  <li>• Follow clean catch technique if instructed</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Don'ts
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Don't use first morning urine unless specified</li>
                  <li>• Don't contaminate sample with toilet paper</li>
                  <li>• Don't delay sample submission beyond 1 hour</li>
                  <li>• Don't consume excessive fluids before test</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need a Urine Test?</h2>
          <p className="text-teal-100 mb-6">Book your appointment online or call our laboratory</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/patient/login">
              <Button className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Book Online
              </Button>
            </Link>
            <a href="tel:03480639599">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Phone className="w-4 h-4 mr-2" />
                Call: 03480639599
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}