'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

// ---------------------------------------------------------------------------
// VinylTurntable: Animated vinyl record + tonearm ("hook")
// - When playing: Vinyl record spins 360°, tonearm rests stationary on grooves
// - When paused: Vinyl stops, tonearm swings away off the record
// ---------------------------------------------------------------------------
interface VinylTurntableProps {
  isPlaying: boolean;
}

const VinylTurntable: React.FC<VinylTurntableProps> = ({ isPlaying }) => {
  return (
    <div className="relative w-[46px] h-[36px] sm:w-[52px] sm:h-[40px] flex items-center select-none group/turntable">
      {/* Vinyl Record: spins continuously 360° when playing, stops when paused */}
      <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] shrink-0">
        <motion.img
          src="/assets/vinyl_record.png"
          alt="Vinyl Record"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { repeat: Infinity, duration: 3.2, ease: 'linear' }
              : { duration: 0.6, ease: 'easeOut' }
          }
          className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Tonearm ("Hook"): pivots onto the vinyl when playing, stays still while record spins, removes when paused */}
      <motion.div
        className="absolute right-0.5 -top-0.5 w-[20px] h-[28px] sm:w-[23px] sm:h-[32px] pointer-events-none z-10"
        style={{ transformOrigin: '76.7% 15.8%' }}
        animate={{
          rotate: isPlaying ? 5 : -32,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <img
          src="/assets/vinyl_tonearm.png"
          alt="Turntable Tonearm"
          className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// CassettePlayer: Vinyl player with play/pause audio control
// ---------------------------------------------------------------------------
interface CassettePlayerProps {
  onPlayingChange?: (playing: boolean) => void;
}

export const CassettePlayer = ({ onPlayingChange }: CassettePlayerProps) => {
  const { theme } = usePortfolio();
  const isDark = theme === 'dark';
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // "Take Me Home, Country Roads" — John Denver
  const YT_ID = '1vrEljMfXYo';

  const sendYTCommand = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*'
    );
  }, []);

  const setPlay = useCallback((next: boolean) => {
    setIsPlaying(next);
    onPlayingChange?.(next);
  }, [onPlayingChange]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      sendYTCommand('pauseVideo');
      setPlay(false);
    } else {
      sendYTCommand('playVideo');
      setPlay(true);
    }
  }, [isPlaying, sendYTCommand, setPlay]);

  // Notify initial state on mount
  useEffect(() => {
    onPlayingChange?.(false);
  }, [onPlayingChange]);

  // Tooltip delay
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (isHovered) {
      t = setTimeout(() => setShowTooltip(true), 350);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(t);
  }, [isHovered]);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Divider */}
      <span className={`w-px h-5 mr-3 sm:mr-4 flex-shrink-0 transition-colors ${isDark ? 'bg-white/15' : 'bg-black/15'}`} />

      {/* Hidden YouTube iframe (autoplay off by default) */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${YT_ID}?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=${YT_ID}`}
        allow="autoplay"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          left: '-9999px',
        }}
        title="Country Roads Audio"
      />

      {/* Button */}
      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        aria-label={isPlaying ? 'Pause Country Roads' : 'Play Country Roads'}
        className="relative flex items-center gap-1 sm:gap-1.5 focus:outline-none cursor-pointer group"
      >
        {/* Animated Vinyl Turntable (Record spins, Tonearm hooks on play / lifts on pause) */}
        <VinylTurntable isPlaying={isPlaying} />

        {/* Play / Pause icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-colors duration-200"
          style={{ fill: isPlaying ? '#e0534c' : (isDark ? '#888' : '#333') }}
        >
          {isPlaying ? (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </motion.button>

      {/* Floating Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide uppercase shadow-lg pointer-events-none whitespace-nowrap z-50 ${
              isDark
                ? 'bg-[#242220] border-white/15 text-white'
                : 'bg-white border-neutral-200/90 text-neutral-900 shadow-md'
            }`}
          >
            {isPlaying ? '♪ Country Roads' : 'Play Country Roads'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
