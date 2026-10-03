'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Languages, Heart, ExternalLink, CheckCircle } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const CredentialsSection = () => {
  const { data } = usePortfolio();
  const certifications = data?.certifications || [];
  const academics = data?.academics || [];
  const profile = data?.profile || { languages: ['English', 'Bangla'], hobbies: ['Travel', 'Sports', 'Reading'] };

  return (
    <section id="credentials" className="py-12 sm:py-16">
      <SectionHeading
        badge="Qualifications & Background"
        title="CERTIFICATIONS & EDUCATION"
        subtitle="Professional credentials, academic degrees, and multidisciplinary capabilities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-7 rounded-[28px] bg-[#1c1b18] border border-white/8 hover:border-[#c5ff41]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#c5ff41]/10 text-[#c5ff41] border border-[#c5ff41]/20 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-[family-name:var(--font-poppins)]">
                  Certifications
                </h3>
                <span className="text-xs text-[#998f8f]">Verified Professional Credentials</span>
              </div>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl bg-[#131211] border border-white/5 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-white leading-snug">
                      {cert.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#c5ff41]/15 text-[#c5ff41] shrink-0">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#998f8f]">
                    <span>{cert.issuer}</span>
                    <span className="text-[#c5ff41] font-medium">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#998f8f]">
            <CheckCircle size={14} className="text-[#c5ff41]" />
            <span>Covers Foundations of UX Design, Wireframing, Prototyping & Usability Testing</span>
          </div>
        </motion.div>

        {/* Academics & Languages Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 sm:p-7 rounded-[28px] bg-[#1c1b18] border border-white/8 hover:border-[#c5ff41]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#f46c38]/10 text-[#f46c38] border border-[#f46c38]/20 flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-[family-name:var(--font-poppins)]">
                  Academics
                </h3>
                <span className="text-xs text-[#998f8f]">Formal Education</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {academics.map((acad) => (
                <div
                  key={acad.id}
                  className="p-3.5 rounded-2xl bg-[#131211] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {acad.degree}
                    </span>
                    <span className="text-[11px] text-[#998f8f]">
                      {acad.institution}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#c5ff41] shrink-0">
                    {acad.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Languages & Hobbies */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
              <div className="p-3 rounded-xl bg-[#131211]">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1 font-semibold uppercase text-[10px]">
                  <Languages size={12} className="text-[#c5ff41]" />
                  <span>Languages</span>
                </div>
                <span className="font-bold text-white text-xs">{profile.languages.join(', ')}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#131211]">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1 font-semibold uppercase text-[10px]">
                  <Heart size={12} className="text-[#f46c38]" />
                  <span>Hobbies</span>
                </div>
                <span className="font-bold text-white text-xs">{profile.hobbies.join(', ')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
