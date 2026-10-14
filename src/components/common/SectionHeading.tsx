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
  showDivider?: boolean;
}

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
  action,
  showDivider = false,
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignmentClasses} ${className}`}>
      <div className="flex w-full items-center justify-between gap-4 flex-wrap">
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)] select-text cursor-text leading-[0.88] mt-0 pt-0 transition-colors duration-300"
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-2 text-sm sm:text-base text-[#998f8f] max-w-2xl font-normal leading-relaxed select-text cursor-text transition-colors duration-300"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {action && (
          <div className="mt-2 sm:mt-0">
            {action}
          </div>
        )}
      </div>

      {showDivider && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent mt-5 origin-left"
        />
      )}
    </div>
  );
};
