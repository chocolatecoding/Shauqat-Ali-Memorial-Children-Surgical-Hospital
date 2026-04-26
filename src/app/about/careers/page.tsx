"use client";

import { Briefcase, MapPin, Clock, Mail, CheckCircle2, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const openings = [
  {
    title: "Staff Nurse",
    department: "Emergency Department",
    location: "Sialkot",
    type: "Full-time",
    experience: "1-3 years",
  },
  {
    title: "Lab Technician",
    department: "Laboratory",
    location: "Sialkot",
    type: "Full-time",
    experience: "2-4 years",
  },
  {
    title: "Radiology Technician",
    department: "Radiology",
    location: "Sialkot",
    type: "Full-time",
    experience: "2-5 years",
  },
  {
    title: "Patient Coordinator",
    department: "Patient Services",
    location: "Sialkot",
    type: "Full-time",
    experience: "1-2 years",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Join Our Team</h1>
          <p className="text-red-100 max-w-2xl mx-auto">
            Build your career at Shaukat Ali Memorial Hospital
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-sm text-gray-500">Continuous learning and career advancement</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Great Culture</h3>
            <p className="text-sm text-gray-500">Supportive and collaborative environment</p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Competitive Benefits</h3>
            <p className="text-sm text-gray-500">Attractive salary and benefits package</p>
          </div>
        </div>

        {/* Current Openings */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Openings</h2>
        <div className="space-y-4">
          {openings.map((job, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-red-600 text-sm">{job.department}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                    <span>Experience: {job.experience}</span>
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 rounded-full px-6">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Your Application</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" className="border-gray-200" />
              <Input placeholder="Email Address" type="email" className="border-gray-200" />
            </div>
            <Input placeholder="Position Applying For" className="border-gray-200" />
            <Input placeholder="Upload CV (PDF)" type="file" className="border-gray-200" />
            <Button className="bg-red-600 hover:bg-red-700">
              <Mail className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}