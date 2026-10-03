'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
  action,
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignmentClasses} ${className}`}>
      <div className="flex w-full items-center justify-between gap-4 flex-wrap">
        <div>
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#1c1b18] text-[#c5ff41] border border-[#c5ff41]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5ff41]" />
              {badge}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)]"
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-base sm:text-lg text-[#998f8f] max-w-2xl font-normal leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {action && (
          <div className="mt-4 sm:mt-0">
            {action}
          </div>
        )}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent mt-8 origin-left"
      />
    </div>
  );
};
