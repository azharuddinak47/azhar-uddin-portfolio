'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Folder, Briefcase, Wrench, Award, SquarePen, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { CassettePlayer } from '@/components/ui/CassettePlayer';
import { MeshGradientGlow } from '@/components/ui/MeshGradientGlow';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'projects', label: 'Projects', href: '#projects', icon: Folder },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'tools', label: 'Tools', href: '#tools', icon: Wrench },
  { id: 'credentials', label: 'Credentials', href: '#credentials', icon: Award },
  { id: 'thoughts', label: 'Thoughts', href: '#thoughts', icon: SquarePen },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar = ({ onOpenEditModal }: { onOpenEditModal?: () => void } = {}) => {
  const { theme, activeSection, setActiveSection } = usePortfolio();
  const isDark = theme === 'dark';
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '') as any;
    setActiveSection(targetId);
  };

  return (
    <header className="fixed bottom-3 sm:bottom-auto sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <nav
          className={`relative z-10 flex items-center gap-2 sm:gap-7 px-3 sm:px-7 py-2 sm:py-3.5 rounded-[22px] sm:rounded-[24px] border transition-all duration-500 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-1.5rem)] ${
            isDark
              ? isPlaying
                ? 'border-[#1d6de3]/40 shadow-[0_12px_32px_rgba(15,45,80,0.7)]'
                : 'border-[#1d6de3]/25 shadow-[0_15px_40px_rgba(15,45,80,0.65)]'
              : isPlaying
                ? 'border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
                : 'border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
          }`}
        >
          {/* Background layer strictly under the navbar — clips mesh gradient to the pill shape */}
          <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none -z-10">
            {/* Base fill when paused / playing */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isDark
                  ? isPlaying ? 'bg-[#0F2D50]/70' : 'bg-[#0F2D50]/95'
                  : isPlaying ? 'bg-white/70' : 'bg-white/95'
              }`}
            />

            {/* Living Mesh Gradient UNDER the navbar */}
            <MeshGradientGlow isPlaying={isPlaying} isDark={isDark} />

            {/* Frosted glass overlay so the mesh colors glow through softly and icons are clear */}
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
                isDark
                  ? isPlaying
                    ? 'bg-[#0F2D50]/60 backdrop-blur-md'
                    : 'bg-[#0F2D50]/95 backdrop-blur-xl'
                  : isPlaying
                    ? 'bg-white/45 backdrop-blur-md'
                    : 'bg-white/90 backdrop-blur-xl'
              }`}
            />
          </div>

          {/* Subtle tight glow strictly underneath the bottom edge of the navbar pill */}
          <div
            className={`absolute -bottom-2 left-8 right-8 h-3 rounded-full pointer-events-none blur-md transition-opacity duration-500 -z-20 ${
              isPlaying ? (isDark ? 'opacity-55' : 'opacity-40') : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, #4285F4, #A855F7, #EC4899, #EA4335, #FBBC04, #34A853)',
            }}
          />
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={item.label}
                className={`relative p-1.5 transition-all duration-200 flex items-center justify-center group ${
                  isActive
                    ? isDark ? 'text-white scale-110' : 'text-[#151413] scale-110'
                    : isDark ? 'text-neutral-400 hover:text-white hover:scale-105' : 'text-neutral-500 hover:text-black hover:scale-105'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className="transition-colors duration-200"
                />

                {/* Subtle active glow dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -top-1 sm:top-auto sm:-bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#1d6de3] shadow-[0_0_10px_#1d6de3]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>

              {/* Floating Tooltip (opens upward on mobile bottom nav, downward on desktop top nav) */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute bottom-full mb-2.5 sm:bottom-auto sm:top-full sm:mt-2.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide uppercase shadow-lg pointer-events-none whitespace-nowrap z-50 ${
                    isDark
                      ? 'bg-[#0F2D50] border-[#1d6de3]/30 text-white shadow-lg'
                      : 'bg-white border-neutral-200/90 text-neutral-900 shadow-md'
                  }`}
                >
                  {item.label}
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Cassette Player — plays Country Roads */}
        <CassettePlayer onPlayingChange={setIsPlaying} />

        </nav>
      </motion.div>
    </header>
  );
};
