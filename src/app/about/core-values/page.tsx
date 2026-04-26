"use client";

import Link from "next/link";
import { ChevronRight, Heart, Shield, Award, Stethoscope, Clock, Users, Sparkles, CheckCircle2 } from "lucide-react";

const coreValues = [
  {
    icon: Heart,
    title: "Patient Care",
    description: "Patients' health and safety are our top priority. We treat every patient with dignity, respect, and compassion.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We provide honest, transparent, and ethical medical services. Trust is the foundation of our practice.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We embrace modern technology like the Smart Report System to continuously improve healthcare services.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Award,
    title: "Quality",
    description: "We ensure accurate diagnosis and professional treatment through continuous quality improvement.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Clock,
    title: "Accessibility",
    description: "We provide healthcare services and support 24 hours a day, 7 days a week, ensuring care when you need it.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Users,
    title: "Compassion",
    description: "We treat every patient with respect, care, and empathy, understanding the human side of healthcare.",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
];

export default function CoreValuesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-red-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/about" className="hover:text-white">About</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Core Values</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h1>
            <p className="text-lg text-red-100">
              The principles that guide everything we do
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gray-600 text-lg">
                At Shaukat Ali Memorial Hospital, our core values shape our culture and guide our actions. 
                They represent what we stand for and what you can expect from us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="flex gap-4 p-6 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${value.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Value Statement */}
            <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Our Promise</h3>
              <p className="text-red-100 max-w-2xl mx-auto">
                We live by these values every day, ensuring that every patient receives the highest quality 
                care in a compassionate and respectful environment.
              </p>
            </div>

            {/* Back Button */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link href="/about" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                ← Back to About
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}