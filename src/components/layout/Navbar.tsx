'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Edit3, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tools', href: '#tools' },
  { label: 'Thoughts', href: '#thoughts' },
];

export const Navbar = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { data, isEditMode, toggleEditMode } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy for active section
      const sections = ['home', 'projects', 'experience', 'tools', 'thoughts', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 max-w-5xl w-full ${
            isScrolled
              ? 'bg-[#181715]/85 backdrop-blur-xl border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
              : 'bg-[#181715]/65 backdrop-blur-md border-white/10'
          }`}
        >
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#c5ff41]/50 group-hover:border-[#c5ff41] transition-colors">
              <img
                src={data.profile.avatarUrl || '/assets/avatar.jpg'}
                alt={data.profile.name}
                className="w-full h-full object-cover object-[75%_35%] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#c5ff41] transition-colors font-[family-name:var(--font-poppins)]">
                {data.profile.name}
              </span>
              <span className="text-[10px] text-[#998f8f] -mt-1 hidden sm:block">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#131211]/60 px-3 py-1.5 rounded-full border border-white/5">
            {NAV_LINKS.map(link => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-[#998f8f] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#c5ff41] rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action Area: Edit Button & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Edit Mode Trigger */}
            <button
              type="button"
              onClick={onOpenEditModal}
              title="Edit Portfolio Content (Ctrl+E)"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                isEditMode
                  ? 'bg-[#c5ff41] text-black border-[#c5ff41] shadow-[0_0_15px_rgba(197,255,65,0.4)]'
                  : 'bg-[#22201d] text-[#c5ff41] hover:bg-[#2c2925] border-[#c5ff41]/30 hover:border-[#c5ff41]'
              }`}
            >
              <Edit3 size={13} className="animate-pulse" />
              <span className="hidden sm:inline">Edit Mode</span>
            </button>

            {/* Main Contact CTA */}
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-[#c5ff41] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,255,65,0.35)] active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full md:hidden text-neutral-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl bg-[#181715]/95 backdrop-blur-2xl border border-white/15 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} className="text-[#c5ff41]" />
                </a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full text-center text-sm font-bold uppercase tracking-wider bg-[#c5ff41] text-black shadow-lg shadow-[#c5ff41]/20"
              >
                Let&apos;s Work Together
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
