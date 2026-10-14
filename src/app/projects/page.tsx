'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  ArrowUpRight, 
  Layers, 
  ExternalLink,
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ProjectItem } from '@/types/portfolio';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PullRopeSwitch } from '@/components/ui/PullRopeSwitch';
import { Footer } from '@/components/layout/Footer';

export default function ProjectsArchivePage() {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [data.projects]);

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        (project.tagline && project.tagline.toLowerCase().includes(q)) ||
        (project.category && project.category.toLowerCase().includes(q)) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(q))) ||
        (project.description && project.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [data.projects, selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#1d6de3] selection:text-white transition-colors duration-300">
      <CustomCursor />
      <PullRopeSwitch />

      {/* Top Breadcrumb & Navigation Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl border-b transition-colors px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between"
        style={{
          borderColor: isDark ? 'rgba(29, 109, 227, 0.15)' : 'rgba(0,0,0,0.06)',
          backgroundColor: isDark ? 'rgba(17, 24, 31, 0.85)' : 'rgba(255, 255, 255, 0.85)'
        }}
      >
        <Link
          href="/"
          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-[#16202a] text-white hover:bg-[#1e2c3a] border border-[#1d6de3]/20'
              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-200'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="font-bold text-sm sm:text-base tracking-tight font-[family-name:var(--font-poppins)]">
            {data.profile.name}
          </span>
          <span className="text-[#60a5fa] text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1d6de3]/15 border border-[#1d6de3]/30">
            ARCHIVE
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-24">
        {/* Hero Section */}
        <div className="flex flex-col gap-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#1d6de3]/15 text-[#60a5fa] border border-[#1d6de3]/30">
              <Sparkles size={12} />
              Full Portfolio Archive
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isDark ? 'bg-[#16202a] text-neutral-400 border border-white/5' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-black tracking-tight uppercase font-[family-name:var(--font-poppins)]">
            All Projects & Case Studies
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            An exhaustive collection of digital products, enterprise design systems, mobile apps, and interactive web experiences designed by {data.profile.name}.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className={`p-4 sm:p-5 rounded-[24px] border mb-10 sm:mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between transition-colors shadow-sm ${
          isDark
            ? 'bg-[#16202a] border-[#1d6de3]/15'
            : 'bg-white border-neutral-200'
        }`}>
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#1d6de3] text-white shadow-[0_0_15px_rgba(29,109,227,0.4)]'
                      : isDark
                      ? 'bg-[#11181F] text-neutral-400 hover:text-white border border-white/5 hover:border-[#1d6de3]/30'
                      : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search
              size={16}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            />
            <input
              type="text"
              placeholder="Search projects, tags, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-9 py-2.5 rounded-full text-xs sm:text-sm outline-none transition-all ${
                isDark
                  ? 'bg-[#11181F] border border-white/10 text-white placeholder-neutral-500 focus:border-[#1d6de3] focus:ring-2 focus:ring-[#1d6de3]/20'
                  : 'bg-neutral-100 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#1d6de3] focus:bg-white focus:ring-2 focus:ring-[#1d6de3]/20'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid: 2-Column Responsive Card Showcase */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-[28px] overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#16202a] hover:bg-[#1e2c3a] border-[#1d6de3]/15 hover:border-[#1d6de3]/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(29,109,227,0.2)]'
                    : 'bg-white hover:bg-[#fcfcfd] border-black/[0.04] hover:border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
                }`}
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#11181F]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/15">
                        {project.category}
                      </span>
                    </div>

                    {/* Year Tag */}
                    {project.year && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1d6de3] text-white shadow-md">
                          {project.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7">
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight font-[family-name:var(--font-poppins)] mb-2 transition-colors ${
                      isDark ? 'text-white group-hover:text-[#60a5fa]' : 'text-neutral-900 group-hover:text-[#1d6de3]'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {project.description || project.tagline}
                    </p>

                    {/* Tech & Skill Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                              isDark
                                ? 'bg-[#11181F] text-neutral-300 border border-white/5'
                                : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className={`p-5 sm:p-7 pt-0 flex items-center justify-between border-t mt-2 ${
                  isDark ? 'border-white/5' : 'border-neutral-100'
                }`}>
                  <span className="text-xs font-bold text-[#1d6de3] group-hover:underline">
                    View Case Study
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#f46c38] text-white flex items-center justify-center transition-transform group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-md">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Empty State when no results found */
          <div className={`p-16 rounded-[32px] border text-center flex flex-col items-center justify-center gap-4 ${
            isDark ? 'bg-[#16202a] border-white/5' : 'bg-white border-neutral-200'
          }`}>
            <div className="w-16 h-16 rounded-full bg-[#1d6de3]/15 text-[#1d6de3] flex items-center justify-center mb-2">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold">No projects matched your criteria</h3>
            <p className="text-sm text-neutral-400 max-w-sm">
              Try adjusting your search terms or choosing &quot;All&quot; from the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1d6de3] text-white hover:bg-[#2563eb] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
