'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectItem } from '@/types/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenEditModal: () => void;
}

export const ProjectsSection = ({ onSelectProject, onOpenEditModal }: ProjectsSectionProps) => {
  const { data, isEditMode } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = activeFilter === 'ALL'
    ? data.projects
    : data.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <SectionHeading
          badge="Featured Works"
          title="RECENT PROJECTS"
          subtitle="A curated selection of cutting-edge web applications, interactive templates, and digital design systems."
          action={
            isEditMode ? (
              <button
                type="button"
                onClick={onOpenEditModal}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c5ff41] text-black hover:bg-[#d4ff68] transition-all flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Project
              </button>
            ) : undefined
          }
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#c5ff41] text-black shadow-[0_0_15px_rgba(197,255,65,0.3)]'
                  : 'bg-[#1c1b18] text-[#998f8f] hover:text-white hover:bg-[#252320] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => onSelectProject(project)}
                className="group relative cursor-pointer flex flex-col rounded-[28px] overflow-hidden bg-[#1c1b18] border border-white/8 hover:border-[#c5ff41]/40 transition-all duration-500 hover:-translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(197,255,65,0.15)]"
              >
                {/* Project Image Container with 16:10 Aspect Ratio */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#151413]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Floating Year / Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#131211]/80 backdrop-blur-md text-white border border-white/10">
                      {project.category}
                    </span>
                    {project.year && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 backdrop-blur-md text-[#998f8f] border border-white/5">
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Circular Hover Arrow Button */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#131211]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-[#c5ff41] group-hover:text-black group-hover:border-[#c5ff41] transition-all duration-300 z-10 shadow-lg">
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Project Details Footer */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-poppins)] group-hover:text-[#c5ff41] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-[#998f8f] mb-4">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide bg-white/5 text-[#998f8f] group-hover:text-neutral-300 transition-colors"
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
      </div>
    </section>
  );
};
