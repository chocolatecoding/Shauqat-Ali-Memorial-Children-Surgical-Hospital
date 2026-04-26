"use client";

import Image from "next/image";
import { Mail, Phone} from "lucide-react";

const doctors = [
  {
    name: "Dr. Ahmed Hassan",
    specialty: "Senior Surgeon",
    experience: "15+ years",
    education: "MBBS, FCPS",
    image: "/images/team/doctor-1.jpg",
  },
  {
    name: "Dr. Sara Khan",
    specialty: "Radiologist",
    experience: "12+ years",
    education: "MBBS, FRCR",
    image: "/images/team/doctor-2.jpg",
  },
  {
    name: "Dr. Ali Raza",
    specialty: "Pediatrician",
    experience: "10+ years",
    education: "MBBS, MD",
    image: "/images/team/doctor-3.jpg",
  },
  {
    name: "Dr. Fatima Malik",
    specialty: "Gynecologist",
    experience: "14+ years",
    education: "MBBS, FCPS",
    image: "/images/team/doctor-4.jpg",
  },
];

const staff = [
  { name: "Mr. Usman Ahmed", role: "Lab Technician", experience: "8+ years" },
  { name: "Ms. Ayesha Siddiqui", role: "Head Nurse", experience: "10+ years" },
  { name: "Mr. Bilal Aslam", role: "Radiology Tech", experience: "6+ years" },
  { name: "Ms. Hina Tariq", role: "Patient Coordinator", experience: "5+ years" },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Medical Team</h1>
          <p className="text-red-100 max-w-2xl mx-auto">
            Meet our dedicated team of healthcare professionals committed to your well-being
          </p>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Doctors</h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Highly qualified and experienced medical professionals
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{doctor.name}</h3>
                  <p className="text-sm text-white/90">{doctor.specialty}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>📅 {doctor.experience}</span>
                  <span>🎓 {doctor.education}</span>
                </div>
                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button className="text-red-600 hover:text-red-700 transition">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 transition">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Healthcare Staff</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Dedicated professionals supporting your health journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-red-600 text-sm">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">{member.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}