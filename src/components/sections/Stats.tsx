"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Users, Stethoscope, Ambulance, Star, 
  Heart, Clock, Microscope, Award, 
  Activity, TrendingUp, Shield, Calendar,
  Smile, Building, FileText, Zap
} from "lucide-react";

// Stats data
const statsData = [
  {
    id: 1,
    value: 50000,
    suffix: "+",
    label: "Patients Treated",
    description: "Satisfied patients across the region",
    icon: Users,
    trend: "+25%",
  },
  {
    id: 2,
    value: 100,
    suffix: "+",
    label: "Expert Doctors",
    description: "Specialized medical professionals",
    icon: Stethoscope,
    trend: "+10",
  },
  {
    id: 3,
    value: 24,
    suffix: "/7",
    label: "Emergency Service",
    description: "Round-the-clock emergency care",
    icon: Ambulance,
    trend: "Always",
  },
  {
    id: 4,
    value: 98,
    suffix: "%",
    label: "Patient Satisfaction",
    description: "Excellent feedback from patients",
    icon: Star,
    trend: "+5%",
  },
  {
    id: 5,
    value: 25000,
    suffix: "+",
    label: "Reports Analyzed",
    description: "AI-powered medical insights",
    icon: FileText,
    trend: "+50%",
  },
  {
    id: 6,
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Decades of trusted healthcare",
    icon: Award,
    trend: "Growing",
  },
];

// Counter animation component
function Counter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

interface StatsProps {
  variant?: "default" | "compact" | "grid" | "minimal" | "hero";
  showIcons?: boolean;
  columns?: 3 | 4 | 6;
  showDescriptions?: boolean;
  showTrend?: boolean;
}

export function Stats({ 
  variant = "default", 
  showIcons = true, 
  columns = 4, 
  showDescriptions = false,
  showTrend = false
}: StatsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, easeOut: [0.4, 0, 0.2, 1] },
    },
  };

  const displayStats = statsData.slice(0, columns);

  // Hero variant - for hero section
  if (variant === "hero") {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayStats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Minimal variant - clean and simple
  if (variant === "minimal") {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {displayStats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center group"
              >
                {showIcons && (
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-all duration-300">
                    <stat.icon className="w-5 h-5 text-red-600" />
                  </div>
                )}
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <section className="py-16 md:py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {displayStats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center group"
              >
                {showIcons && (
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                    <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                )}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-600 font-semibold">
                  {stat.label}
                </div>
                {showDescriptions && (
                  <div className="text-xs text-gray-400 mt-1 max-w-37.5 mx-auto">
                    {stat.description}
                  </div>
                )}
                {showTrend && stat.trend && (
                  <div className="inline-flex items-center gap-1 mt-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Grid variant - modern card style
  if (variant === "grid") {
    return (
      <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-red-600" />
              <span className="text-red-600 text-sm font-semibold tracking-wide">Healthcare Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Our Impact in <span className="text-red-600">Numbers</span>
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Delivering excellence in healthcare with measurable results
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {statsData.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-red-200 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <div className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                  
                  {showTrend && stat.trend && (
                    <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span>{stat.trend} growth</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Default variant - Premium red theme with glass morphism
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-red-700 via-red-600 to-red-800">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Activity className="w-4 h-4 text-white" />
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">Healthcare Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Our Impact in <span className="text-white/90">Numbers</span>
          </h2>
          <div className="w-20 h-1 bg-white/50 mx-auto" />
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Delivering excellence in healthcare with measurable results
          </p>
        </motion.div>

        {/* Stats Grid - Responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {displayStats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  {/* Icon with animation */}
                  {showIcons && (
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                      <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </motion.div>
                  )}
                  
                  {/* Value */}
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-white/90 mb-1">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  {showDescriptions && (
                    <div className="text-xs sm:text-sm text-white/70 mt-2">
                      {stat.description}
                    </div>
                  )}
                  
                  {/* Trend indicator */}
                  {showTrend && stat.trend && (
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      <span>{stat.trend}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs sm:text-sm font-medium">Trusted by thousands of patients</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full">
            <Building className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs sm:text-sm font-medium">Accredited Healthcare Facility</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs sm:text-sm font-medium">24/7 Emergency Response</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <a 
            href="/patient/login" 
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>Access Your Reports</span>
            <TrendingUp className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}