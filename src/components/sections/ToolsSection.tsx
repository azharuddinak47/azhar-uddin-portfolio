'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ToolsSection = () => {
  const { data } = usePortfolio();

  return (
    <motion.section
      id="tools"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col py-2 scroll-mt-24 lg:scroll-mt-28 relative select-text"
    >
      <div>
        <SectionHeading
          title="PREMIUM TOOLS"
          subtitle="The primary software suite, modern frameworks, and platforms leveraged to create world-class products."
          className="mb-4"
        />

        {/* 6 Tools Grid: 2 rows of 3 columns calibrated for 682px frame */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {data.tools.map((tool, index) => (
            <motion.div
              key={tool.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative p-4 sm:p-5 rounded-[22px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_18px_rgba(29,109,227,0.18)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Level */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#131211] border border-white/10 p-2 flex items-center justify-center group-hover:scale-110 group-hover:border-[#1d6de3]/50 transition-all duration-300 shadow-inner">
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                    />
                  </div>

                  {tool.level && (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#131211] text-[#60a5fa] border border-[#1d6de3]/30">
                      {tool.level}
                    </span>
                  )}
                </div>

                {/* Tool Name & Category */}
                <h3 className="text-base sm:text-lg font-black text-white uppercase font-[family-name:var(--font-poppins)] tracking-tight group-hover:text-[#60a5fa] transition-colors mb-0.5">
                  {tool.name}
                </h3>
                <p className="text-[10px] font-semibold tracking-wider text-[#998f8f] uppercase mb-2">
                  {tool.category}
                </p>

                {/* Description */}
                {tool.description && (
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                )}
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                <span>Production Ready</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d6de3]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-4 text-center text-xs text-[#888888]">
        Constantly exploring cutting-edge AI design systems, tokens, and 3D web tooling
      </div>
    </motion.section>
  );
};
