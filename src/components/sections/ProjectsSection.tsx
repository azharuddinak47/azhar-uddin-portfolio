'use client';

import React from 'react';
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
          subtitle="Curated digital products, design systems, and mobile applications."
          className="mb-0"
          showDivider={false}
        />
      </div>

      {/* Projects Showcase: Clean Horizontal Cards matching reference layout */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        {data.projects.map((project, index) => (
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
    </motion.section>
  );
};
