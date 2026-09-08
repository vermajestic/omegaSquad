import React, { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
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
  const baseClasses = 'inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-950 font-medium';
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const variantClasses = {
    primary: 'bg-cyan-500 text-navy-950 hover:bg-cyan-400 focus:ring-cyan-500',
    secondary: 'bg-navy-700 text-slate-100 hover:bg-navy-600 focus:ring-navy-700',
    danger: 'bg-red-500 text-white hover:bg-red-400 focus:ring-red-500',
    ghost: 'bg-transparent text-slate-300 hover:text-slate-100 hover:bg-navy-800 focus:ring-navy-700',
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
