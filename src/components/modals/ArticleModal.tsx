'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import { ThoughtItem } from '@/types/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';

interface ArticleModalProps {
  thought: ThoughtItem | null;
  onClose: () => void;
}

export const ArticleModal = ({ thought, onClose }: ArticleModalProps) => {
  const { data } = usePortfolio();

  if (!thought) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
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
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-[#c5ff41] hover:text-black transition-all cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Article Header & Body */}
          <div className="overflow-y-auto p-6 sm:p-12 no-scrollbar">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-[#998f8f] mb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar size={13} className="text-[#c5ff41]" />
                {thought.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-full bg-[#131211] border border-white/5 text-neutral-300">
                <Clock size={12} className="text-[#c5ff41]" />
                {thought.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
              {thought.title}
            </h1>

            {/* Author info pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#131211] border border-white/8 mb-8 w-fit">
              <img
                src={data.profile.avatarUrl || '/assets/avatar.jpg'}
                alt={data.profile.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <span className="text-xs font-bold text-white block">{data.profile.name}</span>
                <span className="text-[11px] text-[#998f8f]">{data.profile.role}</span>
              </div>
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-[#faf7f3] leading-relaxed font-normal">
              {thought.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#998f8f]">
                Tags: {thought.tags?.join(', ') || 'Web, Engineering'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c5ff41] text-black hover:bg-[#d4ff68] transition-all"
              >
                Done Reading
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
