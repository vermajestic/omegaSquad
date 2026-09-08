import React from 'react';
import { Outlet } from 'react-router-dom';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans">
      <Outlet />
    </div>
  );
};
