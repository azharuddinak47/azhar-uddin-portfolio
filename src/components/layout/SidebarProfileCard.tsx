'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

// Wireframe Outline Vector Icons matching exact reference screenshot (in vibrant brand orange)
const DribbbleOutlineIcon = ({ className = 'w-[22px] h-[22px]' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
  </svg>
);

const TwitterOutlineIcon = ({ className = 'w-[22px] h-[22px]' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramOutlineIcon = ({ className = 'w-[22px] h-[22px]' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
  </svg>
);

const YoutubeOutlineIcon = ({ className = 'w-[22px] h-[22px]' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const SidebarProfileCard = ({ className = '', onOpenEditModal }: { className?: string; onOpenEditModal?: () => void } = {}) => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';
  const { profile } = data;

  const cardDescription = profile.subHeadline || 'A Product Designer who has developed countless innovative solutions.';

  return (
    <aside className={`w-full lg:w-[350px] shrink-0 static lg:sticky lg:top-40 lg:self-start z-40 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-[28px] sm:rounded-[32px] bg-white text-[#111111] p-5 sm:p-6 pb-7 sm:pb-8 flex flex-col items-center relative overflow-hidden group border border-black/[0.04] transition-all duration-300 ${
          isDark
            ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]'
            : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04),0_1px_4px_rgba(0,0,0,0.02)]'
        }`}
      >
        {/* Top-Left Decorative Dashed Arc in matching Orange */}
        <div className="absolute -top-3 -left-3 w-40 h-24 pointer-events-none z-0 opacity-70">
          <svg viewBox="0 0 194 100" className="w-full h-full" fill="#f25c05">
            <path d="M 0 34.544 L 3.22 33.201 C 4.186 35.732 5.256 38.221 6.429 40.663 L 3.329 42.293 C 2.113 39.757 1.002 37.172 0 34.544 Z M 7.294 49.71 L 10.246 47.806 C 11.613 50.127 13.073 52.392 14.622 54.596 L 11.828 56.748 C 10.223 54.464 8.711 52.116 7.294 49.71 Z M 16.894 63.37 L 19.509 60.989 C 21.22 63.047 23.012 65.037 24.881 66.953 L 22.454 69.543 C 20.522 67.557 18.667 65.498 16.894 63.369 Z M 28.47 75.232 L 30.69 72.449 C 32.693 74.197 34.764 75.864 36.9 77.447 L 34.895 80.41 C 32.688 78.767 30.544 77.04 28.47 75.232 Z M 41.7 85.029 L 43.471 81.912 C 45.712 83.304 48.011 84.603 50.36 85.804 L 48.836 89.061 C 46.403 87.816 44.022 86.471 41.7 85.029 Z M 56.27 92.473 L 57.53 89.093 C 59.958 90.083 62.428 90.966 64.934 91.737 L 63.955 95.216 C 61.354 94.415 58.79 93.5 56.27 92.473 Z M 71.836 97.256 L 72.519 93.701 C 73.429 93.891 74.342 94.067 75.251 94.225 C 76.906 94.514 78.569 94.754 80.238 94.947 L 79.861 98.552 C 77.167 98.245 74.489 97.813 71.836 97.256 Z M 87.974 99.1 L 88.046 95.474 C 90.656 95.532 93.266 95.474 95.871 95.301 L 96.088 98.921 C 93.387 99.099 90.68 99.159 87.974 99.101 Z M 103.652 94.44 C 106.238 94.042 108.805 93.535 111.348 92.92 L 112.127 96.454 C 109.493 97.088 106.834 97.613 104.157 98.027 L 103.652 94.439 Z M 118.899 90.762 C 121.391 89.934 123.848 89.006 126.265 87.979 L 127.572 91.337 C 125.07 92.402 122.526 93.364 119.946 94.22 Z M 133.4 84.59 C 135.738 83.362 138.023 82.036 140.251 80.618 L 142.053 83.717 C 139.745 85.184 137.379 86.556 134.959 87.829 L 133.4 84.589 Z M 146.773 76.083 C 148.89 74.477 150.937 72.782 152.91 71.002 L 155.175 73.749 C 153.128 75.594 151.004 77.351 148.808 79.016 Z M 158.611 65.4 C 160.436 63.446 162.174 61.412 163.821 59.306 L 166.505 61.601 C 164.795 63.791 162.988 65.904 161.092 67.935 Z M 168.516 52.75 C 170.003 50.493 171.409 48.184 172.731 45.826 L 175.721 47.665 C 174.354 50.096 172.904 52.479 171.372 54.81 Z M 176.507 38.612 C 177.694 36.166 178.817 33.682 179.881 31.164 L 183.049 32.633 C 181.963 35.204 180.81 37.745 179.592 40.256 Z M 182.922 23.537 C 183.887 20.966 184.809 18.379 185.688 15.777 L 188.956 16.991 C 188.056 19.634 187.126 22.262 186.148 24.862 Z M 188.238 7.924 C 189.062 5.288 189.858 2.645 190.641 -0.001 L 193.953 1.073 C 193.168 3.738 192.361 6.396 191.533 9.048 Z" />
          </svg>
        </div>

        {/* Top: Portrait Image in Styled Rounded Frame */}
        <div className="relative w-full max-w-[210px] aspect-[4/4.7] rounded-[22px] overflow-hidden bg-[#181716] shadow-sm mb-4 z-10 group/img">
          <img
            src={profile.avatarUrl || '/assets/avatar.jpg'}
            alt={profile.name}
            className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-all duration-500"
          />
        </div>

        {/* Name matching reference screenshot */}
        <h2
          style={{ color: '#111111' }}
          className="text-2xl sm:text-[26px] font-black !text-[#111111] tracking-tight font-[family-name:var(--font-poppins)] text-center mb-0.5 z-10 select-text cursor-text"
        >
          {profile.name?.trim() || 'Md Azhar Uddin'}
        </h2>

        {/* Dashed Orange Arc & Orange Flame Badge */}
        <div className="relative z-10 flex items-center justify-center w-full h-12 mt-1 mb-2">
          {/* Dashed orange arc running from the card's left edge to the flame badge */}
          <svg
            className="absolute -left-5 sm:-left-6 top-0 w-[150px] h-12 pointer-events-none overflow-visible"
            viewBox="0 0 150 48"
            fill="none"
          >
            <path
              d="M 0 38 C 35 38 75 28 112 14"
              fill="none"
              stroke="#f25c05"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
          </svg>

          {/* Flame Badge */}
          <div className="absolute left-[37%] -translate-x-1/2 top-0 w-9 h-9 rounded-full bg-[#f25c05] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(242,92,5,0.4)] transition-transform duration-300 hover:scale-110 pointer-events-auto cursor-pointer">
            <Flame size={18} className="fill-white text-white" />
          </div>
        </div>

        {/* Subtitle / Bio matching exact screenshot format */}
        <p
          style={{ color: '#555555' }}
          className="text-sm sm:text-[15px] font-normal !text-[#555555] text-center leading-[1.42] max-w-[270px] mt-1 mb-6 z-10 font-[family-name:var(--font-poppins)] select-text cursor-text"
        >
          {cardDescription}
        </p>

        {/* 4 Social Media Icons matching screenshot (Dribbble, Twitter, Instagram, YouTube) */}
        <div className="flex items-center justify-center gap-7 sm:gap-8 z-10 text-[#f25c05] pb-1">
          <a
            href={profile.dribbbleUrl || 'https://dribbble.com/azharuddin-uiux'}
            target="_blank"
            rel="noopener noreferrer"
            title="Dribbble"
            aria-label="Dribbble"
            className="hover:scale-115 transition-all duration-200 hover:text-[#d44800]"
          >
            <DribbbleOutlineIcon className="w-[22px] h-[22px]" />
          </a>

          <a
            href={profile.twitterUrl || 'https://x.com'}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            aria-label="Twitter"
            className="hover:scale-115 transition-all duration-200 hover:text-[#d44800]"
          >
            <TwitterOutlineIcon className="w-[22px] h-[22px]" />
          </a>

          <a
            href={profile.instagramUrl || 'https://www.instagram.com/azharuddinak47/'}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            aria-label="Instagram"
            className="hover:scale-115 transition-all duration-200 hover:text-[#d44800]"
          >
            <InstagramOutlineIcon className="w-[22px] h-[22px]" />
          </a>

          <a
            href={profile.youtubeUrl || 'https://youtube.com'}
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            aria-label="YouTube"
            className="hover:scale-115 transition-all duration-200 hover:text-[#d44800]"
          >
            <YoutubeOutlineIcon className="w-[22px] h-[22px]" />
          </a>
        </div>
      </motion.div>
    </aside>
  );
};
