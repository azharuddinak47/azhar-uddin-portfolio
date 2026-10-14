'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper = ({ id, children, className = '' }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: '-60px 0px -60px 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-[calc(100vh-8rem)] flex flex-col justify-center py-12 sm:py-16 scroll-mt-28 lg:scroll-mt-32 relative select-text ${className}`}
    >
      {children}
    </motion.section>
  );
};
