'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

// Synthesize a tactile mechanical lamp pull-cord click via Web Audio API
const playPullCordClick = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // 1. Sharp mechanical click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);

    // 2. Subtle spring release ring
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1200, ctx.currentTime + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.07);
    gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.02);
    osc2.stop(ctx.currentTime + 0.07);
  } catch {
    // Graceful fallback if audio context blocked by browser policy
  }
};

export const PullRopeSwitch = () => {
  const { theme, toggleTheme } = usePortfolio();
  const isDark = theme === 'dark';

  const [isHovered, setIsHovered] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [flashGlow, setFlashGlow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion value for vertical pull offset
  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 450, damping: 18 });

  // Base rope dimensions
  const baseRopeLength = isMobile ? 55 : 120; // resting length in pixels
  const ropeHeight = useTransform(springY, (val) => baseRopeLength + val);

  // Trigger switch on click
  const handleClick = () => {
    setIsPulling(true);
    playPullCordClick();
    
    // Quick elastic pull down animation
    dragY.set(50);
    setTimeout(() => {
      dragY.set(0);
      toggleTheme();
      triggerFlash();
      setIsPulling(false);
    }, 140);
  };

  // Trigger flash on toggle
  const triggerFlash = () => {
    setFlashGlow(true);
    setTimeout(() => setFlashGlow(false), 400);
  };

  // Drag handlers
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    setIsPulling(false);
    if (info.offset.y > 28 || info.velocity.y > 250) {
      playPullCordClick();
      toggleTheme();
      triggerFlash();
    }
    dragY.set(0);
  };

  return (
    <div
      className="fixed top-0 z-50 pointer-events-auto select-none"
      style={{ left: isMobile ? '1rem' : 'max(1.5rem, calc(50% - 615px))' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle momentary illumination flare on switch */}
      <AnimatePresence>
        {flashGlow && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0.8 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`absolute -top-10 -left-16 w-40 h-40 rounded-full blur-2xl pointer-events-none ${
              isDark ? 'bg-amber-300/40' : 'bg-blue-400/35'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Ceiling Mount Bracket */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-2 rounded-b-md bg-[#23211e] dark:bg-[#23211e] [data-theme=light]:bg-[#cfcac2] border border-white/20 [data-theme=light]:border-black/15 shadow-sm" />
        <div className="w-1.5 h-1.5 rounded-full -mt-0.5 bg-[#3a3733] dark:bg-[#3a3733] [data-theme=light]:bg-[#9c9589]" />
      </div>

      {/* Hanging Stretchy Pendulum Assembly */}
      <motion.div
        animate={
          isPulling
            ? { rotate: 0 }
            : isHovered
            ? { rotate: [-1.2, 1.2, -1.2] }
            : { rotate: [-3.8, 3.8, -3.8] }
        }
        transition={
          isPulling
            ? { duration: 0.2 }
            : isHovered
            ? { repeat: Infinity, duration: 4.0, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 5.2, ease: 'easeInOut' }
        }
        style={{ transformOrigin: 'top center' }}
        className="flex flex-col items-center relative cursor-grab active:cursor-grabbing"
      >
        {/* Dynamic Stretchy Rope SVG */}
        <svg
          width="24"
          height="220"
          className="overflow-visible pointer-events-none"
          style={{ width: 24, height: 220 }}
        >
          {/* Main braided pull cord */}
          <motion.line
            x1="12"
            y1="0"
            x2="12"
            y2={ropeHeight}
            stroke={isDark ? '#8a857e' : '#6b665f'}
            strokeWidth="2.2"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />

          {/* Core highlight thread for realism */}
          <motion.line
            x1="11.5"
            y1="0"
            x2="11.5"
            y2={ropeHeight}
            stroke={isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.15)'}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>

        {/* Draggable Pull Handle / Bobble at end of cord */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 70 }}
          dragElastic={0.18}
          dragMomentum={false}
          onDragStart={() => setIsPulling(true)}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group/handle"
          style={{
            top: baseRopeLength,
            y: springY,
          }}
        >
          {/* Metallic Connector Bead */}
          <div
            className={`w-2.5 h-2 rounded-sm border shadow-xs ${
              isDark
                ? 'bg-gradient-to-b from-[#524d46] to-[#2e2a25] border-white/20'
                : 'bg-gradient-to-b from-[#ffffff] to-[#cfcac2] border-black/20'
            }`}
          />

          {/* Main Ergonomic Pull Handle */}
          <div
            className={`relative w-7 h-11 rounded-full flex flex-col items-center justify-between py-1.5 px-1 transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-gradient-to-b from-[#2e2c28] via-[#201e1b] to-[#151413] border border-amber-400/50 shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_14px_rgba(251,191,36,0.4)] group-hover/handle:shadow-[0_8px_25px_rgba(251,191,36,0.6)] group-hover/handle:border-amber-400'
                : 'bg-gradient-to-b from-[#ffffff] via-[#f7f5f0] to-[#e4e0d7] border border-blue-500/50 shadow-[0_6px_20px_rgba(0,0,0,0.15),0_0_14px_rgba(29,109,227,0.35)] group-hover/handle:shadow-[0_8px_25px_rgba(29,109,227,0.5)] group-hover/handle:border-blue-500'
            }`}
          >
            {/* Grip grooves */}
            <div className="flex flex-col gap-0.5 w-full items-center">
              <span
                className={`w-4 h-[1.5px] rounded-full ${
                  isDark ? 'bg-white/25' : 'bg-black/20'
                }`}
              />
              <span
                className={`w-3.5 h-[1.5px] rounded-full ${
                  isDark ? 'bg-white/20' : 'bg-black/15'
                }`}
              />
            </div>

            {/* Glowing Indicator Icon: Sun in dark mode, Moon in day mode */}
            <motion.div
              animate={
                isPulling
                  ? { rotate: 180, scale: 0.9 }
                  : { rotate: 0, scale: [1, 1.08, 1] }
              }
              transition={
                isPulling
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
              }
              className="flex items-center justify-center my-auto"
            >
              {isDark ? (
                <Sun
                  size={16}
                  strokeWidth={2.4}
                  className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)]"
                />
              ) : (
                <Moon
                  size={16}
                  strokeWidth={2.4}
                  className="text-blue-600 drop-shadow-[0_0_8px_rgba(29,109,227,0.8)]"
                />
              )}
            </motion.div>

            {/* Bottom Accent Ring */}
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
                  : 'bg-blue-600 shadow-[0_0_10px_#1d6de3]'
              }`}
            />
          </div>

          {/* Floating Helpful Tooltip on Hover */}
          <AnimatePresence>
            {isHovered && !isPulling && (
              <motion.div
                initial={{ opacity: 0, x: -6, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -6, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={`absolute left-full ml-3 top-2 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase whitespace-nowrap shadow-xl pointer-events-none z-50 border backdrop-blur-md ${
                  isDark
                    ? 'bg-[#242220]/95 text-white border-white/15'
                    : 'bg-white/95 text-[#151413] border-black/15'
                }`}
              >
                {isDark ? 'Pull for Day Mode' : 'Pull for Night Mode'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};
