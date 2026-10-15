'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SidebarProfileCard } from '@/components/layout/SidebarProfileCard';
import { RightHeroSection } from '@/components/sections/RightHeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { CredentialsSection } from '@/components/sections/CredentialsSection';
import { ThoughtsSection } from '@/components/sections/ThoughtsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { ArticleModal } from '@/components/modals/ArticleModal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PullRopeSwitch } from '@/components/ui/PullRopeSwitch';
import { usePortfolio, SECTION_IDS, SectionId } from '@/context/PortfolioContext';
import { ProjectItem, ThoughtItem } from '@/types/portfolio';
import { ChevronUp, ChevronDown } from 'lucide-react';

const sectionVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 35 : -35,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -35 : 35,
    filter: 'blur(8px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Home() {
  const {
    activeSection,
    setActiveSection,
    slideDirection,
    goToNextSection,
    goToPrevSection,
    theme,
  } = usePortfolio();

  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedThought, setSelectedThought] = useState<ThoughtItem | null>(null);

  const currentIndex = SECTION_IDS.indexOf(activeSection);
  const totalSections = SECTION_IDS.length;
  const currentFormattedIndex = String(currentIndex + 1).padStart(2, '0');
  const totalFormattedSections = String(totalSections).padStart(2, '0');

  // Cooldown and wheel lock to prevent rapid skipping
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const WHEEL_COOLDOWN = 750; // ms
    const WHEEL_THRESHOLD = 25; // px

    const handleWheel = (e: WheelEvent) => {
      // If modal open, do not transition sections
      if (selectedProject || selectedThought) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < WHEEL_COOLDOWN) return;

      // Allow internal scrolling if target element has overflow
      const target = e.target as HTMLElement;
      const scrollable = target.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 5;
        const atTop = scrollable.scrollTop <= 5;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      if (e.deltaY > 0) {
        lastScrollTimeRef.current = now;
        goToNextSection();
      } else if (e.deltaY < 0) {
        lastScrollTimeRef.current = now;
        goToPrevSection();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (selectedProject || selectedThought) return;
      const now = Date.now();
      if (now - lastScrollTimeRef.current < WHEEL_COOLDOWN) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 45) {
        lastScrollTimeRef.current = now;
        if (diff > 0) {
          goToNextSection();
        } else {
          goToPrevSection();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (selectedProject || selectedThought) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < WHEEL_COOLDOWN) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        lastScrollTimeRef.current = now;
        goToNextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        lastScrollTimeRef.current = now;
        goToPrevSection();
      }
    };

    // Intercept internal anchor links like #contact or #projects
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetId = href.replace('#', '') as SectionId;
        if (SECTION_IDS.includes(targetId)) {
          e.preventDefault();
          setActiveSection(targetId);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [selectedProject, selectedThought, goToNextSection, goToPrevSection, setActiveSection]);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#1d6de3] selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Interactive Ceiling Pull-Rope Theme Switch */}
      <PullRopeSwitch />

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Two-Column Master Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-32 lg:pt-36 pb-28 sm:pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full relative">
          {/* Left Column: Sticky Profile Card - always on desktop; on mobile shown on home section */}
          <SidebarProfileCard className={activeSection === 'home' ? 'block' : 'hidden lg:block'} />

          {/* Right Column: Single Section Screen with crossfade */}
          <main className="flex-1 w-full min-w-0 relative">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={activeSection}
                custom={slideDirection}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {activeSection === 'home' && <RightHeroSection />}
                {activeSection === 'projects' && (
                  <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
                )}
                {activeSection === 'experience' && <ExperienceSection />}
                {activeSection === 'tools' && <ToolsSection />}
                {activeSection === 'credentials' && <CredentialsSection />}
                {activeSection === 'thoughts' && (
                  <ThoughtsSection onSelectThought={(thought) => setSelectedThought(thought)} />
                )}
                {activeSection === 'contact' && (
                  <div className="flex flex-col gap-10 sm:gap-12">
                    <ContactSection />
                    <Footer />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Sleek Floating Section Pagination & Navigation Controls */}
      <aside aria-label="Section Navigation" className="fixed top-4 right-4 sm:top-auto sm:bottom-7 sm:right-7 z-40 pointer-events-auto">
        <div className={`flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-lg backdrop-blur-xl transition-all duration-300 ${
          isDark
            ? 'bg-[#16202a]/90 border-white/10 text-white'
            : 'bg-white/90 border-neutral-200 text-neutral-900 shadow-neutral-200/50'
        }`}>
          {/* Section Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-poppins)] select-none">
            <span className="text-[#1d6de3]">{currentFormattedIndex}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-60">{totalFormattedSections}</span>
            <span className="hidden sm:inline-block ml-1 opacity-70 text-[10px]">• {activeSection}</span>
          </div>

          <div className="w-px h-3.5 bg-neutral-300 dark:bg-neutral-700 mx-0.5" />

          {/* Up (Prev) Arrow */}
          <button
            onClick={goToPrevSection}
            disabled={currentIndex === 0}
            title="Previous Section (or Scroll Up / Arrow Up)"
            aria-label="Previous Section"
            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors disabled:opacity-25 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:pointer-events-none"
          >
            <ChevronUp size={16} />
          </button>

          {/* Down (Next) Arrow */}
          <button
            onClick={goToNextSection}
            disabled={currentIndex === totalSections - 1}
            title="Next Section (or Scroll Down / Arrow Down)"
            aria-label="Next Section"
            className="w-6 h-6 rounded-full flex items-center justify-center transition-colors disabled:opacity-25 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:pointer-events-none"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ArticleModal
        thought={selectedThought}
        onClose={() => setSelectedThought(null)}
      />
    </div>
  );
}
