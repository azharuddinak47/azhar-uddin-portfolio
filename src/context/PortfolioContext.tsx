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
}

const STORAGE_KEY = 'azhar_portfolio_custom_data_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load saved customization from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setHasCustomChanges(true);
      }
    } catch (e) {
      console.warn('Could not read saved portfolio data:', e);
    }
  }, []);

  // Listen for keyboard shortcut "Ctrl + E" or "Shift + E" to toggle edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditMode(prev => !prev);
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
        hasCustomChanges
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
