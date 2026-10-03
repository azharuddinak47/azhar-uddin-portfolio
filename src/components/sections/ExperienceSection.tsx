'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ExperienceSection = () => {
  const { data } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>(data.experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeading
          badge="Career Journey"
          title="12 YEARS OF EXPERIENCE"
          subtitle="A track record of engineering scalable applications, designing resilient component systems, and leading high-performing teams."
        />

        {/* Experience Timeline Cards */}
        <div className="flex flex-col gap-6">
          {data.experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleExpand(exp.id)}
                className={`group cursor-pointer rounded-[24px] bg-[#1c1b18] border transition-all duration-300 p-6 sm:p-8 ${
                  isExpanded
                    ? 'border-[#c5ff41]/50 bg-[#21201d] shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(197,255,65,0.08)]'
                    : 'border-white/8 hover:border-white/20 hover:bg-[#1f1e1b]'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#131211] border border-white/10 flex items-center justify-center text-[#c5ff41] shrink-0 group-hover:border-[#c5ff41]/40 transition-colors">
                      <Briefcase size={22} />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-[family-name:var(--font-poppins)] tracking-tight group-hover:text-[#c5ff41] transition-colors">
                          {exp.company}
                        </h3>
                        {index === 0 && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#c5ff41]/15 text-[#c5ff41] border border-[#c5ff41]/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-neutral-300 mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  {/* Period Badge & Expand Trigger */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131211] border border-white/5 text-xs font-semibold text-[#998f8f]">
                      <Calendar size={13} className="text-[#c5ff41]" />
                      <span>{exp.period}</span>
                    </div>

                    <div className={`p-2 rounded-full bg-white/5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#c5ff41]' : ''}`}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Description Body */}
                <p className="mt-4 text-sm sm:text-base text-[#998f8f] leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                {/* Expanded Highlights */}
                {isExpanded && exp.highlights && exp.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-2.5"
                  >
                    <span className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                      Key Highlights & Contributions:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <CheckCircle2 size={16} className="text-[#c5ff41] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
