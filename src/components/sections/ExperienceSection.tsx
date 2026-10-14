'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ExperienceSection = () => {
  const { data } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string | null>(data.experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: '-60px 0px -60px 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center min-h-[calc(100vh-8rem)] py-8 scroll-mt-28 lg:scroll-mt-32 relative select-text"
    >
      <div>
        <SectionHeading
          title={`${data.stats[0]?.value || '+3'} YEARS OF EXPERIENCE`}
          subtitle="Track record of crafting intuitive digital products, component systems, and leading UX solutions."
          className="mb-4"
        />

        {/* Experience Timeline Cards */}
        <div className="flex flex-col gap-3.5">
          {data.experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggleExpand(exp.id)}
                className={`group cursor-pointer rounded-[22px] bg-[#1c1b18] border transition-all duration-300 p-5 sm:p-6 ${
                  isExpanded
                    ? 'border-[#1d6de3]/50 bg-[#161d27] shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(29,109,227,0.12)]'
                    : 'border-white/8 hover:border-white/20 hover:bg-[#1f1e1b]'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#131211] border border-white/10 flex items-center justify-center text-[#3b82f6] shrink-0 group-hover:border-[#1d6de3]/40 transition-colors overflow-hidden p-1">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <Briefcase size={18} />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-black text-white uppercase font-[family-name:var(--font-poppins)] tracking-tight group-hover:text-[#60a5fa] transition-colors">
                          {exp.company}
                        </h3>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-neutral-300">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  {/* Period Badge & Expand Trigger */}
                  <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131211] border border-white/5 text-[11px] font-semibold text-[#998f8f]">
                      <Calendar size={12} className="text-[#3b82f6]" />
                      <span>{exp.period}</span>
                    </div>

                    <div className={`p-1.5 rounded-full bg-white/5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#3b82f6]' : ''}`}>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Description Body */}
                <p className="mt-3 text-xs sm:text-sm text-[#998f8f] leading-relaxed">
                  {exp.description}
                </p>

                {/* Expanded Highlights */}
                {isExpanded && exp.highlights && exp.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3.5 pt-3.5 border-t border-white/5 flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                      Key Highlights:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-0.5">
                      {exp.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 size={14} className="text-[#3b82f6] shrink-0 mt-0.5" />
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

      <div className="pt-4 text-center text-xs text-[#888888]">
        Available for full-time Lead & Product Design contracts worldwide
      </div>
    </motion.section>
  );
};
