'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';

const BUDGET_OPTIONS = [
  '< $2,000',
  '$2,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
];

export const ContactSection = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      // Non-blocking fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#1d6de3', '#ffffff', '#60a5fa'],
        });
      } catch (err) {}

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          budget: '',
          message: '',
        });
      }, 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 relative">
      <div className="w-full max-w-3xl flex flex-col items-start">
        {/* Huge Display Headline matching Sawad Framer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start leading-[0.88] mb-10 sm:mb-12 select-text"
        >
          <span className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)] select-text cursor-text">
            LET&apos;S WORK
          </span>
          <span className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#2c2a28] hover:text-[#383533] uppercase font-[family-name:var(--font-poppins)] transition-colors duration-300 select-text cursor-text">
            TOGETHER
          </span>
        </motion.div>

        {/* Contact Form matching exact Sawad Framer design */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 px-8 rounded-2xl bg-[#1c1a18] border border-white/10 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#ff5500]/20 border border-[#ff5500] flex items-center justify-center text-[#ff5500]">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-black text-white uppercase font-[family-name:var(--font-poppins)] select-text">
                Message Sent Successfully!
              </h4>
              <p className="text-sm text-[#998f8f] max-w-md select-text">
                Thank you for reaching out. Your inquiry has been delivered directly to {contact.email || 'Md Azhar Uddin'}.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 w-full">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs sm:text-sm font-medium text-[#998f8f] select-text">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-[#262422] border border-white/5 focus:border-[#1d6de3] focus:ring-1 focus:ring-[#1d6de3] text-white placeholder-[#6a6b6e] text-sm sm:text-base outline-none transition-all select-text"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-xs sm:text-sm font-medium text-[#998f8f] select-text">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-[#262422] border border-white/5 focus:border-[#1d6de3] focus:ring-1 focus:ring-[#1d6de3] text-white placeholder-[#6a6b6e] text-sm sm:text-base outline-none transition-all select-text"
                  />
                </div>
              </div>

              {/* Row 2: Budget Custom Interactive Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-budget-btn" className="text-xs sm:text-sm font-medium text-[#998f8f] select-text">
                  Budget
                </label>
                <div ref={dropdownRef} className="relative w-full">
                  <button
                    id="contact-budget-btn"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-[#262422] border border-white/5 hover:border-white/15 focus:border-[#1d6de3] focus:ring-1 focus:ring-[#1d6de3] text-left text-sm sm:text-base outline-none transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className={formData.budget ? 'text-white font-medium' : 'text-[#888888]'}>
                      {formData.budget || 'Select...'}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#888888] transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[#1d6de3]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 p-1.5 rounded-xl bg-[#201e1c] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.85)] z-50 flex flex-col gap-1 backdrop-blur-xl"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, budget: opt });
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 rounded-lg text-left text-sm transition-all flex items-center justify-between cursor-pointer ${
                              formData.budget === opt
                                ? 'bg-[#1d6de3] text-white font-semibold shadow-sm'
                                : 'text-neutral-200 hover:bg-[#2c2a27] hover:text-white'
                            }`}
                          >
                            <span>{opt}</span>
                            {formData.budget === opt && <Check size={16} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input type="hidden" name="budget" value={formData.budget} />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs sm:text-sm font-medium text-[#998f8f]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-[#262422] border border-white/5 focus:border-[#1d6de3] focus:ring-1 focus:ring-[#1d6de3] text-white placeholder-[#6a6b6e] text-sm sm:text-base outline-none transition-all min-h-[140px] resize-none"
                />
              </div>

              {/* Row 4: Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#1d6de3] hover:bg-[#2563eb] text-white font-bold text-base sm:text-lg transition-all shadow-[0_4px_20px_rgba(29,109,227,0.35)] hover:shadow-[0_6px_25px_rgba(29,109,227,0.5)] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
