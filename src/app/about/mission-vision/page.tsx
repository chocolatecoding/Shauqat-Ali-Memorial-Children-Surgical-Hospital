"use client";

import Link from "next/link";
import { ChevronRight, Heart, Award, Target, Eye, Star, Shield, Users, TrendingUp } from "lucide-react";

export default function MissionVisionPage() {
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
              <span className="text-white">Mission & Vision</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mission & Vision</h1>
            <p className="text-lg text-red-100">
              Our commitment to excellence in healthcare
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Mission</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To provide reliable, affordable, and high-quality healthcare services using modern medical 
                    technology and digital solutions that help patients access and understand their medical reports easily.
                  </p>
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Quality Care</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>Compassion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span>Innovation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Eye className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Vision</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To become a trusted healthcare center that combines advanced diagnostics, smart digital systems, 
                    and compassionate patient care to improve the health of the community.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>Excellence</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>Community First</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-purple-500" />
                      <span>Trusted Care</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Goals */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Strategic Goals</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Patient Excellence</h4>
                  <p className="text-gray-500 text-sm">Deliver exceptional patient experience through personalized care</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Clinical Excellence</h4>
                  <p className="text-gray-500 text-sm">Maintain highest standards of medical practice</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Digital Innovation</h4>
                  <p className="text-gray-500 text-sm">Leverage technology for better healthcare access</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Community Health</h4>
                  <p className="text-gray-500 text-sm">Contribute to community wellbeing through outreach</p>
                </div>
              </div>
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