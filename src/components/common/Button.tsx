import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 ease-out focus:outline-none focus:ring-1 focus:ring-sky-500 active:translate-y-[0.5px] select-none';
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-sky-600 hover:bg-sky-500 text-white font-semibold border border-sky-500/50 shadow-sm',
    secondary: 'bg-[#131b2e] hover:bg-[#1a253e] text-slate-200 border border-[#1e293b]',
    outline: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-[#1e293b]',
    danger: 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/40',
  };

  const disabledClasses = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
