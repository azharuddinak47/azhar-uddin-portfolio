'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export const Footer = () => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V10.13H5.06v8.37z" />
          </svg>
        );
      case 'twitter / x':
      case 'twitter':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'dribbble':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.89 10.963a10.02 10.02 0 0 1-5.748-.063c-.11-.274-.225-.547-.348-.817a19.64 19.64 0 0 0 5.922-2.316 9.876 9.876 0 0 1 .174 3.196zm-1.106-4.636a17.65 17.65 0 0 1-5.33 2.054 18.06 18.06 0 0 1-3.642-5.276 9.932 9.932 0 0 1 8.972 3.222zM8.98 3.754a20.09 20.09 0 0 0 3.708 5.234 16.59 16.59 0 0 1-9.544 2.766 9.96 9.96 0 0 1 5.836-8zm-6.89 9.07a14.73 14.73 0 0 0 8.847-2.584c.123.272.24.545.352.82a17.47 17.47 0 0 1-4.712 9.088A9.97 9.97 0 0 1 2.09 12.824zm9.324 8.99a19.46 19.46 0 0 0 4.475-8.673c1.782.35 3.522.42 5.163.228a9.957 9.957 0 0 1-9.638 8.445zm6.05-9.84a18.25 18.25 0 0 0-4.992-.25 15.5 15.5 0 0 1-.36-.837 17.2 17.2 0 0 0 5.485.048c-.044.348-.09.697-.133 1.039z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[#100f0e] py-12 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand & Statement */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-xl tracking-tight text-white font-[family-name:var(--font-poppins)]">
              {data.profile.name}
            </span>
            <span className="text-[#60a5fa] text-xs font-bold px-2 py-0.5 rounded-full bg-[#1d6de3]/15 border border-[#1d6de3]/30">
              PRO
            </span>
          </div>
          <p className="text-xs text-[#998f8f] max-w-sm">
            Crafting world-class digital experiences with modern web technologies, thoughtful animation, and precision engineering.
          </p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-3">
          {data.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#1c1b18] text-[#998f8f] hover:text-[#60a5fa] hover:bg-[#252320] border border-white/5 hover:border-[#1d6de3]/40 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={social.platform}
            >
              {getSocialIcon(social.platform) || <span>{social.platform[0]}</span>}
            </a>
          ))}
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#998f8f] hover:text-[#60a5fa] transition-colors group cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="p-1.5 rounded-full bg-[#1c1b18] group-hover:bg-[#1d6de3] group-hover:text-white transition-colors">
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

          <p className="text-[11px] text-[#6a6b6e]">
            © {new Date().getFullYear()} {data.profile.name}. All rights reserved. Built with Next.js & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};
