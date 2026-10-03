'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useGsapReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return elementRef;
};

export const useGsapStagger = <T extends HTMLElement = HTMLDivElement>(selector: string, delay: number = 0.1) => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(selector);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 25,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: delay,
            ease: 'power2.out',
            clearProps: 'all'
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [selector, delay]);

  return containerRef;
};
