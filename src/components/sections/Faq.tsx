"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  HelpCircle, 
  FileText, 
  Mail, 
  Shield, 
  Brain,
  Download,
  LogIn,
  MessageCircle,
  CheckCircle2,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    id: 1,
    question: "What is the Smart Report System?",
    answer: "The Smart Report System is a digital platform that allows patients to view, download, and understand their medical reports online. It also provides AI-generated summaries in simple Urdu and English.",
    icon: Brain,
    category: "General"
  },
  {
    id: 2,
    question: "How can patients receive their reports?",
    answer: "Patients receive a unique ID via email from the hospital staff. Using this ID, they can log in to the system and access their reports anytime, anywhere.",
    icon: LogIn,
    category: "Access"
  },
  {
    id: 3,
    question: "Can patients download their medical reports?",
    answer: "Yes, patients can easily view and download their reports in PDF format from their dashboard. They can also save them for future reference or share with other healthcare providers.",
    icon: Download,
    category: "Features"
  },
  {
    id: 4,
    question: "How does the AI summary help patients?",
    answer: "The AI system explains medical reports in simple language so patients can understand their health condition without medical confusion. It highlights abnormal values and provides easy-to-understand recommendations.",
    icon: Brain,
    category: "AI Features"
  },
  {
    id: 5,
    question: "Is patient data safe in the system?",
    answer: "Yes, the system keeps patient data secure with bank-level encryption. Only authorized users such as doctors, staff, and the patient themselves can access the reports. OTP-based authentication adds an extra layer of security.",
    icon: Shield,
    category: "Security"
  },
  {
    id: 6,
    question: "Do patients still need to visit the hospital for normal reports?",
    answer: "If the report is normal, patients can understand it at home using the AI summary, which saves time and unnecessary hospital visits. However, for abnormal results or specialized consultations, visiting the hospital is recommended.",
    icon: FileText,
    category: "Convenience"
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];
  
  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-semibold tracking-wide">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Find answers to common questions about our Smart Report System and healthcare services
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-4"
              >
                <div
                  className={`bg-white rounded-xl border transition-all duration-300 ${
                    openId === faq.id
                      ? "border-red-200 shadow-lg"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        openId === faq.id
                          ? "bg-red-600 text-white"
                          : "bg-red-50 text-red-600"
                      }`}>
                        <faq.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 mb-1 block">{faq.category}</span>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        openId === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-7 pt-2 border-t border-gray-100">
                          <div className="flex gap-3">
                            <div className="w-1 h-auto bg-red-500 rounded-full" />
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                          
                          {/* Related Actions */}
                          <div className="flex flex-wrap gap-3 mt-4 pt-3">
                            {faq.id === 1 && (
                              <Button variant="outline" size="sm" className="rounded-full text-xs">
                                <Brain className="w-3 h-3 mr-1" />
                                Learn about AI
                              </Button>
                            )}
                            {faq.id === 2 && (
                              <Button variant="outline" size="sm" className="rounded-full text-xs">
                                <LogIn className="w-3 h-3 mr-1" />
                                Patient Login
                              </Button>
                            )}
                            {faq.id === 5 && (
                              <Button variant="outline" size="sm" className="rounded-full text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Privacy Policy
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-linear-to-r from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Still have questions?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Can't find the answer you're looking for? Please contact our support team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button className="bg-red-600 hover:bg-red-700 rounded-full text-sm">
                  <Headphones className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="rounded-full text-sm border-red-600 text-red-600 hover:bg-red-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>24/7 Support Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>100% Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Trusted by Thousands</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}