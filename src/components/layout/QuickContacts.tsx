"use client";

import Image from "next/image";
import { Phone, MapPin, Clock, Mail, Heart, Shield } from "lucide-react";

export function QuickContacts() {
  return (
    <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-2.5 hidden lg:block border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Contact Info */}
          <div className="flex items-center gap-8">
            {/* Emergency Phone */}
            <a
              href="tel:03480639599"
              className="flex items-center gap-2.5 group transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Phone className="w-3.5 h-3.5 text-red-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-xs font-medium tracking-wide group-hover:text-red-400 transition-colors duration-300">
                24/7 Emergency: 03480639599
              </span>
            </a>

            <div className="w-px h-4 bg-gray-600"></div>

            {/* Hours */}
            <div className="flex items-center gap-2.5 group">
              <Clock className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium tracking-wide group-hover:text-blue-400 transition-colors duration-300">
                24/7 Service | 24/7 Patient Support
              </span>
            </div>

            <div className="w-px h-4 bg-gray-600"></div>

            {/* Location */}
            <div className="flex items-center gap-2.5 group">
              <MapPin className="w-3.5 h-3.5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium tracking-wide group-hover:text-green-400 transition-colors duration-300">
                Chock shaida chawinda, Sialkot
              </span>
            </div>
          </div>

          {/* Right Side - Social Icons with Labels */}
          <div className="flex items-center gap-6">
            {/* Trust Badge */}
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <Shield className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-semibold tracking-wider text-gray-300">TRUSTED CARE</span>
            </div>

            <div className="w-px h-4 bg-gray-600"></div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Follow Us
              </span>
              
              {/* Facebook */}
              <a
                href="#"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image
                  src="/images/icons/facebook.svg"
                  alt="Facebook"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-sky-400 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image
                  src="/images/icons/twitter.svg"
                  alt="Twitter"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image
                  src="/images/icons/instagram.svg"
                  alt="Instagram"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-black rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image
                  src="/images/icons/tiktok.svg"
                  alt="TikTok"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="group relative"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-red-600 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <Image
                  src="/images/icons/youtube.svg"
                  alt="YouTube"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 brightness-0 invert relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>

            {/* Email CTA */}
    
          </div>
        </div>
      </div>
    </div>
  );
}