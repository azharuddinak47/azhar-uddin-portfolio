'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Sparkles, Code2, Terminal } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Marquee } from '@/components/common/Marquee';

export const HeroSection = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { data, isEditMode } = usePortfolio();
  const { profile, stats } = data;

  return (
    <section id="home" className="relative pt-28 sm:pt-36 md:pt-40 pb-16 overflow-hidden">
      {/* Subtle background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#1d6de3]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#f46c38]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 sm:mb-24">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="lime" pulsing={profile.isAvailable}>
                {profile.statusBadge}
              </Badge>
            </motion.div>

            {/* Huge Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[90px] font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)] leading-[0.95] mb-6"
            >
              {profile.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word === 'ENGINEER' ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#60a5fa]">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Name & Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="text-[#60a5fa] text-sm">✦</span>
              </h2>
              <p className="text-sm sm:text-base text-[#60a5fa] font-medium mt-1">
                {profile.subHeadline}
              </p>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-base text-[#998f8f] leading-relaxed max-w-xl mb-8"
            >
              {profile.bio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Button
                variant="lime"
                size="lg"
                href="#contact"
                icon={<ArrowUpRight size={18} />}
              >
                Let&apos;s Work Together
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="#projects"
                icon={<Code2 size={16} />}
              >
                Explore Projects
              </Button>

              {isEditMode && (
                <button
                  type="button"
                  onClick={onOpenEditModal}
                  className="px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f46c38] text-white hover:bg-[#ff7b47] transition-all flex items-center gap-2 animate-bounce"
                >
                  <Sparkles size={14} />
                  Edit Hero Info
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Creative Portrait Card with Framer Accents */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden p-2.5 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
              {/* Inner Portrait Container */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#11181F]">
                <img
                  src={profile.avatarUrl || '/assets/avatar.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#11181F] via-transparent to-transparent opacity-80" />

                {/* Floating Badges on Portrait (Matching Framer Layout) */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 z-10">
                  {profile.expertiseBadges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.15 }}
                      className="px-3.5 py-2 rounded-xl bg-[#16202a]/90 backdrop-blur-md border border-[#1d6de3]/20 text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase font-[family-name:var(--font-poppins)] shadow-lg flex items-center justify-between"
                    >
                      <span>{badge}</span>
                      <span className="w-2 h-2 rounded-full bg-[#1d6de3]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#1d6de3]/25 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* 3 Stats Cards Grid (Matching Framer Exact Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className="relative p-6 sm:p-8 rounded-[24px] bg-[#16202a] border border-[#1d6de3]/15 hover:border-[#1d6de3]/35 transition-all duration-300 hover:-translate-y-1.5 group shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl lg:text-[70px] font-medium tracking-tight text-[#1d6de3] font-[family-name:var(--font-poppins)] mb-2 group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wider text-neutral-400 uppercase">
                  {stat.sublabel}
                </span>
              </div>
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#1d6de3] transition-colors" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Seamless Marquee Ticker */}
      <Marquee items={profile.tickerItems} speed={25} />
    </section>
  );
};
