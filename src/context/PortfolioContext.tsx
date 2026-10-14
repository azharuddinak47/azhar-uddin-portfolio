'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { initialPortfolioData } from '@/config/portfolio.config';

interface PortfolioContextType {
  data: PortfolioData;
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  updateField: <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => void;
  resetToDefault: () => void;
  exportConfigJson: () => void;
  hasCustomChanges: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

const STORAGE_KEY = 'azhar_portfolio_custom_data_v4';
const THEME_KEY = 'azhar_portfolio_theme';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(false);
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const applyTheme = (t: 'dark' | 'light') => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  };

  // Load saved customization and theme from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as 'dark' | 'light' | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        applyTheme('dark');
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with initialPortfolioData to ensure all new fields exist
        setData({
          ...initialPortfolioData,
          ...parsed,
          profile: {
            ...initialPortfolioData.profile,
            ...(parsed.profile || {}),
            name: parsed.profile?.name?.trim() ? parsed.profile.name : initialPortfolioData.profile.name,
            dribbbleUrl: parsed.profile?.dribbbleUrl && parsed.profile.dribbbleUrl !== 'https://dribbble.com' ? parsed.profile.dribbbleUrl : initialPortfolioData.profile.dribbbleUrl,
            facebookUrl: parsed.profile?.facebookUrl && parsed.profile.facebookUrl !== 'https://facebook.com' ? parsed.profile.facebookUrl : initialPortfolioData.profile.facebookUrl,
            instagramUrl: parsed.profile?.instagramUrl && parsed.profile.instagramUrl !== 'https://instagram.com' ? parsed.profile.instagramUrl : initialPortfolioData.profile.instagramUrl,
          },
          contact: {
            ...initialPortfolioData.contact,
            ...(parsed.contact || {}),
          },
          stats: parsed.stats && parsed.stats.length > 0 ? parsed.stats : initialPortfolioData.stats,
          projects: (parsed.projects && parsed.projects.length > 0 ? parsed.projects : initialPortfolioData.projects).map(
            (proj: import('@/types/portfolio').ProjectItem) => {
              const initial = initialPortfolioData.projects.find(p => p.id === proj.id);
              if (proj.id === 'proj-2') {
                return {
                  ...proj,
                  title: initial?.title || proj.title,
                  image: initial?.image || proj.image,
                  link: initial?.link || proj.link,
                  figmaLink: initial?.figmaLink || proj.figmaLink,
                };
              }
              return proj;
            }
          ),
          experiences: (parsed.experiences && parsed.experiences.length > 0 ? parsed.experiences : initialPortfolioData.experiences).map(
            (exp: import('@/types/portfolio').ExperienceItem, i: number) => ({
              ...(initialPortfolioData.experiences[i] || {}),
              ...exp,
              logo: exp.logo || initialPortfolioData.experiences[i]?.logo,
            })
          ),
          tools: parsed.tools && parsed.tools.length > 0 ? parsed.tools : initialPortfolioData.tools,
          certifications: parsed.certifications && parsed.certifications.length > 0 ? parsed.certifications : initialPortfolioData.certifications,
          academics: parsed.academics && parsed.academics.length > 0 ? parsed.academics : initialPortfolioData.academics,
          thoughts: parsed.thoughts && parsed.thoughts.length > 0 ? parsed.thoughts : initialPortfolioData.thoughts,
          socials: parsed.socials && parsed.socials.length > 0 ? parsed.socials : initialPortfolioData.socials,
        });
        setHasCustomChanges(true);
      }
    } catch (e) {
      console.warn('Could not read saved portfolio data:', e);
    }
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      applyTheme(next);
      return next;
    });
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {}
    applyTheme(newTheme);
  };

  // Listen for keyboard shortcuts "Ctrl + E" (edit mode) and "Alt + T" (theme toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditMode(prev => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setHasCustomChanges(true);

        // Also attempt local disk persistence via save-config API
        fetch('/api/save-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        }).catch(() => {
          // Fallback gracefully on static deployments
        });
      } catch (e) {
        console.error('Failed saving data', e);
      }
      return next;
    });
  };

  const updateField = <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => {
    updateData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setData(initialPortfolioData);
    setHasCustomChanges(false);
  };

  const exportConfigJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'portfolio-data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditMode,
        toggleEditMode,
        setEditMode: setIsEditMode,
        updateData,
        updateField,
        resetToDefault,
        exportConfigJson,
        hasCustomChanges,
        theme,
        toggleTheme,
        setTheme
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
