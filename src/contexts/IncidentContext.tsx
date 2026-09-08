import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IncidentState {
  selectedIncidentId: string | null;
  setSelectedIncidentId: (id: string | null) => void;
}

const IncidentContext = createContext<IncidentState | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  return (
    <IncidentContext.Provider value={{ selectedIncidentId, setSelectedIncidentId }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidentContext = () => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidentContext must be used within an IncidentProvider');
  }
  return context;
};
