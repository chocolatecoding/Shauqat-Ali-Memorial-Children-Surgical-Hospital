"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, FileText, Info } from "lucide-react";

// Hero slides data - SAME as before
const slides = [
  {
    id: 1,
    title: "Advanced Medical Care",
    image: "/images/hero/hero-1.jpg",
  },
  {
    id: 2,
    title: "AI-Powered Reports",
    image: "/images/hero/hero-2.jpg",
  },
  {
    id: 3,
    title: "Expert Dr Team",
    image: "/images/hero/hero-3.jpg",
  },
  {
    id: 4,
    title: "24/7 Here for You",
    image: "/images/hero/hero-4.jpg",
  },
  {
    id: 5,
    title: "Modern Diagnostics",
    image: "/images/hero/hero-5.jpg",
  },
  {
    id: 6,
    title: "Trusted Care, Better Health",
    image: "/images/hero/hero-6.jpg",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="relative w-full lg:h-screen max-h-screen overflow-hidden pb-20">
      {/* Background Images with fade animation */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className={`absolute inset-0 ${
            currentSlide === index ? "z-0" : "z-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      ))}

      {/* Bottom Gradient Overlay - SAME */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-5 md:px-8 lg:px-12 mt-16 md:mt-24 lg:mt-0">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Hospital Badge with fade animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-6"
            >
              <div className="inline-flex items-center gap-2">
                <div className="w-8 md:w-12 h-0.5 bg-red-500" />
                <span className="text-red-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
                  Shaukat Ali Memorial Hospital
                </span>
              </div>
            </motion.div>

            {/* Animated Title - SAME text, only animation added */}
            <div className="min-h-30 sm:min-h-35 md:min-h-45 lg:min-h-55">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.2] tracking-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description - SAME text, only animation added */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mt-4 md:mt-6 leading-relaxed"
            >
              Your health is our priority. Experience world-class medical care with 
              cutting-edge technology and compassionate professionals dedicated to your well-being.
            </motion.p>

            {/* CTA Buttons - Full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 mt-6 md:mt-8"
            >
              <Link href="/patient/login" className="w-full sm:w-auto">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-5 sm:px-6 sm:py-5 md:px-7 md:py-6 text-sm sm:text-base font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group border">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View Report
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-red-600 px-5 py-5 sm:px-6 sm:py-5 md:px-7 md:py-6 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 group bg-transparent">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Learn About Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - SAME, only hover animation */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/40 hover:bg-red-600 transition-all duration-300 text-white items-center justify-center backdrop-blur-sm group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/40 hover:bg-red-600 transition-all duration-300 text-white items-center justify-center backdrop-blur-sm group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Dots Indicator - SAME, only animation added */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 md:gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-6 md:w-8 h-1.5 md:h-2 bg-red-500"
                : "w-3 md:w-4 h-1.5 md:h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-Play Control - SAME, only animation added */}
      <motion.button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 z-30 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/40 hover:bg-red-600 transition-all duration-300 text-white items-center justify-center backdrop-blur-sm"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-sm" />
        ) : (
          <Play className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
        )}
      </motion.button>

      {/* Scroll Indicator - SAME, only bounce animation */}
      <motion.div
        className="hidden md:flex absolute bottom-10 lg:bottom-15 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-white text-xs font-medium tracking-wider uppercase">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}