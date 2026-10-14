'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ToolsSection = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <motion.section
      id="tools"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-40 relative select-text"
    >
      <div>
        <SectionHeading
          title="PREMIUM TOOLS"
          subtitle="The primary software suite, modern frameworks, and platforms leveraged to create world-class products."
          className="mb-5 sm:mb-6"
          showDivider={false}
        />

        {/* 6 Tools Grid: 2 columns matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
          {data.tools.map((tool, index) => (
            <motion.div
              key={tool.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-3.5 sm:p-4 rounded-[22px] sm:rounded-[24px] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-4 sm:gap-4.5 cursor-pointer ${
                isDark
                  ? 'bg-[#161514] hover:bg-[#1c1b19] border border-white/[0.07] hover:border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                  : 'bg-white hover:bg-[#faf9f6] border border-black/8 hover:border-black/15 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Left: Squircle White Badge matching reference screenshot */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-2xl bg-white flex items-center justify-center p-3 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
              </div>

              {/* Right: Tool Name & Subtitle matching reference screenshot */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg sm:text-xl font-black tracking-tight font-[family-name:var(--font-poppins)] transition-colors truncate leading-tight ${
                    isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                  }`}
                >
                  {tool.name}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-medium truncate mt-1 ${
                    isDark ? 'text-[#8a8a8e]' : 'text-neutral-600'
                  }`}
                >
                  {tool.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
