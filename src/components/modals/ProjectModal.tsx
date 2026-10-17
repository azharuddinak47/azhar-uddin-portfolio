'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
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
              ? 'bg-[#16202a] border border-[#1d6de3]/20 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)]'
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
            <div className={`relative w-full aspect-[16/9] overflow-hidden ${isDark ? 'bg-[#11181F]' : 'bg-neutral-100'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#16202a] via-transparent to-black/30' : 'from-white via-transparent to-black/20'}`} />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-10 -mt-12 relative z-10">
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
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? 'text-[#998f8f]' : 'text-neutral-600'
              }`}>
                <p>{project.description}</p>
                <p>
                  Engineered with maximum visual fidelity, fluid micro-interactions, responsive adaptability across mobile, tablet, and widescreen layouts.
                </p>
              </div>

              {/* Action Buttons: Behance Case Study & App Store Link */}
              <div className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-5 border-t ${
                isDark ? 'border-white/10' : 'border-neutral-200'
              }`}>
                {/* Behance Case Study Button */}
                <Button
                  variant="lime"
                  size="md"
                  href={project.link || 'https://www.behance.net/azharuddin-uiux'}
                  external
                  icon={<ExternalLink size={16} />}
                >
                  Behance Case Study
                </Button>

                {/* App Store Link Button */}
                <Button
                  variant={isDark ? 'secondary' : 'outline'}
                  size="md"
                  href={project.appStoreLink || project.appLink || 'https://apps.apple.com'}
                  external
                  icon={
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.07.62-2.73 1.39-.58.67-1.1 1.76-.96 2.81 1.04.08 2.12-.5 2.75-1.27z" />
                    </svg>
                  }
                  iconPosition="left"
                  className={!isDark ? '!text-neutral-900 !border-neutral-300 hover:!bg-neutral-100' : ''}
                >
                  App Store
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
