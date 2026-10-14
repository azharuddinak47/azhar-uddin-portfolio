'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowUpRight, Sparkles, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

// Custom Crisp SVG Icons matching Dribbble, Behance, Facebook, Instagram, and LinkedIn
const DribbbleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.89 10.963a10.02 10.02 0 0 1-5.748-.063c-.11-.274-.225-.547-.348-.817a19.64 19.64 0 0 0 5.922-2.316 9.876 9.876 0 0 1 .174 3.196zm-1.106-4.636a17.65 17.65 0 0 1-5.33 2.054 18.06 18.06 0 0 1-3.642-5.276 9.932 9.932 0 0 1 8.972 3.222zM8.98 3.754a20.09 20.09 0 0 0 3.708 5.234 16.59 16.59 0 0 1-9.544 2.766 9.96 9.96 0 0 1 5.836-8zm-6.89 9.07a14.73 14.73 0 0 0 8.847-2.584c.123.272.24.545.352.82a17.47 17.47 0 0 1-4.712 9.088A9.97 9.97 0 0 1 2.09 12.824zm9.324 8.99a19.46 19.46 0 0 0 4.475-8.673c1.782.35 3.522.42 5.163.228a9.957 9.957 0 0 1-9.638 8.445zm6.05-9.84a18.25 18.25 0 0 0-4.992-.25 15.5 15.5 0 0 1-.36-.837 17.2 17.2 0 0 0 5.485.048c-.044.348-.09.697-.133 1.039z" />
  </svg>
);

const BehanceIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.411 0-5.75-2.69-5.75-6.194 0-3.614 2.508-6.306 6.008-6.306 3.652 0 5.492 2.766 5.253 6.643h-8.775c.108 1.944 1.488 3.232 3.518 3.232 1.621 0 2.65-.724 3.125-1.745l1.597 1.37zm-7.25-4.484h6.292c-.126-1.895-1.396-2.92-3.136-2.92-1.879 0-3.003 1.085-3.156 2.92zM8.008 12.015c1.442-.423 2.292-1.464 2.292-2.887 0-2.439-1.93-3.628-4.708-3.628H0v13h5.792c3.042 0 5.208-1.378 5.208-4.108 0-1.428-.854-2.28-2.992-2.377zM3 7.5h2.417c1.375 0 2.208.563 2.208 1.688 0 1.083-.833 1.687-2.208 1.687H3V7.5zm2.708 9H3v-3.75h2.708c1.5 0 2.459.667 2.459 1.875 0 1.25-.959 1.875-2.459 1.875z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V10.13H5.06v8.37z" />
  </svg>
);

