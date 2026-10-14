'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';
import { ProjectItem } from '@/types/portfolio';
import { Button } from '@/components/common/Button';
import { usePortfolio } from '@/context/PortfolioContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { theme } = usePortfolio();
  const isDark = theme === 'dark';

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-3xl rounded-[32px] overflow-hidden z-10 my-8 flex flex-col max-h-[90vh] transition-colors ${
            isDark
              ? 'bg-[#1c1b18] border border-white/15 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)]'
              : 'bg-white border border-neutral-200 text-neutral-900 shadow-[0_25px_70px_rgba(0,0,0,0.18)]'
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className={`absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg modal-close-btn ${
              isDark
                ? 'bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#1d6de3] hover:border-[#1d6de3]'
                : 'bg-white/95 backdrop-blur-md border border-neutral-300 text-neutral-900 hover:bg-[#1d6de3] hover:text-white hover:border-[#1d6de3] modal-close-btn-light'
            }`}
          >
            <X size={18} className="transition-colors" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto no-scrollbar">
            {/* Banner Image */}
            <div className={`relative w-full aspect-[16/9] overflow-hidden ${isDark ? 'bg-[#131211]' : 'bg-neutral-100'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#1c1b18] via-transparent to-black/30' : 'from-white via-transparent to-black/20'}`} />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-10 -mt-12 relative z-10">
              {/* Category & Year */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] !text-white shadow-sm">
                  {project.category}
                </span>
                {project.year && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isDark
                      ? 'bg-[#131211] border border-white/15 text-neutral-300'
                      : 'bg-neutral-100 border border-neutral-300/80 text-neutral-800 shadow-xs'
                  }`}>
                    <Calendar size={13} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                    {project.year}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h2 className={`text-3xl sm:text-4xl font-black uppercase font-[family-name:var(--font-poppins)] tracking-tight mb-2 ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}>
                {project.title}
              </h2>
              <p className={`text-base sm:text-lg font-semibold mb-6 ${
                isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'
              }`}>
                {project.tagline}
              </p>

              {/* Description */}
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed mb-8 ${
                isDark ? 'text-[#998f8f]' : 'text-neutral-600'
              }`}>
                <p>{project.description}</p>
                <p>
                  Engineered with maximum visual fidelity, fluid micro-interactions, responsive adaptability across mobile, tablet, and widescreen layouts.
                </p>
              </div>

              {/* Technologies Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <span className={`text-xs font-bold tracking-wider uppercase block mb-3 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Technologies & Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isDark
                            ? 'bg-[#131211] border border-white/15 text-neutral-200 hover:border-white/25'
                            : 'bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-300 text-neutral-900 shadow-xs'
                        }`}
                      >
                        <Tag size={12} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={`flex flex-wrap items-center gap-4 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-neutral-200'
              }`}>
                <Button
                  variant="lime"
                  size="md"
                  href={project.link || '#'}
                  external
                  icon={<ExternalLink size={16} />}
                >
                  Visit Live Project
                </Button>

                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                    isDark
                      ? 'bg-[#1c1b18] text-white hover:bg-[#252320] border border-white/15'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300 shadow-xs'
                  }`}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
