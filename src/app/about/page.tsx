"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Heart, 
  Shield, 
  Award, 
  Users, 
  Stethoscope, 
  Building,
  ChevronRight,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [storyInView, setStoryInView] = useState(false);
  const [missionInView, setMissionInView] = useState(false);
  const [valuesInView, setValuesInView] = useState(false);
  const [facilitiesInView, setFacilitiesInView] = useState(false);

  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const facilitiesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === storyRef.current) {
              setStoryInView(true);
            }
            if (entry.target === missionRef.current) {
              setMissionInView(true);
            }
            if (entry.target === valuesRef.current) {
              setValuesInView(true);
            }
            if (entry.target === facilitiesRef.current) {
              setFacilitiesInView(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    if (missionRef.current) observer.observe(missionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (facilitiesRef.current) observer.observe(facilitiesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-125 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-7.jpg"
            alt="Shaukat Ali Memorial Hospital"
            fill
            priority
            className="object-cover object-center"
            quality={95}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
          
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              About Shaukat Ali Memorial <br />
              <span className="text-red-600">Children & General Hospital</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-6">
              Providing quality healthcare services with modern technology and compassionate care since 2010.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-red-400 transition">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">About Us</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              style={{
                opacity: storyInView ? 1 : 0,
                transform: storyInView ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.6s ease-out"
              }}
            >
              <div className="inline-block bg-red-50 px-4 py-1 rounded-full mb-4">
                <span className="text-red-600 text-sm font-semibold">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                A Legacy of <span className="text-red-600">Compassionate Care</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Shaukat Ali Memorial Children & Surgical Hospital was founded with a vision to provide 
                world-class healthcare services to the community. Since our establishment, we have grown 
                into a trusted healthcare institution, serving thousands of patients with dedication and excellence.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our hospital is equipped with state-of-the-art medical technology and staffed by highly 
                experienced doctors, nurses, and healthcare professionals. We are committed to delivering 
                compassionate, patient-centered care in a safe and comfortable environment.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To improve patient convenience and healthcare efficiency, we introduced the Smart Report System. 
                This digital system allows patients to receive, view, and download their medical reports online, 
                making healthcare more accessible than ever before.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition mt-6">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div
              style={{
                opacity: storyInView ? 1 : 0,
                transform: storyInView ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.6s ease-out 0.2s"
              }}
              className="relative"
            >
              <div className="relative h-112.5 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/pictures/pic1.jpg"
                  alt="Shaukat Ali Memorial Hospital"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                style={{
                  opacity: storyInView ? 1 : 0,
                  transform: storyInView ? "scale(1)" : "scale(0.8)",
                  transition: "all 0.5s ease-out 0.4s"
                }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">10,000+</p>
                    <p className="text-sm text-gray-500">Patients Treated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={missionRef} className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            style={{
              opacity: missionInView ? 1 : 0,
              transform: missionInView ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.6s ease-out"
            }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-red-50 px-4 py-1 rounded-full mb-4">
              <span className="text-red-600 text-sm font-semibold">Our Commitment</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div
              style={{
                opacity: missionInView ? 1 : 0,
                transform: missionInView ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.6s ease-out 0.2s"
              }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide reliable, affordable, and high-quality healthcare services using modern medical 
                technology and digital solutions that help patients access and understand their medical reports easily.
              </p>
            </div>
            
            <div
              style={{
                opacity: missionInView ? 1 : 0,
                transform: missionInView ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.6s ease-out 0.4s"
              }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a trusted healthcare center that combines advanced diagnostics, smart digital systems, 
                and compassionate patient care to improve the health of the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div
            style={{
              opacity: valuesInView ? 1 : 0,
              transform: valuesInView ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.6s ease-out"
            }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-red-50 px-4 py-1 rounded-full mb-4">
              <span className="text-red-600 text-sm font-semibold">What We Believe</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Patient Care", desc: "Patients' health and safety are our top priority" },
              { icon: Shield, title: "Integrity", desc: "Honest and transparent medical services" },
              { icon: Award, title: "Innovation", desc: "Modern technology and smart solutions" },
              { icon: Stethoscope, title: "Quality", desc: "Accurate diagnosis and professional treatment" },
              { icon: Clock, title: "Accessibility", desc: "Healthcare services available 24/7" },
              { icon: Users, title: "Compassion", desc: "Respect, care, and empathy for every patient" },
            ].map((value, index) => (
              <div
                key={index}
                style={{
                  opacity: valuesInView ? 1 : 0,
                  transform: valuesInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease-out ${0.1 * index}s`
                }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section ref={facilitiesRef} className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            style={{
              opacity: facilitiesInView ? 1 : 0,
              transform: facilitiesInView ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.6s ease-out"
            }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-red-50 px-4 py-1 rounded-full mb-4">
              <span className="text-red-600 text-sm font-semibold">Our Facilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Medical Facilities
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Digital X-Ray", desc: "Low radiation digital imaging" },
              { name: "Ultrasound", desc: "High-definition ultrasound" },
              { name: "Laboratory", desc: "Comprehensive testing" },
              { name: "Emergency Care", desc: "24/7 emergency services" },
            ].map((facility, index) => (
              <div
                key={index}
                style={{
                  opacity: facilitiesInView ? 1 : 0,
                  transform: facilitiesInView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease-out ${0.1 * index}s`
                }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{facility.name}</h3>
                <p className="text-sm text-gray-500">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-linear-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Quality Healthcare?
          </h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Schedule an appointment or contact us for more information about our services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-red-600 hover:bg-gray-100 rounded-lg px-8 py-6 text-base font-semibold">
                Contact Us
              </Button>
            </Link>
            <Link href="/patient/login">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white rounded-lg px-8 py-6 text-base font-semibold bg-non ">
                Patient Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}