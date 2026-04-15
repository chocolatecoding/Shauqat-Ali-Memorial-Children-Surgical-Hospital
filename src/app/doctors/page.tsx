"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, GraduationCap, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Doctors Data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    education: "MD, FACC - Harvard Medical School",
    description:
      "Expert cardiologist with over 12 years of experience in treating heart conditions, hypertension, and preventive cardiac care. She has successfully treated 2,500+ patients and specializes in interventional cardiology.",
    experience: "12+ years",
    rating: 4.9,
    patients: "2,500+",
    image: "/images/doctors/doctor1.jpg",
    color: "red",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    education: "MD, PhD - Johns Hopkins University",
    description:
      "Specializes in treating complex neurological disorders including epilepsy, migraines, and stroke recovery with advanced techniques. He has 1,800+ successful treatments and is known for his patient-centered approach.",
    experience: "10+ years",
    rating: 4.8,
    patients: "1,800+",
    image: "/images/doctors/doctor2.jpg",
    color: "red",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialization: "Orthopedic Surgeon",
    education: "MD - Stanford University",
    description:
      "Leading orthopedic surgeon specializing in joint replacement, sports medicine, and minimally invasive procedures. With 3,200+ happy patients, she brings expertise in advanced surgical techniques.",
    experience: "15+ years",
    rating: 4.9,
    patients: "3,200+",
    image: "/images/doctors/doctor3.jpg",
    color: "red",
  },
];

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const handleLearnMore = (doctor: any) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Our Medical Experts
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet our experienced and dedicated team of doctors committed to your
            health
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-none shadow-lg p-0"
            >
              {/* 3:4 Image Container */}
              <div className="relative h-80 w-full overflow-hidden bg-linear-to-br from-red-100 to-red-50">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <CardContent className="p-6">
                {/* Doctor Name & Specialization */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {doctor.name}
                  </h2>
                  <p className="text-red-600 font-medium text-sm">
                    {doctor.specialization}
                  </p>
                </div>

                {/* Education */}
                <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700">{doctor.education}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {doctor.description}
                </p>

                {/* Rating & Stats */}
                <div className="flex items-center justify-between mb-5 pt-3 border-t border-gray-100">
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

                {/* Red Button */}
                <Button
                  onClick={() => handleLearnMore(doctor)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-6 transition-colors duration-200"
                >
                  Learn More About {doctor.name.split(" ")[1]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for Learn More */}
        {selectedDoctor && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDoctor(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Modal Image */}
                <div className="relative h-64 w-full bg-linear-to-br from-red-600 to-red-700">
                  <Image
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedDoctor.name}
                </h2>
                <p className="text-red-600 font-medium mb-4">
                  {selectedDoctor.specialization}
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Education
                    </h3>
                    <p className="text-gray-600">{selectedDoctor.education}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600">
                      {selectedDoctor.description}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedDoctor.experience}
                      </p>
                      <p className="text-xs text-gray-500">Experience</p>
                    </div>
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedDoctor.patients}
                      </p>
                      <p className="text-xs text-gray-500">Happy Patients</p>
                    </div>
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedDoctor.rating}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
