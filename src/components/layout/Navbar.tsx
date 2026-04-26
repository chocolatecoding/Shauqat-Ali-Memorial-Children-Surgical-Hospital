"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, User, ChevronDown, X, Heart, Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickContacts } from "@/components/layout/QuickContacts";

// Navigation with dropdowns
const navLinks = [
  { 
    name: "HOME", 
    href: "/", 
    dropdown: null 
  },
  { 
    name: "DOCTORS", 
    href: "/doctors", 
    dropdown: null 
  },
  { 
    name: "ABOUT", 
    href: "/about", 
    dropdownImage: "/images/dropdown/about-banner.png",
    dropdownColumns: [
      {
        title: "About Us",
        links: [
          { name: "Company Story", href: "/about/company-story" },
          { name: "Mission & Vision", href: "/about/mission-vision" },
          { name: "Core Values", href: "/about/core-values" },
        ]
      },
      {
        title: "Our Organization",
        links: [
          { name: "Our Team", href: "/about/team" },
          { name: "Our Facilities", href: "/about/facilities" },
          { name: "Careers", href: "/about/careers" },
        ]
      },
      {
        title: "Resources",
        links: [
          { name: "Blog", href: "/blog" },
          { name: "News & Events", href: "/news" },
          { name: "Testimonials", href: "/testimonials" },
        ]
      }
    ]
  },
  { 
    name: "SERVICES", 
    href: "/services", 
    dropdownImage: "/images/dropdown/services-banner.jpg",
    dropdownColumns: [
      {
        title: "Diagnostic Services",
        links: [
          { name: "X-Ray Services", href: "/services/x-ray" },
          { name: "Ultrasound Services", href: "/services/ultrasound" },
          { name: "CT Scan", href: "/services/ct-scan" },
          { name: "MRI", href: "/services/mri" },
        ]
      },
      {
        title: "Laboratory Services",
        links: [
          { name: "Blood Tests", href: "/services/blood-tests" },
          { name: "Urine Tests", href: "/services/urine-tests" },
          { name: "ECG", href: "/services/ecg" },
          { name: "Comprehensive Lab", href: "/services/comprehensive" },
        ]
      },
      {
        title: "Specialty Care",
        links: [
          { name: "ENT Services", href: "/services/ent" },
          { name: "Cardiology", href: "/services/cardiology" },
          { name: "Pediatrics", href: "/services/pediatrics" },
          { name: "Neurology", href: "/services/neurology" },
        ]
      }
    ]
  },
  { 
    name: "CONTACT", 
    href: "/#contact", 
    dropdown: null 
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger animation after mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close mobile menu when clicking escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (linkName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(linkName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <>
      {/* Top Bar - Quick Contacts */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <QuickContacts />
      </motion.div>

      {/* Main Navbar */}
      <div className="">
        <nav
          className={`transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
              : "bg-white border-b border-gray-100 py-3"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                  <div className="relative w-10 h-10 md:w-12 md:h-12">
                    <Image
                      src="/images/logo/logomark.png"
                      alt="Shaukat Ali Memorial Hospital"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <div className="text-xs md:text-lg text-red-600 font-extrabold font-urdu" dir="rtl">
                      شوکت علی میموریل ہسپتال
                    </div>
                    <div className="text-[8px] md:text-[12.5px] mt-1.5 text-gray-700">
                      Children & Surgical Hospital
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={link.name} 
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    {link.dropdownColumns ? (
                      <div
                        onMouseEnter={() => handleMouseEnter(link.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                            isActive(link.href)
                              ? "text-red-600"
                              : "text-gray-700 hover:text-red-600"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          isActive(link.href)
                            ? "text-red-600"
                            : "text-gray-700 hover:text-red-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Desktop Right Side - Login Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Link href="/patient/login">
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-5 py-5 rounded-md text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                      <User className="w-4 h-4 mr-2" />
                      Patient Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 }}
                >
                  <Link href="/staff/login">
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-4 py-5 rounded-md text-sm font-semibold transition-all duration-200">
                      <LogIn className="w-4 h-4 mr-2" />
                      Staff Login
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </nav>
      </div>

      {/* Full Width Dropdown Modal - Desktop Only */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 hidden lg:block"
            style={{ 
              top: scrolled ? "60px" : "120px",
            }}
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full bg-white">
              <div className="container mx-auto px-4 py-8">
                {(() => {
                  const link = navLinks.find(l => l.name === openDropdown);
                  if (!link || !link.dropdownColumns) return null;
                  
                  return (
                    <div className="flex gap-8">
                      {/* Left Side - Large Image */}
                      <div className="hidden lg:block w-80 shrink-0">
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={link.dropdownImage || "/images/dropdown/default-banner.jpg"}
                            alt={link.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                            <div>
                              <h3 className="text-white text-xl font-bold">{link.name}</h3>
                              <p className="text-white/80 text-sm mt-1">Explore our services</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Links in Columns */}
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {link.dropdownColumns.map((column, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <h4 className="text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
                                {column.title}
                              </h4>
                              <ul className="space-y-3">
                                {column.links.map((subLink) => (
                                  <li key={subLink.name}>
                                    <Link
                                      href={subLink.href}
                                      className="text-gray-700 hover:text-red-600 transition-colors text-sm flex items-center gap-2 group"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <span className="w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                      {subLink.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Bottom CTA */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all"
                            onClick={() => setOpenDropdown(null)}
                          >
                            View All {link.name} Services
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <motion.div 
                  className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/images/logo/logomark.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Shaukat Ali Memorial</div>
                      <div className="text-sm text-red-600 font-urdu" dir="rtl">شوکت علی میموریل ہسپتال</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>

                {/* Mobile Navigation Links */}
                <motion.div 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {navLinks.map((link, idx) => (
                    <motion.div 
                      key={link.name} 
                      className="border-b border-gray-100 last:border-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      {link.dropdownColumns ? (
                        <details className="group">
                          <summary
                            className={`flex items-center justify-between w-full px-3 py-3 rounded-xl text-base font-semibold cursor-pointer transition-colors ${
                              isActive(link.href)
                                ? "text-red-600"
                                : "text-gray-800 hover:text-red-600"
                            }`}
                          >
                            {link.name}
                            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="ml-4 mt-2 mb-3 space-y-3">
                            <Link
                              href={link.href}
                              className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Overview
                            </Link>
                            {link.dropdownColumns.map((column, colIdx) => (
                              <div key={colIdx}>
                                <h4 className="text-red-600 font-semibold text-xs uppercase tracking-wider mb-2">
                                  {column.title}
                                </h4>
                                <div className="space-y-2 ml-2">
                                  {column.links.map((subLink) => (
                                    <Link
                                      key={subLink.name}
                                      href={subLink.href}
                                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block px-3 py-3 rounded-xl text-base font-semibold transition-colors ${
                            isActive(link.href)
                              ? "text-red-600"
                              : "text-gray-800 hover:text-red-600"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Action Buttons */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-100 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="tel:03480639599"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    24/7 Emergency: 03480639599
                  </a>
                  <Link href="/patient/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-md text-sm font-semibold mb-3">
                      <User className="w-4 h-4 mr-2" />
                      Patient Login
                    </Button>
                  </Link>
                  <Link href="/staff/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 py-6 rounded-md text-sm font-semibold">
                      <LogIn className="w-4 h-4 mr-2" />
                      Staff Login
                    </Button>
                  </Link>
                </motion.div>

                {/* Mobile Hospital Info */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Chock shaida chawinda, Tehsil Pasrur, Sialkot
                    </p>
                    <p className="text-xs text-gray-500 font-urdu mt-1" dir="rtl">
                      چوک شیدا چوونڈہ، تحصیل پسرور، ضلع سیالکوٹ
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600 font-semibold">24/7 Emergency Care</span>
                      <Shield className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}