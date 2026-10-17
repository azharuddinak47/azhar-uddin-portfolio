'use client';

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1400,
  delay = 0,
  className = '',
}) => {
  // Parse prefix (e.g. "+"), numeric value, suffix (e.g. "+", "%", "k"), and decimal points
  const parsed = React.useMemo(() => {
    if (!value) {
      return { prefix: '', target: 0, suffix: '', decimals: 0, isValid: false };
    }
    const match = value.toString().match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
    if (!match) {
      return { prefix: '', target: 0, suffix: '', decimals: 0, isValid: false };
    }
    const prefix = match[1] || '';
    const cleanNumStr = match[2].replace(/,/g, '');
    const target = parseFloat(cleanNumStr);
    const suffix = match[3] || '';
    const decimals = cleanNumStr.includes('.') ? cleanNumStr.split('.')[1].length : 0;
    return { prefix, target: isNaN(target) ? 0 : target, suffix, decimals, isValid: !isNaN(target) };
  }, [value]);

  const [displayCount, setDisplayCount] = useState<number>(() => {
    if (!parsed.isValid) return 0;
    return parsed.target > 1 ? 1 : 0;
  });
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!parsed.isValid) return;

    const startValue = parsed.target > 1 ? 1 : 0;
    let timeoutId: NodeJS.Timeout;

    const startAnimation = () => {
      setHasCompleted(false);
      setDisplayCount(startValue);
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out for energetic speed at start, decelerating smoothly to target
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = startValue + easeOut * (parsed.target - startValue);

        setDisplayCount(current);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayCount(parsed.target);
          setHasCompleted(true);
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [parsed, duration, delay]);

  if (!parsed.isValid) {
    return <span className={className}>{value}</span>;
  }

  // Once the animation finishes, render the exact original string to preserve any custom styling/punctuation
  if (hasCompleted) {
    return <span className={className}>{value}</span>;
  }

  const formattedNum = parsed.decimals > 0
    ? displayCount.toFixed(parsed.decimals)
    : Math.floor(displayCount).toString();

  return (
    <span className={className} suppressHydrationWarning>
      {parsed.prefix}{formattedNum}{parsed.suffix}
    </span>
  );
};
