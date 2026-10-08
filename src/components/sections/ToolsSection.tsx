'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';

export const ToolsSection = () => {
  const { data } = usePortfolio();

  return (
    <section id="tools" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeading
          title="PREMIUM TOOLS"
          subtitle="The primary software suite, modern frameworks, and platforms leveraged to create world-class digital products."
        />

        {/* 6 Tools Responsive Grid (Matching Sawad) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.tools.map((tool, index) => (
            <motion.div
              key={tool.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative p-6 sm:p-7 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(29,109,227,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between mb-5">
                  {/* Tool Icon with subtle rounded container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#131211] border border-white/10 p-2.5 flex items-center justify-center group-hover:scale-110 group-hover:border-[#1d6de3]/50 transition-all duration-300 shadow-inner">
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                    />
                  </div>

                  {tool.level && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#131211] text-[#60a5fa] border border-[#1d6de3]/30">
                      {tool.level}
                    </span>
                  )}
                </div>

                {/* Tool Name & Category */}
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-[family-name:var(--font-poppins)] tracking-tight group-hover:text-[#60a5fa] transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-[#998f8f] uppercase mb-3">
                  {tool.category}
                </p>

                {/* Description */}
                {tool.description && (
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {tool.description}
                  </p>
                )}
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                <span>Production Ready</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d6de3]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
