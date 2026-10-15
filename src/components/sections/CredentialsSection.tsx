'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const CredentialsSection = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const certifications = data?.certifications || [];
  const academics = data?.academics || [];

  return (
    <motion.section
      id="credentials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-0 relative select-text"
    >
      <div>
        <SectionHeading
          title="CERTIFICATIONS & EDUCATION"
          size="90"
          weight="bold"
          subtitle="Professional credentials, academic degrees, and multidisciplinary capabilities."
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Certifications Card matching Reference Screenshot */}
          <div className={`p-5 sm:p-6 rounded-[24px] border transition-all flex flex-col justify-between ${
            isDark
              ? 'bg-[#16202a] border-[#1d6de3]/15 hover:border-[#1d6de3]/45 shadow-[0_10px_25px_rgba(0,0,0,0.45)]'
              : 'bg-white border-black/[0.04] hover:border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]'
          }`}>
            <div>
              <div className={`flex items-center justify-between gap-3 mb-5 pb-3 border-b ${
                isDark ? 'border-white/10' : 'border-black/[0.04]'
              }`}>
                <h3 className={`text-xl sm:text-[26px] font-semibold tracking-normal font-[family-name:var(--font-poppins)] ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  Licenses & Certifications
                </h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30">
                  Verified
                </span>
              </div>

              {/* Item Details */}
              <div className="space-y-4">
                {/* Header row with Coursera blue square logo */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#0056D2] text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-md tracking-tight select-none">
                    coursera
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                      Google UX Design Professional Certificate
                    </h4>
                    <p className="text-xs text-neutral-300 font-medium mt-0.5">
                      Coursera
                    </p>
                    <p className="text-xs text-[#998f8f] mt-0.5">
                      Issued May 2025
                    </p>
                  </div>
                </div>

                {/* Show Credential Pill Button */}
                <div className="pt-1">
                  <a
                    href="https://www.coursera.org/account/accomplishments/verify/G6LRKUOR1MSY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 shadow-sm"
                  >
                    <span>Show credential</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>

                {/* Skills row with diamond icon */}
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-300 pt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path>
                  </svg>
                  <span>UI/UX Design, User Experience (UX) and +4 skills</span>
                </div>

                {/* Embedded Certificate Preview Card */}
                <a
                  href="https://www.coursera.org/account/accomplishments/verify/G6LRKUOR1MSY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all group mt-2 ${
                    isDark
                      ? 'bg-[#11181F] hover:bg-[#16222c] border-white/10 hover:border-[#1d6de3]/40'
                      : 'bg-[#f8f9fa] hover:bg-[#f1f3f5] border-black/8 hover:border-[#1d6de3]/40 shadow-xs'
                  }`}
                >
                  <div className={`w-24 h-15 rounded-lg overflow-hidden bg-white shrink-0 border ${
                    isDark ? 'border-white/15' : 'border-black/10 shadow-xs'
                  }`}>
                    <img
                      src="/assets/google_cert.png"
                      alt="Google UX Design Certificate Preview"
                      className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold transition-colors leading-snug ${
                    isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                  }`}>
                    Google UX Design Professional Certificate
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className={`p-5 sm:p-6 rounded-[24px] border transition-all flex flex-col justify-between ${
            isDark
              ? 'bg-[#16202a] border-[#1d6de3]/15 hover:border-[#1d6de3]/45 shadow-[0_10px_25px_rgba(0,0,0,0.45)]'
              : 'bg-white border-black/[0.04] hover:border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30 flex items-center justify-center">
                  <GraduationCap size={19} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-[26px] font-semibold tracking-normal font-[family-name:var(--font-poppins)] ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Education
                  </h3>
                  <span className={`text-[11px] ${isDark ? 'text-[#998f8f]' : 'text-neutral-500'}`}>Academic Background & Degrees</span>
                </div>
              </div>

              <div className="space-y-3">
                {academics.slice(0, 2).map((edu) => {
                  const collegeLogo = edu.id === 'acad-1' || edu.institution.toLowerCase().includes('titumir')
                    ? '/assets/titumir_college_logo.png'
                    : edu.id === 'acad-2' || edu.institution.toLowerCase().includes('kalatia')
                    ? '/assets/kalatia_college_logo.png'
                    : edu.logo;

                  return (
                    <div
                      key={edu.id}
                      className={`p-3.5 rounded-xl border flex items-center gap-3.5 transition-colors ${
                        isDark ? 'bg-[#11181F] border-white/5' : 'bg-[#f8f9fa] border-black/6'
                      }`}
                    >
                        {collegeLogo && (
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-xs border border-black/5 overflow-hidden">
                            <img
                              src={collegeLogo}
                              alt={edu.institution}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-xs sm:text-sm font-bold leading-snug ${
                          isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {edu.degree}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#998f8f] gap-2">
                        <span className="truncate">{edu.institution}</span>
                        <span className="text-[#60a5fa] font-medium shrink-0">{edu.period}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 text-center text-xs text-[#888888]">
        Certified in advanced interaction design, usability engineering, and UX research
      </div>
    </motion.section>
  );
};
