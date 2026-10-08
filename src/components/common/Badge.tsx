'use client';

import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'lime' | 'orange' | 'default' | 'subtle';
  pulsing?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Badge = ({
  children,
  variant = 'default',
  pulsing = false,
  className = '',
  onClick,
}: BadgeProps) => {
  const variantStyles = {
    lime: 'bg-[#1d6de3]/15 text-[#60a5fa] border-[#1d6de3]/30',
    orange: 'bg-[#f46c38]/10 text-[#f46c38] border-[#f46c38]/30',
    default: 'bg-[#1c1b18] text-[#998f8f] border-white/10 hover:border-white/20',
    subtle: 'bg-white/5 text-neutral-300 border-white/5',
  }[variant];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase border backdrop-blur-md transition-colors ${variantStyles} ${className} ${onClick ? 'cursor-pointer hover:bg-white/10' : ''}`}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d6de3] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1d6de3]"></span>
        </span>
      )}
      {children}
    </span>
  );
};
