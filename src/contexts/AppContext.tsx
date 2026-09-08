import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  isDemoMode: boolean;
  isPresentationMode: boolean;
  lastSyncTime: string;
  toggleDemoMode: () => void;
  togglePresentationMode: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const lastSyncTime = '2026-09-05T00:31:00+05:30';

  const toggleDemoMode = () => setIsDemoMode((prev) => !prev);
  const togglePresentationMode = () => setIsPresentationMode((prev) => !prev);

  return (
    <AppContext.Provider value={{ isDemoMode, isPresentationMode, lastSyncTime, toggleDemoMode, togglePresentationMode }}>
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
