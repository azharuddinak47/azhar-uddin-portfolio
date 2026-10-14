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
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PullRopeSwitch } from '@/components/ui/PullRopeSwitch';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { ProjectItem, ThoughtItem } from '@/types/portfolio';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedThought, setSelectedThought] = useState<ThoughtItem | null>(null);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#1d6de3] selection:text-white transition-colors duration-300">
        {/* Precision Custom Cursor */}
        <CustomCursor />

        {/* Interactive Ceiling Pull-Rope Theme Switch */}
        <PullRopeSwitch />

        {/* Floating Navigation Bar */}
        <Navbar />

        {/* Two-Column Master Layout matching Sawad Framer */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-32 sm:pt-36 lg:pt-40 pb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full relative">
            {/* Left Column: Sticky Profile Card - always solid, crisp, and never faded */}
            <SidebarProfileCard />

            {/* Right Column: Scrollable Feed */}
            <main className="flex-1 w-full min-w-0 flex flex-col gap-24 sm:gap-28 lg:gap-32 relative">
            {/* Hero Section */}
            <RightHeroSection />

            {/* Recent Projects Showcase */}
            <ProjectsSection
              onSelectProject={(project) => setSelectedProject(project)}
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
    </div>
    </SmoothScroll>
  );
}
