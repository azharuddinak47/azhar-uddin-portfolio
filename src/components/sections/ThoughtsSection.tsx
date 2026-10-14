'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ThoughtItem } from '@/types/portfolio';

interface ThoughtsSectionProps {
  onSelectThought: (thought: ThoughtItem) => void;
}

export const ThoughtsSection = ({ onSelectThought }: ThoughtsSectionProps) => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <motion.section
      id="thoughts"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-0 relative select-text"
    >
      <div>
        <SectionHeading
          title="DESIGN THOUGHTS"
          subtitle="Insights, essays, and technical reflections on modern web engineering, interface psychology, and creative tooling."
          className="mb-4"
        />

        {/* 2 Featured Thought Cards Side-by-Side Sized to Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {data.thoughts.slice(0, 2).map((thought, index) => (
            <motion.div
              key={thought.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectThought(thought)}
              className="group cursor-pointer p-5 sm:p-6 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_18px_rgba(29,109,227,0.18)] flex flex-col justify-between gap-5"
            >
              <div>
                {/* Metadata Row: Date & Read Time */}
                <div className={`flex items-center gap-2.5 text-xs mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={12} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                    {thought.date}
                  </span>
                  <span>•</span>
                  <span className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full text-[11px] transition-colors ${
                    isDark
                      ? 'bg-[#131211] border border-white/5 text-neutral-300'
                      : 'bg-neutral-100 border border-neutral-300/80 text-neutral-800 shadow-xs'
                  }`}>
                    <Clock size={11} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                    {thought.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2.5 leading-snug transition-colors ${
                  isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                }`}>
                  {thought.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                  isDark ? 'text-[#998f8f]' : 'text-neutral-600'
                }`}>
                  {thought.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold transition-colors ${
                isDark ? 'border-white/5 text-[#1d6de3] group-hover:text-[#60a5fa]' : 'border-neutral-200 text-[#1d6de3] group-hover:text-[#2563eb]'
              }`}>
                <span>Read Full Essay</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-[#131211] border border-white/10 text-white group-hover:bg-[#1d6de3] group-hover:border-[#1d6de3]'
                    : 'bg-neutral-100 border border-neutral-300 text-neutral-800 group-hover:bg-[#1d6de3] group-hover:text-white group-hover:border-[#1d6de3]'
                }`}>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={`pt-4 text-center text-xs transition-colors ${isDark ? 'text-[#888888]' : 'text-neutral-500'}`}>
        Publishing regularly on Medium, Substack, and design engineering communities
      </div>
    </motion.section>
  );
};
