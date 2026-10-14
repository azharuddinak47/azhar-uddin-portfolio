'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const CredentialsSection = () => {
  const { data } = usePortfolio();
  const certifications = data?.certifications || [];
  const academics = data?.academics || [];

  return (
    <motion.section
      id="credentials"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col py-2 scroll-mt-24 lg:scroll-mt-28 relative select-text"
    >
      <div>
        <SectionHeading
          title="CERTIFICATIONS & EDUCATION"
          subtitle="Professional credentials, academic degrees, and multidisciplinary capabilities."
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Certifications Card */}
          <div className="p-5 sm:p-6 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30 flex items-center justify-center">
                  <Award size={19} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-[family-name:var(--font-poppins)]">
                    Certifications
                  </h3>
                  <span className="text-[11px] text-[#998f8f]">Verified Professional Credentials</span>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.slice(0, 3).map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl bg-[#131211] border border-white/5 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {cert.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#1d6de3]/20 text-[#60a5fa] border border-[#1d6de3]/30 shrink-0">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#998f8f]">
                      <span>{cert.issuer}</span>
                      <span className="text-[#60a5fa] font-medium">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="p-5 sm:p-6 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30 flex items-center justify-center">
                  <GraduationCap size={19} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase font-[family-name:var(--font-poppins)]">
                    Education
                  </h3>
                  <span className="text-[11px] text-[#998f8f]">Academic Background & Degrees</span>
                </div>
              </div>

              <div className="space-y-3">
                {academics.slice(0, 2).map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-xl bg-[#131211] border border-white/5 space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {edu.degree}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/10 text-neutral-300 shrink-0">
                        Degree
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#998f8f]">
                      <span>{edu.institution}</span>
                      <span className="text-[#60a5fa] font-medium">{edu.period}</span>
                    </div>
                  </div>
                ))}
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
