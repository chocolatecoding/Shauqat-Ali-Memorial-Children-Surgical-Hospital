"use client";

import { useState, useEffect, useRef } from "react";
import { Star, GraduationCap, X, Calendar, Users, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

// Doctors Data
const doctors = [
  {
    id: 1,
    name: "Dr. JAHANZEB BAJWA",
    specialization: "HEAD & NECK SURGEON / PHYSICIAN",
    education: "MBBS, B.Sc, MCPS",
    description: "Dr. Jahanzeb Bajwa is a highly skilled Head & Neck Surgeon and Physician with extensive experience in treating complex head and neck conditions.",
    experience: "15+ years",
    rating: 4.9,
    patients: "3,500+",
    image: "/images/doctors/doctor1.png",
  },
  {
    id: 2,
    name: "Dr. MOHSIN ILLAHI",
    specialization: "CONSULTANT PEDIATRIC SURGEON",
    education: "MBBS, FCPS (Pediatric Surgery)",
    description: "Dr. Mohsin Illahi is a dedicated Consultant Pediatric Surgeon specializing in surgical care for infants, children, and adolescents.",
    experience: "12+ years",
    rating: 4.8,
    patients: "2,800+",
    image: "/images/doctors/doctor2.jpg",
  },
  {
    id: 3,
    name: "Dr. RANA SHAFIQ",
    specialization: "CONSULTANT DERMATOLOGIST",
    education: "MBBS, FCPS (Dermatology)",
    description: "Dr. Rana Shafiq is a distinguished Consultant Dermatologist with expertise in medical, surgical, and cosmetic dermatology.",
    experience: "10+ years",
    rating: 4.7,
    patients: "2,200+",
    image: "/images/doctors/doctor3.jpg",
  },
  {
    id: 4,
    name: "Dr. AHMED",
    specialization: "CONSULTANT ANESTHESIA",
    education: "MBBS, FCPS (Anesthesiology)",
    description: "Dr. Ahmed is an experienced Consultant Anesthesiologist specializing in perioperative care, pain management, and critical care.",
    experience: "8+ years",
    rating: 4.6,
    patients: "1,800+",
    image: "/images/doctors/doctor4.jpg",
  },
  {
    id: 5,
    name: "Dr. WAJEEHA SAFDAR",
    specialization: "D CONSULTANT RADIOLOGIST",
    education: "MBBS",
    description: "Dr. Wajeeha Safdar specializes in diagnostic imaging and radiology, providing accurate interpretations of X-rays, CT scans, and MRIs for precise medical diagnosis.",
    experience: "15+ years",
    rating: 4.9,
    patients: "3,200+",
    image: "/images/doctors/doctor5.jpg",
  },
  {
    id: 6,
    name: "Dr. MARIA MOHSIN",
    specialization: "PS CONSULTANT RADIOLOGIST",
    education: "MBBS",
    description: "Dr. Maria Mohsin is an expert in pediatric radiology, focusing on ultrasound and imaging techniques for children, ensuring safe and accurate diagnostic care.",
    experience: "11+ years",
    rating: 4.8,
    patients: "2,500+",
    image: "/images/doctors/doctor6.jpg",
  },
];

// Custom hook for scroll-triggered animation
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const getAnimationDelay = (index: number) => {
    return `${index * 100}ms`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Our Medical Experts
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet our experienced and dedicated team of doctors committed to your health
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => {
            const { ref, isVisible } = useScrollAnimation();
            return (
              <div
                key={doctor.id}
                ref={ref}
                className={`transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
                style={{
                  transitionDelay: getAnimationDelay(index % 3),
                }}
              >
                <Card
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-none shadow-lg p-0 cursor-pointer relative gap-0"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out z-10 pointer-events-none"></div>

                  <div className="relative h-80 w-full overflow-hidden bg-linear-to-br from-red-100 to-red-50">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x500?text=Doctor+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">
                        {doctor.name}
                      </h2>
                      <p className="text-red-600 font-medium text-sm">
                        {doctor.specialization}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors duration-300">
                      <GraduationCap className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700">{doctor.education}</p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {doctor.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">
                            {doctor.rating}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {doctor.experience}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {doctor.patients}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Modal - Redesigned with 1080 image */}
        {selectedDoctor && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedDoctor(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section - Full width 1080 style */}
              <div className="relative w-full bg-linear-to-r from-red-600 to-red-700">
                <div className="relative h-100h-[450px] w-full">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-contain object-center bg-linear-to-br from-gray-900 to-gray-800"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/1080x600?text=Doctor+Image";
                    }}
                  />
                  {/* Overlay gradient for better text readability if needed */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                {/* Close Button - Improved */}
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 hover:rotate-90"
                >
                  <X className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                {/* Doctor Name & Specialization */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-red-600 font-semibold text-base">
                    {selectedDoctor.specialization}
                  </p>
                </div>

                {/* Stats Cards - Horizontal layout */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-900">{selectedDoctor.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                  <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-900">{selectedDoctor.patients}</p>
                    <p className="text-xs text-gray-500">Happy Patients</p>
                  </div>
                  <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{selectedDoctor.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                {/* Education Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-900">Education</h3>
                  </div>
                  <p className="text-gray-700">{selectedDoctor.education}</p>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedDoctor.description}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>+92 300 1234567</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-red-600" />
                      <span>appointment@shaukatmemorial.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>Shaukat Ali Memorial Hospital, Lahore</span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}