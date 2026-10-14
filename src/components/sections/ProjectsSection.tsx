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

  const ITEMS_PER_PAGE = isMobile ? 1 : 2;
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
      viewport={{ once: true, amount: 0.1 }}
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

      {/* Projects Showcase: 2 Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <AnimatePresence mode="wait">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              onClick={() => onSelectProject(project)}
              className="group relative cursor-pointer flex flex-col justify-between rounded-[24px] overflow-hidden bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.65),0_0_20px_rgba(29,109,227,0.18)]"
            >
              {/* Project Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#151413]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity" />

                {/* Floating Category Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1d6de3] !text-white shadow-md">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/75 backdrop-blur-md !text-white border border-white/20 shadow-xs">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Circular Hover Arrow Button */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center !text-white group-hover:bg-[#1d6de3] group-hover:border-[#1d6de3] transition-all duration-300 z-10 shadow-md">
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 !text-white" />
                </div>
              </div>

              {/* Project Details Footer */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className={`text-lg sm:text-xl font-black tracking-tight uppercase font-[family-name:var(--font-poppins)] transition-colors leading-snug line-clamp-1 mb-1 ${
                    isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium line-clamp-2 mb-3 ${
                    isDark ? 'text-[#998f8f]' : 'text-neutral-600'
                  }`}>
                    {project.tagline || project.description}
                  </p>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className={`flex flex-wrap gap-1.5 pt-2.5 border-t ${
                    isDark ? 'border-white/5' : 'border-neutral-200'
                  }`}>
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide transition-colors ${
                          isDark
                            ? 'bg-white/5 text-[#998f8f] group-hover:text-neutral-200'
                            : 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:text-neutral-900 group-hover:border-neutral-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-3">
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
