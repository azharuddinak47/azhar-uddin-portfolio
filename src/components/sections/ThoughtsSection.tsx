'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ThoughtItem } from '@/types/portfolio';

interface ThoughtsSectionProps {
  onSelectThought: (thought: ThoughtItem) => void;
}

export const ThoughtsSection = ({ onSelectThought }: ThoughtsSectionProps) => {
  const { data } = usePortfolio();

  return (
    <section id="thoughts" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeading
          title="DESIGN THOUGHTS"
          subtitle="Insights, essays, and technical reflections on modern web engineering, interface psychology, and creative tooling."
        />

        {/* Thought / Blog Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.thoughts.map((thought, index) => (
            <motion.div
              key={thought.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => onSelectThought(thought)}
              className="group cursor-pointer p-6 sm:p-8 rounded-[24px] bg-[#1c1b18] border border-white/8 hover:border-[#1d6de3]/45 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(29,109,227,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Metadata Row: Date & Read Time */}
                <div className="flex items-center gap-3 text-xs text-[#998f8f] mb-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={13} className="text-[#60a5fa]" />
                    {thought.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-full bg-[#131211] border border-white/5 text-neutral-300">
                    <Clock size={12} className="text-[#60a5fa]" />
                    {thought.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#60a5fa] transition-colors mb-3 leading-snug">
                  {thought.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#998f8f] leading-relaxed line-clamp-3 mb-6">
                  {thought.excerpt}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-[#60a5fa]" />
                  Read Full Article
                </span>
                <div className="w-8 h-8 rounded-full bg-[#131211] flex items-center justify-center text-neutral-400 group-hover:bg-[#1d6de3] group-hover:text-white transition-all shadow-md">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
