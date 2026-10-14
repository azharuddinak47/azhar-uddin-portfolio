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
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

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
            aria-label="Close article modal"
            className={`absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg modal-close-btn ${
              isDark
                ? 'bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#1d6de3] hover:border-[#1d6de3]'
                : 'bg-white/95 backdrop-blur-md border border-neutral-300 text-neutral-900 hover:bg-[#1d6de3] hover:text-white hover:border-[#1d6de3] modal-close-btn-light'
            }`}
          >
            <X size={18} className="transition-colors" />
          </button>

          {/* Article Header & Body */}
          <div className="overflow-y-auto p-6 sm:p-12 no-scrollbar">
            {/* Meta */}
            <div className={`flex items-center gap-3 text-xs mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar size={13} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                {thought.date}
              </span>
              <span>•</span>
              <span className={`flex items-center gap-1.5 font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-[#131211] border border-white/10 text-neutral-300'
                  : 'bg-neutral-100 border border-neutral-300/80 text-neutral-800 shadow-xs'
              }`}>
                <Clock size={12} className={isDark ? 'text-[#60a5fa]' : 'text-[#1d6de3]'} />
                {thought.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              {thought.title}
            </h1>

            {/* Author info pill */}
            <div className={`flex items-center gap-3 p-3 rounded-2xl mb-8 w-fit transition-colors ${
              isDark
                ? 'bg-[#131211] border border-white/8 text-white'
                : 'bg-neutral-100 border border-neutral-200 text-neutral-900 shadow-xs'
            }`}>
              <img
                src={data.profile.avatarUrl || '/assets/avatar.jpg'}
                alt={data.profile.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {data.profile.name}
                </span>
                <span className={`text-[11px] ${isDark ? 'text-[#998f8f]' : 'text-neutral-600'}`}>
                  {data.profile.role}
                </span>
              </div>
            </div>

            {/* Content Paragraphs */}
            <div className={`space-y-5 text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? 'text-neutral-200' : 'text-neutral-800'
            }`}>
              {thought.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div className={`mt-10 pt-6 border-t flex items-center justify-between ${
              isDark ? 'border-white/10' : 'border-neutral-200'
            }`}>
              <span className={`text-xs ${isDark ? 'text-[#998f8f]' : 'text-neutral-600'}`}>
                Tags: {thought.tags?.join(', ') || 'Web, Engineering'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] !text-white hover:bg-[#2563eb] transition-all shadow-[0_0_15px_rgba(29,109,227,0.35)] cursor-pointer"
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
