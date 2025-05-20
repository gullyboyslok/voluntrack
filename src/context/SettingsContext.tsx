import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarAlwaysOpen: boolean;
  toggleSidebarMode: () => void;
  buttonEffects: boolean;
  toggleButtonEffects: () => void;
  experimental: boolean;
  toggleExperimental: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [sidebarAlwaysOpen, setSidebarAlwaysOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarAlwaysOpen');
    return saved ? JSON.parse(saved) : true;
  });

  const [buttonEffects, setButtonEffects] = useState(() => {
    const saved = localStorage.getItem('buttonEffects');
    return saved ? JSON.parse(saved) : true;
  });

  const [experimental, setExperimental] = useState(() => {
    const saved = localStorage.getItem('experimental');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarAlwaysOpen', JSON.stringify(sidebarAlwaysOpen));
  }, [sidebarAlwaysOpen]);

  useEffect(() => {
    localStorage.setItem('buttonEffects', JSON.stringify(buttonEffects));
  }, [buttonEffects]);

  useEffect(() => {
    localStorage.setItem('experimental', JSON.stringify(experimental));
  }, [experimental]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebarMode = () => setSidebarAlwaysOpen(!sidebarAlwaysOpen);
  const toggleButtonEffects = () => setButtonEffects(!buttonEffects);
  const toggleExperimental = () => setExperimental(!experimental);

  return (
    <SettingsContext.Provider value={{
      darkMode,
      toggleDarkMode,
      sidebarAlwaysOpen,
      toggleSidebarMode,
      buttonEffects,
      toggleButtonEffects,
      experimental,
      toggleExperimental
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}