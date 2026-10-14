'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Folder, Briefcase, Wrench, SquarePen, Sparkles } from 'lucide-react';
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
  { id: 'thoughts', label: 'Thoughts', href: '#thoughts', icon: SquarePen },
];

export const Navbar = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { isEditMode, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      setActiveSection(targetId);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetEl, {
          offset: -95,
          duration: 1.35,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <nav
          className={`relative z-10 flex items-center gap-4 sm:gap-8 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-[22px] border transition-all duration-500 max-w-[calc(100vw-1.5rem)] ${
            isDark
              ? isPlaying
                ? 'border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.65)]'
                : 'border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65)]'
              : isPlaying
                ? 'border-black/10 shadow-[0_12px_32px_rgba(0,0,0,0.12)]'
                : 'border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Background layer strictly under the navbar — clips mesh gradient to the pill shape */}
          <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none -z-10">
            {/* Base fill when paused / playing */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isDark
                  ? isPlaying ? 'bg-[#121110]/50' : 'bg-[#181715]/90'
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
                    ? 'bg-[#121110]/40 backdrop-blur-md'
                    : 'bg-[#181715]/90 backdrop-blur-xl'
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
                    className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#1d6de3] shadow-[0_0_10px_#1d6de3]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>

              {/* Floating Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full mt-2.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide uppercase shadow-lg pointer-events-none whitespace-nowrap z-50 ${
                    isDark
                      ? 'bg-[#242220] border-white/15 text-white'
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

        {/* Edit Mode Quick Trigger */}
        {isEditMode && (
          <button
            type="button"
            onClick={onOpenEditModal}
            title="Edit Portfolio (Ctrl+E)"
            className="ml-1 p-1.5 rounded-full bg-[#1d6de3] text-white hover:scale-110 transition-transform shadow-[0_0_12px_rgba(29,109,227,0.6)]"
          >
            <Sparkles size={16} />
          </button>
        )}
        </nav>
      </motion.div>
    </header>
  );
};
