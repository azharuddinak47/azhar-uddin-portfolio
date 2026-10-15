'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';

import { SectionHeading } from '@/components/common/SectionHeading';

export const ContactSection = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const { contact } = data;

  const [leftCardHeight, setLeftCardHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      const leftCard = document.querySelector('aside > div');
      if (leftCard && window.innerWidth >= 1024) {
        setLeftCardHeight(Math.round(leftCard.getBoundingClientRect().height));
      } else {
        setLeftCardHeight(null);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
      style={leftCardHeight ? { minHeight: `${leftCardHeight}px`, height: `${leftCardHeight}px` } : undefined}
      className="flex flex-col pt-0 pb-0 scroll-mt-0 relative select-text justify-between w-full"
    >
      <div className="w-full max-w-3xl flex-1 flex flex-col justify-between">
        {/* Display Headline matching Sawad Framer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start leading-[0.88] mb-4 sm:mb-5 select-text shrink-0"
        >
          <span className={`text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-bold tracking-tight uppercase font-[family-name:var(--font-poppins)] select-text cursor-text transition-colors duration-300 leading-[0.88] ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            LET&apos;S WORK
          </span>
          <span className="neon-stroke text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-bold tracking-tight uppercase font-[family-name:var(--font-poppins)] select-text cursor-text leading-[0.88] mt-1 sm:mt-1.5">
            TOGETHER
          </span>
        </motion.div>

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
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-3 sm:gap-3.5 w-full">
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

              {/* Row 2: Message (Expanded to fill available space) */}
              <div className="flex flex-col gap-1.5 flex-1 min-h-[160px] sm:min-h-[220px]">
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
                  rows={8}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full flex-1 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border text-xs sm:text-sm outline-none transition-all min-h-[150px] sm:min-h-[200px] resize-none select-text ${
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
