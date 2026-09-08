import React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex">
        <Sidebar isCollapsed={false} onToggle={onClose} />
        <button 
          onClick={onClose}
          className="absolute top-4 -right-12 p-2 bg-navy-800 rounded-full text-slate-400 hover:text-slate-100"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};
