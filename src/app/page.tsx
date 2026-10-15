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
    y: direction > 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -20 : 20,
    transition: {
      duration: 0.22,
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

  // Dedicated container ref for buttery smooth internal scrolling of long sections
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const boundaryHitRef = useRef<'top' | 'bottom' | null>(null);

  // Reset scroll position and transition locks on section change
  useEffect(() => {
    isTransitioningRef.current = true;
    boundaryHitRef.current = null;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);

    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const TRANSITION_COOLDOWN = 600; // ms
    const WHEEL_THRESHOLD = 22; // px

    const handleWheel = (e: WheelEvent) => {
      // If modal open, do not transition sections
      if (selectedProject || selectedThought) return;

      if (isTransitioningRef.current) {
        return;
      }

      const now = Date.now();
      if (now - lastScrollTimeRef.current < TRANSITION_COOLDOWN) return;

      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      const container = scrollContainerRef.current;
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop && container) {
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const isScrollable = scrollHeight > clientHeight + 15;

        if (isScrollable) {
          const atBottom = scrollTop + clientHeight >= scrollHeight - 12;
          const atTop = scrollTop <= 8;

          // User is scrolling DOWN
          if (e.deltaY > 0) {
            if (!atBottom) {
              // Not at bottom yet -> allow user to view full section down to bottom!
              boundaryHitRef.current = null;
              if (!container.contains(e.target as Node)) {
                container.scrollBy({ top: e.deltaY, behavior: 'smooth' });
              }
              return;
            }
            // User reached the bottom of this section
            if (boundaryHitRef.current !== 'bottom') {
              // First time touching bottom on this stroke - register boundary, wait for next intentional scroll
              boundaryHitRef.current = 'bottom';
              return;
            }
          }

          // User is scrolling UP
          if (e.deltaY < 0) {
            if (!atTop) {
              // Not at top yet -> scroll up through section
              boundaryHitRef.current = null;
              if (!container.contains(e.target as Node)) {
                container.scrollBy({ top: e.deltaY, behavior: 'smooth' });
              }
              return;
            }
            // User reached the top of this section
            if (boundaryHitRef.current !== 'top') {
              boundaryHitRef.current = 'top';
              return;
            }
          }
        }
      } else {
        // Mobile / fallback window scroll check
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const winScrollY = window.scrollY;
        const isWinScrollable = docHeight > winHeight + 25;

        if (isWinScrollable) {
          const atWinBottom = winScrollY + winHeight >= docHeight - 20;
          const atWinTop = winScrollY <= 10;

          if (e.deltaY > 0 && !atWinBottom) return;
          if (e.deltaY < 0 && !atWinTop) return;
        }
      }

      // Transition to next or prev section cleanly
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
      if (isTransitioningRef.current) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < TRANSITION_COOLDOWN) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) < 45) return;

      // On mobile, check window scroll boundary
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const winScrollY = window.scrollY;
      const isWinScrollable = docHeight > winHeight + 30;

      if (isWinScrollable) {
        const atWinBottom = winScrollY + winHeight >= docHeight - 25;
        const atWinTop = winScrollY <= 15;

        // Swiping up to scroll down
        if (diff > 0 && !atWinBottom) return;
        // Swiping down to scroll up
        if (diff < 0 && !atWinTop) return;
      }

      lastScrollTimeRef.current = now;
      if (diff > 0) {
        goToNextSection();
      } else {
        goToPrevSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (selectedProject || selectedThought) return;
      if (isTransitioningRef.current) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < TRANSITION_COOLDOWN) return;

      const container = scrollContainerRef.current;
      const isDesktop = window.innerWidth >= 1024;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (isDesktop && container) {
          const isScrollable = container.scrollHeight > container.clientHeight + 15;
          const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 15;
          if (isScrollable && !atBottom) {
            e.preventDefault();
            container.scrollBy({ top: 140, behavior: 'smooth' });
            return;
          }
        }
        e.preventDefault();
        lastScrollTimeRef.current = now;
        goToNextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (isDesktop && container) {
          const isScrollable = container.scrollHeight > container.clientHeight + 15;
          const atTop = container.scrollTop <= 10;
          if (isScrollable && !atTop) {
            e.preventDefault();
            container.scrollBy({ top: -140, behavior: 'smooth' });
            return;
          }
        }
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
    <div className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#1d6de3] selection:text-white transition-colors duration-300">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Interactive Ceiling Pull-Rope Theme Switch */}
      <PullRopeSwitch />

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Two-Column Master Layout */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 lg:pt-28 pb-20 sm:pb-16 lg:pb-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full relative">
          {/* Left Column: Sticky Profile Card - always on desktop; on mobile shown on home section */}
          <SidebarProfileCard className={activeSection === 'home' ? 'block' : 'hidden lg:block'} />

          {/* Right Column: Single Section Screen with buttery smooth internal scroll and crossfade */}
          <main
            ref={scrollContainerRef}
            className="flex-1 w-full min-w-0 relative lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:overflow-x-hidden custom-scrollbar no-scrollbar"
            style={{ overscrollBehavior: 'contain' }}
          >
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={activeSection}
                custom={slideDirection}
                variants={sectionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col justify-start"
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