export const SidebarProfileCard = ({ onOpenEditModal }: { onOpenEditModal: () => void }) => {
  const { data, isEditMode } = usePortfolio();
  const { profile } = data;

  const cardDescription = profile.subHeadline || 'A Product Designer who has crafted intuitive and impactful digital solutions.';

  return (
    <aside className="w-full lg:w-[350px] shrink-0 static lg:sticky lg:top-28 lg:self-start z-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[28px] sm:rounded-[32px] bg-white text-[#111111] p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center relative overflow-hidden group border border-white/20 transition-all duration-300"
      >
        {/* Top-Left Decorative Dashed Arc */}
        <div className="absolute -top-3 -left-3 w-40 h-24 pointer-events-none z-0">
          <svg viewBox="0 0 194 100" className="w-full h-full" fill="#1b61a9">
            <path d="M 0 34.544 L 3.22 33.201 C 4.186 35.732 5.256 38.221 6.429 40.663 L 3.329 42.293 C 2.113 39.757 1.002 37.172 0 34.544 Z M 7.294 49.71 L 10.246 47.806 C 11.613 50.127 13.073 52.392 14.622 54.596 L 11.828 56.748 C 10.223 54.464 8.711 52.116 7.294 49.71 Z M 16.894 63.37 L 19.509 60.989 C 21.22 63.047 23.012 65.037 24.881 66.953 L 22.454 69.543 C 20.522 67.557 18.667 65.498 16.894 63.369 Z M 28.47 75.232 L 30.69 72.449 C 32.693 74.197 34.764 75.864 36.9 77.447 L 34.895 80.41 C 32.688 78.767 30.544 77.04 28.47 75.232 Z M 41.7 85.029 L 43.471 81.912 C 45.712 83.304 48.011 84.603 50.36 85.804 L 48.836 89.061 C 46.403 87.816 44.022 86.471 41.7 85.029 Z M 56.27 92.473 L 57.53 89.093 C 59.958 90.083 62.428 90.966 64.934 91.737 L 63.955 95.216 C 61.354 94.415 58.79 93.5 56.27 92.473 Z M 71.836 97.256 L 72.519 93.701 C 73.429 93.891 74.342 94.067 75.251 94.225 C 76.906 94.514 78.569 94.754 80.238 94.947 L 79.861 98.552 C 77.167 98.245 74.489 97.813 71.836 97.256 Z M 87.974 99.1 L 88.046 95.474 C 90.656 95.532 93.266 95.474 95.871 95.301 L 96.088 98.921 C 93.387 99.099 90.68 99.159 87.974 99.101 Z M 103.652 94.44 C 106.238 94.042 108.805 93.535 111.348 92.92 L 112.127 96.454 C 109.493 97.088 106.834 97.613 104.157 98.027 L 103.652 94.439 Z M 118.899 90.762 C 121.391 89.934 123.848 89.006 126.265 87.979 L 127.572 91.337 C 125.07 92.402 122.526 93.364 119.946 94.22 Z M 133.4 84.59 C 135.738 83.362 138.023 82.036 140.251 80.618 L 142.053 83.717 C 139.745 85.184 137.379 86.556 134.959 87.829 L 133.4 84.589 Z M 146.773 76.083 C 148.89 74.477 150.937 72.782 152.91 71.002 L 155.175 73.749 C 153.128 75.594 151.004 77.351 148.808 79.016 Z M 158.611 65.4 C 160.436 63.446 162.174 61.412 163.821 59.306 L 166.505 61.601 C 164.795 63.791 162.988 65.904 161.092 67.935 Z M 168.516 52.75 C 170.003 50.493 171.409 48.184 172.731 45.826 L 175.721 47.665 C 174.354 50.096 172.904 52.479 171.372 54.81 Z M 176.507 38.612 C 177.694 36.166 178.817 33.682 179.881 31.164 L 183.049 32.633 C 181.963 35.204 180.81 37.745 179.592 40.256 Z M 182.922 23.537 C 183.887 20.966 184.809 18.379 185.688 15.777 L 188.956 16.991 C 188.056 19.634 187.126 22.262 186.148 24.862 Z M 188.238 7.924 C 189.062 5.288 189.858 2.645 190.641 -0.001 L 193.953 1.073 C 193.168 3.738 192.361 6.396 191.533 9.048 Z" />
          </svg>
        </div>

        {/* Top: Portrait Image in Styled Rounded Frame */}
        <div className="relative w-full max-w-[250px] aspect-[4/4.8] rounded-[22px] overflow-hidden bg-[#181716] shadow-sm mb-5 z-10 group/img">
          <img
            src={profile.avatarUrl || '/assets/avatar.jpg'}
            alt={profile.name}
            className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-all duration-500"
          />
        </div>

        {/* Name matching Sawad typography */}
        <h2 className="text-2xl sm:text-[28px] font-black text-[#111111] tracking-tight font-[family-name:var(--font-poppins)] text-center mb-3 z-10 select-text cursor-text">
          {profile.name?.trim() || 'Md Azhar Uddin'}
        </h2>

        {/* Sparkle/Flame Badge and Connecting Dashed Arc */}
        <div className="relative flex items-center justify-center w-full mb-3 z-10 pointer-events-none">
          {/* Dashed blue arc leading from the left edge to the badge */}
          <div className="absolute right-[50%] mr-4 w-32 h-12 pointer-events-none">
            <svg viewBox="0 0 120 50" className="w-full h-full overflow-visible">
              <path
                d="M -15,40 C 35,40 70,25 115,10"
                fill="none"
                stroke="#1b61a9"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Badge */}
          <div className="w-8 h-8 rounded-full bg-[#1d6de3] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(29,109,227,0.45)] relative z-10 transition-transform duration-300 hover:scale-110 pointer-events-auto">
            <Flame size={17} className="fill-white text-white" />
          </div>
        </div>

        {/* Short Subtitle / Bio matching Sawad */}
        <p className="text-sm sm:text-[15px] font-medium text-[#6a6b6e] text-center leading-snug max-w-[270px] mb-6 z-10 font-[family-name:var(--font-poppins)] select-text cursor-text">
          {cardDescription}
        </p>

        {/* Social Media Row (Blue Brand Icons: Dribbble, Behance, Facebook, Instagram, LinkedIn) */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mb-6 z-10 text-[#1d6de3]">
          <a
            href={profile.dribbbleUrl && profile.dribbbleUrl !== 'https://dribbble.com' ? profile.dribbbleUrl : 'https://dribbble.com/azharuddin-uiux'}
            target="_blank"
            rel="noopener noreferrer"
            title="Dribbble Profile"
            aria-label="Dribbble Profile"
            className="hover:scale-125 transition-transform duration-200"
          >
            <DribbbleIcon className="w-5 h-5 hover:text-[#1553a0] transition-colors" />
          </a>

          <a
            href={profile.behanceUrl || 'https://www.behance.net/azharuddin-uiux'}
            target="_blank"
            rel="noopener noreferrer"
            title="Behance Profile"
            aria-label="Behance Profile"
            className="hover:scale-125 transition-transform duration-200"
          >
            <BehanceIcon className="w-5 h-5 hover:text-[#1553a0] transition-colors" />
          </a>

          <a
            href={profile.facebookUrl && profile.facebookUrl !== 'https://facebook.com' ? profile.facebookUrl : 'https://www.facebook.com/azharuddinak47/'}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Profile"
            aria-label="Facebook Profile"
            className="hover:scale-125 transition-transform duration-200"
          >
            <FacebookIcon className="w-5 h-5 hover:text-[#1553a0] transition-colors" />
          </a>

          <a
            href={profile.instagramUrl && profile.instagramUrl !== 'https://instagram.com' ? profile.instagramUrl : 'https://www.instagram.com/azharuddinak47/'}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
            aria-label="Instagram Profile"
            className="hover:scale-125 transition-transform duration-200"
          >
            <InstagramIcon className="w-5 h-5 hover:text-[#1553a0] transition-colors" />
          </a>

          <a
            href={profile.linkedinUrl || 'https://linkedin.com/in/azhar-uiux'}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
            className="hover:scale-125 transition-transform duration-200"
          >
            <LinkedInIcon className="w-5 h-5 hover:text-[#1553a0] transition-colors" />
          </a>
        </div>

        {/* Bottom Actions for Azhar (Get in touch CTA & Edit Mode) */}
        <div className="w-full flex flex-col gap-2 pt-2 border-t border-black/5 z-10">
          <a
            href="#contact"
            className="w-full py-3 px-5 rounded-2xl bg-[#111111] hover:bg-[#252525] text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
          >
            <span className="!text-white">Let&apos;s Work Together</span>
            <ArrowUpRight size={14} className="text-[#60a5fa]" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="text-[11px] text-[#888888] hover:text-[#111111] font-medium text-center truncate transition-colors py-1 flex items-center justify-center gap-1.5 select-text cursor-text"
          >
            <Mail size={12} className="text-[#1d6de3]" />
            <span>{profile.email}</span>
          </a>

          {isEditMode && (
            <button
              type="button"
              onClick={onOpenEditModal}
              className="w-full mt-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1d6de3] text-white hover:bg-[#1553a0] transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles size={12} />
              <span>Edit Card Details</span>
            </button>
          )}
        </div>
      </motion.div>
    </aside>
  );
};
