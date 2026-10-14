'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectItem } from '@/types/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenEditModal: () => void;
}

export const ProjectsSection = ({ onSelectProject, onOpenEditModal }: ProjectsSectionProps) => {
  const { data, isEditMode, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = ['ALL', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = activeFilter === 'ALL'
    ? data.projects
    : data.projects.filter(p => p.category === activeFilter);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Keep page in bounds if filter changes
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const currentProjects = filteredProjects.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col py-2 scroll-mt-24 lg:scroll-mt-28 relative select-text"
    >
      {/* Top Header & Interactive Filter Bar */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <SectionHeading
            title="RECENT PROJECTS"
            subtitle="Curated digital products, design systems, and mobile applications."
            className="mb-0"
            action={
              isEditMode ? (
                <button
                  type="button"
                  onClick={onOpenEditModal}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] text-white hover:bg-[#2563eb] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(29,109,227,0.35)] cursor-pointer"
                >
                  <Plus size={13} /> Add
                </button>
              ) : undefined
            }
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pb-1">
              <span className="text-xs font-semibold text-[#888888] tracking-wider uppercase mr-1">
                {safePage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Projects"
                className="w-8 h-8 rounded-full bg-[#1c1b18] hover:bg-[#252320] border border-white/10 flex items-center justify-center text-white hover:border-[#1d6de3]/40 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Projects"
                className="w-8 h-8 rounded-full bg-[#1c1b18] hover:bg-[#252320] border border-white/10 flex items-center justify-center text-white hover:border-[#1d6de3]/40 transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveFilter(cat);
                setCurrentPage(0);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#1d6de3] text-white shadow-[0_0_12px_rgba(29,109,227,0.4)]'
                  : 'bg-[#1c1b18] text-[#998f8f] hover:text-white hover:bg-[#252320] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase: Clean Horizontal Cards matching reference layout */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        <AnimatePresence mode="wait">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => onSelectProject(project)}
              className={`group relative cursor-pointer flex items-center justify-between gap-4 sm:gap-6 rounded-[22px] sm:rounded-[26px] p-3 sm:p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#161513] hover:bg-[#1c1b18] border border-white/[0.07] hover:border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.45)]'
                  : 'bg-white hover:bg-[#faf9f6] border border-black/8 hover:border-black/15 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Left: Project Image Thumbnail */}
              <div className="relative w-24 h-18 sm:w-32 sm:h-24 md:w-38 md:h-26 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-[#121110] border border-white/10 group-hover:border-[#1d6de3]/40 transition-all duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Middle: Title & Tagline/Category */}
              <div className="flex-1 min-w-0 pr-2">
                <h3
                  className={`text-lg sm:text-2xl font-black tracking-tight font-[family-name:var(--font-poppins)] transition-colors truncate mb-1 sm:mb-1.5 ${
                    isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm md:text-base font-medium truncate ${
                    isDark ? 'text-[#8a8a8e]' : 'text-neutral-600'
                  }`}
                >
                  {project.tagline || project.category}
                </p>
              </div>

              {/* Right: Orange Diagonal Arrow matching reference design */}
              <div className="self-start sm:self-center pt-2 sm:pt-0 pr-1 sm:pr-3 shrink-0">
                <ArrowUpRight
                  size={24}
                  className="text-[#f46c38] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                safePage === idx ? 'w-6 bg-[#1d6de3]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};
