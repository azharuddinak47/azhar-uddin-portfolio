'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ExperienceSection = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-0 relative select-text"
    >
      <div>
        <SectionHeading
          title={`${data.stats[0]?.value || '+3'} YEARS OF EXPERIENCE`}
          size="90"
          weight="bold"
          subtitle="Track record of crafting intuitive digital products, component systems, and leading UX solutions."
          className="mb-4"
        />

        {/* Experience Timeline Rows without card box style, only hover effect */}
        <div className="flex flex-col gap-4 sm:gap-5">
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
                className={`group relative cursor-pointer flex items-start justify-between gap-4 sm:gap-6 rounded-[22px] p-2.5 sm:p-3 transition-all duration-300 ${
                  isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-black/[0.03]'
                }`}
              >
                {/* Left: Company Logo / Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 p-2 shadow-sm ${
                  isDark ? 'bg-[#11181F] border border-white/10' : 'bg-white border border-black/8'
                }`}>
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <Briefcase size={22} className="text-[#3b82f6]" />
                  )}
                </div>

                {/* Center / Body: Company Title, Description, Period */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className={`text-xl sm:text-[26px] font-semibold tracking-normal font-[family-name:var(--font-poppins)] transition-colors leading-[1.2] ${
                      isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                    }`}>
                      {exp.company}
                    </h3>
                    {index === 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Role & Description */}
                  <p className={`mt-2 text-sm sm:text-[15px] font-normal leading-relaxed font-[family-name:var(--font-poppins)] ${
                    isDark ? 'text-[#998F8F]' : 'text-neutral-600'
                  }`}>
                    {exp.description}
                  </p>

                  {/* Period */}
                  <p className={`mt-2.5 text-xs sm:text-sm font-normal font-[family-name:var(--font-poppins)] ${
                    isDark ? 'text-[#7e7a7a]' : 'text-neutral-500'
                  }`}>
                    {exp.period}
                  </p>

                  {/* Expanded Highlights */}
                  {isExpanded && exp.highlights && exp.highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`mt-3 pt-3 border-t flex flex-col gap-2 ${
                        isDark ? 'border-white/5' : 'border-black/6'
                      }`}
                    >
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        Key Highlights:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-0.5">
                        {exp.highlights.map((h, hIdx) => (
                          <div key={hIdx} className={`flex items-start gap-2 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            <CheckCircle2 size={14} className="text-[#3b82f6] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right: Diagonal Arrow Icon matching user reference screenshot */}
                <div className="pt-1.5 shrink-0">
                  <ChevronRight
                    size={22}
                    className="text-[#f46c38] group-hover:text-[#ff7b47] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 -rotate-45 transition-all duration-300"
                  />
                </div>
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
