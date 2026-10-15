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
          size="90"
          weight="bold"
          subtitle="Insights, essays, and technical reflections on modern web engineering, interface psychology, and creative tooling."
          className="mb-4"
        />

        {/* Stack of Thought Cards matching reference screenshot */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {data.thoughts.slice(0, 2).map((thought, index) => (
            <motion.div
              key={thought.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectThought(thought)}
              className={`group cursor-pointer p-6 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[28px] transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#1e1c1a] hover:bg-[#252220] border border-white/5'
                  : 'bg-white hover:bg-[#fafafa] border border-black/5 shadow-sm'
              }`}
            >
              {/* Top: Title & Orange Diagonal Arrow */}
              <div className="flex items-start justify-between gap-4">
                <h3
                  className={`text-xl sm:text-[26px] md:text-[28px] font-semibold tracking-normal font-[family-name:var(--font-poppins)] leading-[1.25] transition-colors max-w-xl ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {thought.title}
                </h3>
                <div className="pt-1 shrink-0">
                  <ArrowUpRight
                    size={24}
                    className="text-[#f46c38] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Middle: Excerpt */}
              <p
                className={`mt-3 sm:mt-4 text-sm sm:text-[15px] md:text-base leading-relaxed font-[family-name:var(--font-poppins)] max-w-2xl ${
                  isDark ? 'text-[#998F8F]' : 'text-neutral-600'
                }`}
              >
                {thought.excerpt}
              </p>

              {/* Bottom: Date on Left, Read Time on Right */}
              <div
                className={`mt-5 sm:mt-6 flex items-center justify-between text-xs sm:text-sm font-normal font-[family-name:var(--font-poppins)] ${
                  isDark ? 'text-[#998F8F]' : 'text-neutral-500'
                }`}
              >
                <span>{thought.date}</span>
                <span>{thought.readTime}</span>
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
