"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Copy, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const socialIcons = [
  { name: "Facebook", icon: "/images/icons/facebook.svg", url: "#" },
  { name: "Twitter", icon: "/images/icons/twitter.svg", url: "#" },
  { name: "Instagram", icon: "/images/icons/instagram.svg", url: "#" },
  { name: "YouTube", icon: "/images/icons/youtube.svg", url: "#" },
];

export function ContactInfo() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string, type: "phone" | "email") => {
    await navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-red-50 px-3 sm:px-4 py-1 rounded-full mb-3">
            <span className="text-red-600 text-xs sm:text-sm font-medium">Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-500 text-sm sm:text-base">We'd love to hear from you</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Contact Info (No Background) */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Phone */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
                  <a href="tel:03480639599" className="text-gray-900 font-medium text-sm sm:text-base">
                    03480639599
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("03480639599", "phone")}
                className="p-2 hover:bg-gray-100 rounded-lg transition shrink-0"
              >
                {copiedPhone ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Email */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Email Address</p>
                  <a href="mailto:info@shaukatalihospital.com" className="text-gray-900 font-medium text-sm sm:text-base break-all">
                    info@shaukatalihospital.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("info@shaukatalihospital.com", "email")}
                className="p-2 hover:bg-gray-100 rounded-lg transition shrink-0"
              >
                {copiedEmail ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Address */}
            <div className="flex gap-3 sm:gap-4 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Our Address</p>
                <p className="text-gray-900 text-sm sm:text-base">
                  Chock shaida chawinda, Tehsil Pasrur,<br />
                  District Sialkot, Pakistan
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-3 sm:gap-4 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Working Hours</p>
                <p className="text-gray-900 text-sm sm:text-base">24/7 Emergency Service</p>
                <p className="text-gray-900 text-sm sm:text-base">24/7 Patient Support</p>
              </div>
            </div>

            {/* Social */}
            <div className="pt-2">
              <p className="text-sm text-gray-700 mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-500 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={18}
                      height={18}
                      className="opacity-70 hover:brightness-0 hover:invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form + Map */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Form */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Send us a Message</h3>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-white border-gray-200 h-10 sm:h-11"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-white border-gray-200 h-10 sm:h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input 
                    placeholder="How can we help you?" 
                    className="bg-white border-gray-200 h-10 sm:h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea 
                    placeholder="Write your message here..." 
                    rows={4}
                    className="bg-white border-gray-200 resize-none"
                  />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 h-10 sm:h-11">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-56 sm:h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.691778538506!2d74.7045880111398!3d32.346983105729564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ebb3be9e1644b%3A0x3d7efffedb23a125!2sShaukat%20Ali%20Memorial%20Children%20and%20General%20Hospital!5e0!3m2!1sen!2s!4v1776035734991!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                  title="Hospital Location"
                />
              </div>
              <div className="p-3 sm:p-4 border-t border-gray-200 text-center">
                <a 
                  href="https://maps.google.com/?q=Shaukat+Ali+Memorial+Children+and+General+Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium inline-flex items-center gap-1"
                >
                  Get Directions
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}