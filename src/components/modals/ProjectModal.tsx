'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '@/types/portfolio';
import { Button } from '@/components/common/Button';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
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
          className="relative w-full max-w-3xl rounded-[32px] bg-[#1c1b18] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-[#1d6de3] hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto no-scrollbar">
            {/* Banner Image */}
            <div className="relative w-full aspect-[16/9] bg-[#131211] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-transparent to-black/30" />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-10 -mt-12 relative z-10">
              {/* Category & Year */}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] text-white">
                  {project.category}
                </span>
                {project.year && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#131211] border border-white/10 text-[#998f8f] flex items-center gap-1.5">
                    <Calendar size={13} />
                    {project.year}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-[family-name:var(--font-poppins)] tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-[#60a5fa] mb-6">
                {project.tagline}
              </p>

              {/* Description */}
              <div className="space-y-4 text-sm sm:text-base text-[#998f8f] leading-relaxed mb-8">
                <p>{project.description}</p>
                <p>
                  Engineered with maximum visual fidelity, fluid micro-interactions, responsive adaptability across mobile, tablet, and widescreen layouts.
                </p>
              </div>

              {/* Technologies Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <span className="text-xs font-bold tracking-wider uppercase text-neutral-400 block mb-3">
                    Technologies & Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#131211] border border-white/10 text-neutral-200 flex items-center gap-1.5"
                      >
                        <Tag size={12} className="text-[#60a5fa]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                <Button
                  variant="lime"
                  size="md"
                  href={project.link || '#'}
                  external
                  icon={<ExternalLink size={16} />}
                >
                  Visit Live Project
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={onClose}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
