'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectItem } from '@/types/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenEditModal?: () => void;
}

export const ProjectsSection = ({ onSelectProject }: ProjectsSectionProps) => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col pt-0 pb-4 scroll-mt-0 relative select-text"
    >
      {/* Top Header without line or extra spacing */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-5">
        <SectionHeading
          title="RECENT PROJECTS"
          size="90"
          weight="black"
          subtitle="Curated digital products, design systems, and mobile applications."
          className="mb-0"
          showDivider={false}
        />
      </div>

      {/* Projects Showcase: Clean Horizontal Cards matching reference layout */}
      <div className="flex flex-col gap-3 sm:gap-3.5">
        {data.projects.slice(0, 4).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={() => onSelectProject(project)}
            className={`group relative cursor-pointer flex items-center justify-between gap-4 sm:gap-6 rounded-[20px] sm:rounded-[24px] p-3 sm:p-3.5 md:p-4 transition-all duration-300 hover:-translate-y-0.5 ${
              isDark
                ? 'bg-[#16202a] hover:bg-[#1e2c3a] border border-[#1d6de3]/15 hover:border-[#1d6de3]/35 shadow-[0_10px_25px_rgba(0,0,0,0.45)]'
                : 'bg-white hover:bg-[#fcfcfd] border border-black/[0.04] hover:border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]'
            }`}
          >
            {/* Left: Project Image Thumbnail */}
            <div className="relative w-24 h-18 sm:w-28 sm:h-20 md:w-32 md:h-22 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-[#11181F] border border-white/10 group-hover:border-[#1d6de3]/40 transition-all duration-300">
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
            <a
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Open Case Study"
              className="self-start sm:self-center pt-2 sm:pt-0 pr-1 sm:pr-3 shrink-0"
            >
              <ArrowUpRight
                size={24}
                className="text-[#f46c38] group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA (Prevents Page Bloat) */}
      {data.projects.length > 4 && (
        <div className="pt-5 flex justify-center">
          <Link
            href="/projects"
            className={`group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md ${
              isDark
                ? 'bg-[#16202a] text-white hover:bg-[#1e2c3a] border border-[#1d6de3]/25 hover:border-[#1d6de3]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                : 'bg-white text-neutral-900 hover:bg-[#f1f3f5] border border-black/10 hover:border-black/20'
            }`}
          >
            <span>View All Projects ({data.projects.length})</span>
            <div className="w-6 h-6 rounded-full bg-[#1d6de3] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>
      )}
    </motion.section>
  );
};
