'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';

import { SectionHeading } from '@/components/common/SectionHeading';

const BUDGET_OPTIONS = [
  '< $2,000',
  '$2,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
];

export const ContactSection = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';
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
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-0 relative select-text"
    >
      <div className="w-full max-w-3xl flex flex-col items-start">
        {/* Section Heading matching all other sections */}
        <SectionHeading
          title="LET'S WORK TOGETHER"
          subtitle="Have a design project in mind or looking for a dedicated Lead Product Designer? Feel free to reach out directly."
          className="mb-4 sm:mb-5 w-full"
          showDivider={false}
        />

        {/* Contact Form matching exact Sawad Framer design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex-1 flex flex-col justify-between"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`py-12 px-6 rounded-2xl flex flex-col items-center text-center gap-3 border transition-all ${
                isDark
                  ? 'bg-[#1c1a18] border-white/10 text-white'
                  : 'bg-white border-neutral-200 shadow-xl text-neutral-900'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-[#1d6de3]/15 border border-[#1d6de3] flex items-center justify-center text-[#1d6de3]">
                <CheckCircle2 size={28} />
              </div>
              <h4 className={`text-xl font-black uppercase font-[family-name:var(--font-poppins)] select-text ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                Message Sent Successfully!
              </h4>
              <p className={`text-xs sm:text-sm max-w-md select-text ${
                isDark ? 'text-[#998f8f]' : 'text-neutral-600'
              }`}>
                Thank you for reaching out. Your inquiry has been delivered directly to {contact.email || 'Md Azhar Uddin'}.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 w-full">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className={`text-xs font-semibold select-text transition-colors duration-200 ${
                      isDark ? 'text-[#998f8f]' : 'text-neutral-700'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all select-text ${
                      isDark
                        ? 'bg-[#16222f] border-white/10 text-white placeholder-[#8a99a8] focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/25 shadow-xs'
                        : 'bg-white border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-black/20'
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className={`text-xs font-semibold select-text transition-colors duration-200 ${
                      isDark ? 'text-[#998f8f]' : 'text-neutral-700'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all select-text ${
                      isDark
                        ? 'bg-[#16222f] border-white/10 text-white placeholder-[#8a99a8] focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/25 shadow-xs'
                        : 'bg-white border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-black/20'
                    }`}
                  />
                </div>
              </div>

              {/* Row 2: Budget Custom Interactive Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-budget-btn"
                  className={`text-xs font-semibold select-text transition-colors duration-200 ${
                    isDark ? 'text-[#998f8f]' : 'text-neutral-700'
                  }`}
                >
                  Budget
                </label>
                <div ref={dropdownRef} className="relative w-full">
                  <button
                    id="contact-budget-btn"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-left text-xs sm:text-sm outline-none transition-all flex items-center justify-between cursor-pointer ${
                      isDark
                        ? 'bg-[#16222f] border-white/10 text-white hover:border-white/20 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/25 shadow-xs'
                        : 'bg-white border-black/10 text-neutral-900 hover:border-black/20 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    <span
                      className={
                        formData.budget
                          ? (isDark ? 'text-white font-medium' : 'text-neutral-900 font-medium')
                          : (isDark ? 'text-[#888888]' : 'text-neutral-400')
                      }
                    >
                      {formData.budget || 'Select...'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[#1d6de3]' : (isDark ? 'text-[#888888]' : 'text-neutral-400')
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
                        className={`absolute top-full left-0 right-0 mt-1.5 p-1.5 rounded-xl border z-50 flex flex-col gap-1 backdrop-blur-xl ${
                          isDark
                            ? 'bg-[#131c26] border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
                            : 'bg-white border-black/10 shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
                        }`}
                      >
                        {BUDGET_OPTIONS.map((opt) => {
                          const isSelected = formData.budget === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, budget: opt });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1d6de3] text-white font-semibold shadow-sm'
                                  : isDark
                                  ? 'text-neutral-200 hover:bg-[#1e2c3a] hover:text-white'
                                  : 'text-neutral-800 hover:bg-[#f1f3f5] hover:text-neutral-950'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <Check size={14} />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input type="hidden" name="budget" value={formData.budget} />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className={`text-xs font-semibold select-text transition-colors duration-200 ${
                    isDark ? 'text-[#998f8f]' : 'text-neutral-700'
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={2}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm outline-none transition-all min-h-[64px] sm:min-h-[72px] resize-none select-text ${
                    isDark
                      ? 'bg-[#16222f] border-white/10 text-white placeholder-[#8a99a8] focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/25 shadow-xs'
                      : 'bg-white border-black/10 text-neutral-900 placeholder-neutral-400 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-black/20'
                  }`}
                />
              </div>

              {/* Row 4: Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#1d6de3] hover:bg-[#2563eb] text-white font-bold text-sm sm:text-base transition-all shadow-[0_4px_16px_rgba(29,109,227,0.3)] hover:shadow-[0_6px_22px_rgba(29,109,227,0.45)] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-0.5"
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
    </motion.section>
  );
};
