'use client';

import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

export const Marquee = ({
  items,
  speed = 30,
  reverse = false,
  className = '',
}: MarqueeProps) => {
  // Duplicate array multiple times to ensure seamless infinite loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden w-full py-4 border-y border-white/5 bg-[#161513]/60 backdrop-blur-sm select-text ${className}`}>
      {/* Gradient edge masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#131211] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#131211] to-transparent z-10 pointer-events-none" />

      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-4 whitespace-nowrap"
          >
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-[#faf7f3] uppercase font-[family-name:var(--font-poppins)] opacity-85 hover:opacity-100 hover:text-[#60a5fa] transition-colors">
              {item}
            </span>
            <span className="text-[#1d6de3] text-xs opacity-80">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
