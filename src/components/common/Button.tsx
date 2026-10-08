'use client';

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  href?: string;
  external?: boolean;
}

export const Button = ({
  variant = 'lime',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  href,
  external = false,
  ...props
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-full gap-1.5',
    md: 'px-6 py-3 text-sm font-semibold rounded-full gap-2',
    lg: 'px-8 py-4 text-base font-bold rounded-full gap-2.5',
  }[size];

  const variantClasses = {
    lime: 'bg-[#1d6de3] text-white hover:bg-[#2563eb] shadow-[0_0_20px_rgba(29,109,227,0.35)] hover:shadow-[0_0_30px_rgba(29,109,227,0.55)] border border-[#3b82f6]/40',
    primary: 'bg-white text-black hover:bg-neutral-200 border border-white',
    secondary: 'bg-[#1c1b18] text-white hover:bg-[#252320] border border-white/10 hover:border-white/20',
    outline: 'bg-transparent text-white border border-white/20 hover:border-[#1d6de3] hover:text-[#60a5fa]',
    ghost: 'bg-transparent text-neutral-400 hover:text-white hover:bg-white/5',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`group inline-flex items-center justify-center font-sans transition-all duration-300 active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={`group inline-flex items-center justify-center font-sans transition-all duration-300 active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};
