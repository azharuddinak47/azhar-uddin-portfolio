'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Folder, Briefcase, Wrench, SquarePen, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

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
  const { isEditMode } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
      targetEl.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-6 sm:gap-8 px-6 sm:px-7 py-3 sm:py-3.5 rounded-[22px] bg-[#181715]/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.65)]"
      >
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
                    ? 'text-white scale-110'
                    : 'text-neutral-400 hover:text-white hover:scale-105'
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
                  className="absolute top-full mt-2.5 px-2.5 py-1 rounded-lg bg-[#242220] border border-white/15 text-[11px] font-semibold text-white tracking-wide uppercase shadow-lg pointer-events-none whitespace-nowrap z-50"
                >
                  {item.label}
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Edit Mode Quick Trigger (If in Edit Mode or accessible) */}
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
      </motion.nav>
    </header>
  );
};
