"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  Send,
  Heart,
  Shield,
  Award,
  Ambulance,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social media icons from your local files
  const socialIcons = [
    { name: "Facebook", icon: "/images/icons/facebook.svg", url: "#" },
    { name: "Twitter", icon: "/images/icons/twitter.svg", url: "#" },
    { name: "Instagram", icon: "/images/icons/instagram.svg", url: "#" },
    { name: "TikTok", icon: "/images/icons/tiktok.svg", url: "#" },
    { name: "YouTube", icon: "/images/icons/youtube.svg", url: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Patient Login", href: "/patient/login" },
    { name: "Staff Login", href: "/staff/login" },
  ];

  const services = [
    { name: "X-Ray Services", href: "/services/x-ray" },
    { name: "Ultrasound", href: "/services/ultrasound" },
    { name: "Laboratory", href: "/services/laboratory" },
    { name: "ENT Care", href: "/services/ent" },
    { name: "Comprehensive", href: "/services/comprehensive" },
    { name: "Emergency Care", href: "/services/emergency" },
  ];

  const forPatients = [
    { name: "View Reports", href: "/patient/login" },
    { name: "Our Doctors", href: "/about/team" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Feedback", href: "/feedback" },
    { name: "Book Appointment", href: "/appointment" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1 - Hospital Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo/logomark.png"
                  alt="Shaukat Ali Memorial Hospital"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Shaukat Ali Memorial
                </h3>
                <p className="text-xs text-gray-400">Children & Surgical Hospital</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing exceptional healthcare services with compassion and excellence. 
              Our dedicated team of medical professionals is committed to your well-being.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <MapPin className="w-4 h-4 group-hover:text-red-400" />
                <span className="text-sm">123 Healthcare Avenue, Medical District, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <Phone className="w-4 h-4 group-hover:text-red-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <Mail className="w-4 h-4 group-hover:text-red-400" />
                <span className="text-sm">info@shaukatmemorial.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">24/7 Emergency Services Available</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2" />
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - For Patients */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 relative inline-block">
              For Patients
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></span>
            </h4>
            <ul className="space-y-2">
              {forPatients.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-red-400 text-sm transition-all duration-300 flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for health tips and updates
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:border-red-500 focus:ring-red-500 transition-all"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-all duration-300 group"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Subscribe
              </Button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 mt-2 flex items-center gap-1 animate-in fade-in duration-300">
                <CheckCircle2 className="w-3 h-3" />
                Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Social Media & Trust Badges */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 mt-6 border-t border-gray-800">
          {/* Social Icons - Using your local images */}
          <div className="flex gap-3">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label={social.name}
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={18}
                    height={18}
                    className="opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 group cursor-pointer">
              <Shield className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 group cursor-pointer">
              <Award className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">Best Hospital 2024</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 group cursor-pointer">
              <Ambulance className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">24/7 Emergency</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 group cursor-pointer">
              <Heart className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-white transition-colors">Patient First</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-800/50">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Shaukat Ali Memorial Children & Surgical Hospital. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-red-500 animate-pulse" />
            Designed with care for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}