'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, PanelsTopLeft, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export const RightHeroSection = ({ onOpenEditModal }: { onOpenEditModal?: () => void } = {}) => {
  const { data } = usePortfolio();
  const { profile, stats } = data;

  // Scroll-linked fade: as user scrolls down, hero headline text smoothly fades out before going under the navbar
  const { scrollY } = useScroll();
  const headlineOpacity = useTransform(scrollY, [0, 220], [1, 0]);
  const headlineY = useTransform(scrollY, [0, 220], [0, -30]);

  // Intelligently format headline: Line 1 = Solid White, Line 2 = Solid Dark Charcoal
  const solidPart = profile.heroHeadline || 'PRODUCT';
  const mutedPart = profile.heroHeadlineHollow || 'DESIGNER';

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: '-60px 0px -60px 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-between min-h-[calc(100vh-8rem)] pt-4 lg:pt-1 scroll-mt-28 lg:scroll-mt-32 relative select-text"
    >
      {/* Huge Display Headline matching Sawad Framer screenshot — fades on scroll */}
      <motion.div
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="flex flex-col items-start leading-[0.88] select-text"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start tracking-tight uppercase font-[family-name:var(--font-poppins)] select-text"
        >
          {/* Line 1: Solid Crisp White */}
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[90px] font-black text-white leading-[0.88] select-text cursor-text">
            {solidPart}
          </span>

          {/* Line 2: Neon Light Only Stroke Mode */}
          <span className="neon-stroke text-5xl sm:text-7xl md:text-8xl lg:text-[90px] font-black leading-[0.88] select-text cursor-text mt-1 sm:mt-1.5">
            {mutedPart}
          </span>
        </motion.h1>

        {/* Short Bio Subtitle matching Sawad */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 sm:mt-8 text-sm sm:text-base text-[#998f8f] font-normal leading-relaxed max-w-xl select-text cursor-text"
        >
          {profile.subHeadline ||
            'Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.'}
        </motion.p>
      </motion.div>

      {/* 3 Stats Numbers Row (Clean horizontal numbers matching screenshot) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-8 sm:gap-14 lg:gap-16 pt-2 select-text"
      >
        {stats.map((stat, index) => (
          <div key={stat.id || index} className="flex flex-col items-start select-text">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-[family-name:var(--font-poppins)] tracking-tight leading-none mb-2 select-text cursor-text">
              {stat.value}
            </span>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#998f8f] uppercase leading-tight font-[family-name:var(--font-poppins)] select-text cursor-text">
              {stat.label}
              <br />
              {stat.sublabel}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Two Feature Bento Cards matching screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 w-full"
      >
        {/* Left Bento Card: Vibrant Orange with Waves */}
        <a
          href="#projects"
          draggable={false}
          className="rounded-[24px] bg-[#eb5e28] p-6 sm:p-7 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between relative overflow-hidden group shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 select-text"
        >
          {/* Subtle Decorative Wave Pattern */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <svg
              viewBox="0 0 388 155"
              className="w-full h-full object-cover scale-150"
              fill="none"
            >
              <path
                d="M 400.825 526.501 C 359.981 521.61 275.061 502.161 262.145 463.503 C 249.228 424.845 64.622 467.64 -26.068 493.869 L -1.845 151.05 C 71.348 136.783 216.884 99.23 213.496 63.159 C 209.26 18.069 245.759 11.716 307.691 18.653 C 369.624 25.591 361.774 9.523 393.416 2.626"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="5"
              />
            </svg>
          </div>

          {/* Top Icon */}
          <div className="relative z-10 text-white pointer-events-none">
            <Layers size={28} strokeWidth={2.2} />
          </div>

          {/* Bottom Content Row */}
          <div className="flex items-end justify-between gap-4 relative z-10 pt-6">
            <span className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug font-[family-name:var(--font-poppins)] max-w-[200px] select-text cursor-text">
              DYNAMIC ANIMATION, MOTION DESIGN
            </span>

            <div className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#eb5e28] transition-all shrink-0">
              <ArrowRight size={16} />
            </div>
          </div>
        </a>

        {/* Right Bento Card: Royal Blue (Photo Backdrop Match) with Zig-Zag */}
        <a
          href="#tools"
          draggable={false}
          className="rounded-[24px] bg-gradient-to-br from-[#1d6de3] via-[#1a5fb4] to-[#104480] p-6 sm:p-7 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between relative overflow-hidden group shadow-[0_15px_35px_rgba(29,109,227,0.3)] hover:shadow-[0_20px_45px_rgba(29,109,227,0.45)] hover:-translate-y-1 transition-all duration-300 select-text"
        >
          {/* Subtle Decorative Zig-Zag Pattern */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <svg
              viewBox="0 0 422 284"
              className="w-full h-full object-cover scale-125"
              fill="none"
            >
              <path
                d="M 33.026 0.557 L 4.893 135.318 L 98.467 61.255 L 128.435 164.831 L 227.513 61.255 L 250.754 164.831 L 310.078 107.475 L 328.426 247.247 L 426.893 107.475 L 433.62 254.486 L 472.762 292.353"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="5"
              />
            </svg>
          </div>

          {/* Top Icon */}
          <div className="relative z-10 text-white pointer-events-none">
            <PanelsTopLeft size={28} strokeWidth={2.2} />
          </div>

          {/* Bottom Content Row */}
          <div className="flex items-end justify-between gap-4 relative z-10 pt-6">
            <span className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug font-[family-name:var(--font-poppins)] max-w-[210px] select-text cursor-text">
              FRAMER, FIGMA, WORDPRESS, REACTJS
            </span>

            <div className="w-8 h-8 rounded-lg border border-white/40 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#165aa8] transition-all shrink-0">
              <ArrowRight size={16} />
            </div>
          </div>
        </a>
      </motion.div>
    </motion.section>
  );
};
