'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MeshGradientGlowProps {
  isPlaying: boolean;
  isDark?: boolean;
}

/**
 * MeshGradientGlow:
 * A living mesh gradient contained strictly UNDER the navbar controls.
 * When playing, 7 colorful glowing orbs orbit in random circular/elliptical paths
 * while smoothly shifting colors, creating an animated fluid mesh gradient underlayer.
 * Contained strictly within the navbar pill — zero bleed outside.
 * Adapts seamlessly to Dark mode (screen blend) and Day mode (multiply/vibrant blend).
 */
export const MeshGradientGlow: React.FC<MeshGradientGlowProps> = ({ isPlaying, isDark = true }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isPlaying ? 1 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]"
    >
      {/* Ambient rotating multi-color mesh canvas */}
      <motion.div
        animate={
          isPlaying
            ? {
                rotate: [0, 360],
                scale: [1, 1.12, 0.96, 1.08, 1],
              }
            : {}
        }
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: 'linear' },
          scale: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
        }}
        className={`absolute -inset-10 rounded-full blur-[16px] transition-all duration-500 ${
          isDark ? 'opacity-85 mix-blend-screen' : 'opacity-65 mix-blend-multiply'
        }`}
        style={{
          background:
            'radial-gradient(circle at 15% 40%, rgba(66,133,244,0.95) 0%, transparent 60%), ' +
            'radial-gradient(circle at 85% 40%, rgba(234,67,53,0.95) 0%, transparent 60%), ' +
            'radial-gradient(circle at 50% 60%, rgba(251,188,4,1) 0%, transparent 65%), ' +
            'radial-gradient(circle at 10% 70%, rgba(52,168,83,0.95) 0%, transparent 60%), ' +
            'radial-gradient(circle at 90% 70%, rgba(168,85,247,1) 0%, transparent 60%)',
        }}
      />

      {/* 7 Orbiting glowing blobs circling in random paths under the navbar */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
        isDark ? 'mix-blend-screen' : 'mix-blend-multiply opacity-80'
      }`}>
        {/* Orb 1: Google Royal Blue — circling around left flank */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [0, 40, 60, 20, -35, -50, -20, 0],
                  y: [-10, -6, 8, 12, 8, -6, -10, -10],
                  scale: [1, 1.25, 0.9, 1.2, 0.88, 1.12, 1],
                  backgroundColor: [
                    'rgba(66, 133, 244, 0.95)',
                    'rgba(147, 51, 234, 0.95)',
                    'rgba(236, 72, 153, 0.95)',
                    'rgba(59, 130, 246, 0.95)',
                    'rgba(66, 133, 244, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 4.8, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 8.5, ease: 'linear' },
          }}
          className="absolute left-[10%] top-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 2: Google Red / Coral — circling counter-clockwise around right flank */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [0, -40, -55, -20, 35, 55, 20, 0],
                  y: [10, 6, -8, -12, -8, 6, 10, 10],
                  scale: [1.1, 0.88, 1.25, 0.9, 1.2, 0.94, 1.1],
                  backgroundColor: [
                    'rgba(234, 67, 53, 0.95)',
                    'rgba(251, 188, 4, 0.95)',
                    'rgba(249, 115, 22, 0.95)',
                    'rgba(239, 68, 68, 0.95)',
                    'rgba(234, 67, 53, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 5.4, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 5.4, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 5.4, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 8.0, ease: 'linear' },
          }}
          className="absolute left-[75%] top-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 3: Google Sun Yellow / Amber — looping figure-eight across center */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [-35, 25, 50, 15, -35, -55, -35],
                  y: [8, -10, 6, 12, -8, 6, 8],
                  scale: [0.92, 1.28, 0.9, 1.22, 0.95, 1.15, 0.92],
                  backgroundColor: [
                    'rgba(251, 188, 4, 0.95)',
                    'rgba(52, 168, 83, 0.95)',
                    'rgba(16, 185, 129, 0.95)',
                    'rgba(234, 179, 8, 0.95)',
                    'rgba(251, 188, 4, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 6.2, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 6.2, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 6.2, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 9.6, ease: 'linear' },
          }}
          className="absolute left-[45%] top-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 4: Google Green — circling along left-center */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [-45, -20, 35, 10, -40, -60, -45],
                  y: [6, -10, -8, 10, 12, -6, 6],
                  scale: [1.12, 0.9, 1.2, 0.92, 1.25, 0.9, 1.12],
                  backgroundColor: [
                    'rgba(52, 168, 83, 0.95)',
                    'rgba(6, 182, 212, 0.95)',
                    'rgba(59, 130, 246, 0.95)',
                    'rgba(34, 197, 94, 0.95)',
                    'rgba(52, 168, 83, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 6.8, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 6.8, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 6.8, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 9.0, ease: 'linear' },
          }}
          className="absolute left-[25%] top-1/2 -translate-y-1/2 w-26 h-26 sm:w-34 sm:h-34 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 5: Electric Purple — circling around cassette player on right */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [20, 50, 35, -15, 10, 55, 20],
                  y: [-10, 6, 10, -8, -12, -4, -10],
                  scale: [1, 1.2, 0.9, 1.25, 0.88, 1.15, 1],
                  backgroundColor: [
                    'rgba(168, 85, 247, 0.95)',
                    'rgba(236, 72, 153, 0.95)',
                    'rgba(139, 92, 246, 0.95)',
                    'rgba(217, 70, 239, 0.95)',
                    'rgba(168, 85, 247, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 4.4, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 4.4, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 4.4, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 7.6, ease: 'linear' },
          }}
          className="absolute left-[85%] top-1/2 -translate-y-1/2 w-28 h-28 sm:w-34 sm:h-34 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 6: Neon Cyan / Turquoise — circling along center-top */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [-20, 30, -10, -45, -25, 20, -20],
                  y: [8, -12, 10, -6, -12, 8, 8],
                  scale: [0.92, 1.18, 1.28, 0.92, 1.2, 0.96, 0.92],
                  backgroundColor: [
                    'rgba(6, 182, 212, 0.95)',
                    'rgba(59, 130, 246, 0.95)',
                    'rgba(20, 184, 166, 0.95)',
                    'rgba(14, 165, 233, 0.95)',
                    'rgba(6, 182, 212, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 5.2, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 5.2, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 5.2, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 8.8, ease: 'linear' },
          }}
          className="absolute left-[35%] top-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-[14px] sm:blur-[18px]"
        />

        {/* Orb 7: Hot Magenta / Fuchsia — looping in wide undulating orbit */}
        <motion.div
          animate={
            isPlaying
              ? {
                  x: [15, -35, 0, 40, -18, 35, 15],
                  y: [-12, -6, 12, -6, 10, -10, -12],
                  scale: [1.2, 0.92, 1.15, 0.88, 1.25, 0.9, 1.2],
                  backgroundColor: [
                    'rgba(236, 72, 153, 0.95)',
                    'rgba(244, 63, 94, 0.95)',
                    'rgba(168, 85, 247, 0.95)',
                    'rgba(251, 113, 133, 0.95)',
                    'rgba(236, 72, 153, 0.95)',
                  ],
                }
              : {}
          }
          transition={{
            x: { repeat: Infinity, duration: 5.8, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 5.8, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 5.8, ease: 'easeInOut' },
            backgroundColor: { repeat: Infinity, duration: 8.2, ease: 'linear' },
          }}
          className="absolute left-[60%] top-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-[14px] sm:blur-[18px]"
        />
      </div>
    </motion.div>
  );
};
