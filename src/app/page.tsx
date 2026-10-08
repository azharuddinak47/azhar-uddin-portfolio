'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SidebarProfileCard } from '@/components/layout/SidebarProfileCard';
import { RightHeroSection } from '@/components/sections/RightHeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { CredentialsSection } from '@/components/sections/CredentialsSection';
import { ThoughtsSection } from '@/components/sections/ThoughtsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { ArticleModal } from '@/components/modals/ArticleModal';
import { EditPortfolioModal } from '@/components/modals/EditPortfolioModal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ProjectItem, ThoughtItem } from '@/types/portfolio';
import { usePortfolio } from '@/context/PortfolioContext';
import { Edit3 } from 'lucide-react';

export default function Home() {
  const { isEditMode } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedThought, setSelectedThought] = useState<ThoughtItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className={`relative min-h-screen bg-[#131211] text-white selection:bg-[#1d6de3] selection:text-white ${isEditMode ? 'edit-active' : ''}`}>
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation Bar */}
      <Navbar onOpenEditModal={() => setIsEditModalOpen(true)} />

      {/* Two-Column Master Layout matching Sawad Framer */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          {/* Left Column: Sticky Profile Card */}
          <SidebarProfileCard onOpenEditModal={() => setIsEditModalOpen(true)} />

          {/* Right Column: Scrollable Feed */}
          <main className="flex-1 w-full min-w-0 flex flex-col gap-16 sm:gap-24 overflow-hidden">
            {/* Hero Section */}
            <RightHeroSection onOpenEditModal={() => setIsEditModalOpen(true)} />

            {/* Recent Projects Showcase */}
            <ProjectsSection
              onSelectProject={(project) => setSelectedProject(project)}
              onOpenEditModal={() => setIsEditModalOpen(true)}
            />

            {/* Experience Timeline */}
            <ExperienceSection />

            {/* Key Skills & Tools */}
            <ToolsSection />

            {/* Certifications & Academics from CV */}
            <CredentialsSection />

            {/* Design Thoughts & Articles */}
            <ThoughtsSection
              onSelectThought={(thought) => setSelectedThought(thought)}
            />

            {/* Contact / Let's Work Together */}
            <ContactSection />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ArticleModal
        thought={selectedThought}
        onClose={() => setSelectedThought(null)}
      />

      <EditPortfolioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Floating Bottom Edit Mode Quick Pill */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#181715]/90 hover:bg-[#201f1c] text-[#60a5fa] border border-[#1d6de3]/40 hover:border-[#1d6de3] shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(29,109,227,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <div className="w-6 h-6 rounded-full bg-[#1d6de3] text-white flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(29,109,227,0.4)]">
            <Edit3 size={13} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#60a5fa] transition-colors">
              Edit Portfolio
            </span>
            <span className="text-[10px] text-[#998f8f] -mt-0.5">
              Press Ctrl+E
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
