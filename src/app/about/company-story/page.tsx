"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Award, Users, Building } from "lucide-react";

export default function CompanyStoryPage() {
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
              <span className="text-white">Company Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Company Story</h1>
            <p className="text-lg text-red-100">
              A journey of compassion, excellence, and commitment to quality healthcare
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-10">
              <Image
                src="/images/hospital-building.jpg"
                alt="Shaukat Ali Memorial Hospital"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Beginning</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Shaukat Ali Memorial Children & Surgical Hospital was founded in 2010 with a vision to provide 
                quality healthcare services to the community. What started as a small clinic has now grown into 
                a full-fledged hospital serving thousands of patients every year.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Our Journey</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Over the years, we have continuously expanded our services and facilities. From introducing 
                advanced diagnostic equipment to launching the Smart Report System, we have always embraced 
                innovation to improve patient care. Our team of dedicated doctors, nurses, and staff work 
                tirelessly to ensure every patient receives the best possible treatment.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-500">Patients Treated</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">15+</p>
                  <p className="text-sm text-gray-500">Years of Excellence</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">The Smart Report System</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To improve patient convenience and healthcare efficiency, we introduced the Smart Report System. 
                This digital platform allows patients to receive, view, and download their medical reports online 
                without visiting the hospital repeatedly. The system also provides AI-powered summaries that help 
                patients understand their health condition better.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Looking Ahead</h2>
              <p className="text-gray-600 leading-relaxed">
                As we look to the future, we remain committed to our mission of providing accessible, 
                affordable, and high-quality healthcare. We continue to invest in modern technology, 
                expand our services, and train our staff to meet the evolving needs of our community.
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