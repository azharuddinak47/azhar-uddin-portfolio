'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, FolderDown, Award } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Marquee } from '@/components/common/Marquee';

export const RightHeroSection = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { data, isEditMode } = usePortfolio();
  const { profile, stats } = data;

  return (
    <section id="home" className="flex flex-col gap-10 pt-4 sm:pt-6">
      {/* Hero Headline Area */}
      <div className="flex flex-col items-start">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Badge variant="lime" pulsing={profile.isAvailable}>
            {profile.statusBadge}
          </Badge>
        </motion.div>

        {/* Huge Display Headline matching Sawad (UI/UX DESIGNER) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)] leading-[0.92] mb-6 flex flex-wrap gap-x-4"
        >
          <span>{profile.heroHeadline}</span>
          <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:1.5px_#c5ff41] transition-all duration-300">
            {profile.heroHeadlineHollow}
          </span>
        </motion.h1>

        {/* Subtitle & Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-neutral-300 font-medium leading-relaxed max-w-2xl mb-3"
        >
          {profile.subHeadline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base text-[#998f8f] leading-relaxed max-w-2xl mb-8"
        >
          {profile.bio}
        </motion.p>

        {/* Quick CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button
            variant="lime"
            size="md"
            href="#projects"
            icon={<ArrowUpRight size={16} />}
          >
            Explore Projects
          </Button>

          <Button
            variant="secondary"
            size="md"
            href="#contact"
          >
            Get In Touch
          </Button>

          <a
            href={profile.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1c1b18] hover:bg-[#252320] text-white border border-white/10 hover:border-[#c5ff41] transition-all flex items-center gap-1.5"
          >
            <span>Behance Profile</span>
            <ArrowUpRight size={14} className="text-[#c5ff41]" />
          </a>
        </motion.div>
      </div>

      {/* 3 Stats Metric Cards Grid (Matching Sawad) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.id || index}
            className="p-5 sm:p-6 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
          >
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#c5ff41] font-[family-name:var(--font-poppins)] mb-1 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </span>
              <span className="text-xs font-bold tracking-wider text-white uppercase">
                {stat.label}
              </span>
              <span className="text-xs font-medium tracking-wider text-[#998f8f] uppercase">
                {stat.sublabel}
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500">
              <span>Verified Record</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5ff41]" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Infinite Seamless Marquee Ticker */}
      <div className="rounded-2xl overflow-hidden">
        <Marquee items={profile.tickerItems} speed={24} />
      </div>
    </section>
  );
};
