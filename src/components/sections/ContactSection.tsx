'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';

export const ContactSection = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: contact.budgetOptions[1] || '$5,000 - $10,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean submission flow
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#c5ff41', '#f46c38', '#ffffff'],
        });
      } catch (err) {}

      // Reset form after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          budget: contact.budgetOptions[1] || '$5,000 - $10,000',
          message: '',
        });
      }, 5000);
    }, 900);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      {/* Background glow accent */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[#c5ff41]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <SectionHeading
          badge="Get in Touch"
          title={contact.headline}
          subtitle={contact.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#1c1b18] border border-white/8 flex flex-col gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-[family-name:var(--font-poppins)]">
                Direct Contact
              </h3>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#131211] border border-white/5 hover:border-[#c5ff41]/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#c5ff41] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#998f8f] uppercase block">Email Address</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#c5ff41] transition-colors">{contact.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#131211] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#c5ff41] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#998f8f] uppercase block">Location</span>
                    <span className="text-sm font-bold text-white">{contact.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#131211] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#c5ff41] flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#998f8f] uppercase block">Response Time</span>
                    <span className="text-sm font-bold text-white">Within 24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div className="p-4 rounded-2xl bg-[#c5ff41]/10 border border-[#c5ff41]/20 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5ff41] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5ff41]" />
                </span>
                <p className="text-xs font-semibold text-white">
                  Currently open for new full-stack & design system contracts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[28px] bg-[#1c1b18] border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c5ff41]/20 border border-[#c5ff41] flex items-center justify-center text-[#c5ff41]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase font-[family-name:var(--font-poppins)]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#998f8f] max-w-md">
                    Thank you for reaching out. I have received your inquiry and will review the details to get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-[#131211] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5ff41] focus:ring-1 focus:ring-[#c5ff41] transition-all text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-[#131211] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5ff41] focus:ring-1 focus:ring-[#c5ff41] transition-all text-sm"
                    />
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                      Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {contact.budgetOptions.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                            formData.budget === budget
                              ? 'bg-[#c5ff41] text-black border-[#c5ff41] font-bold shadow-[0_0_12px_rgba(197,255,65,0.3)]'
                              : 'bg-[#131211] text-[#998f8f] border-white/10 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Project Details / Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your project, goals, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-[#131211] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5ff41] focus:ring-1 focus:ring-[#c5ff41] transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="lime"
                    size="lg"
                    className="w-full justify-center mt-2 cursor-pointer"
                    disabled={isSubmitting}
                    icon={isSubmitting ? <span className="animate-spin">⏳</span> : <Send size={16} />}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
