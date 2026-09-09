import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

interface AppState {
  theme: ThemeMode;
  isDemoMode: boolean;
  isPresentationMode: boolean;
  lastSyncTime: string;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleDemoMode: () => void;
  togglePresentationMode: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ocean_sentinel_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const lastSyncTime = '2026-09-05T00:31:00+05:30';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      localStorage.setItem('ocean_sentinel_theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleDemoMode = () => setIsDemoMode((prev) => !prev);
  const togglePresentationMode = () => setIsPresentationMode((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        theme,
        isDemoMode,
        isPresentationMode,
        lastSyncTime,
        toggleTheme,
        setTheme,
        toggleDemoMode,
        togglePresentationMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
