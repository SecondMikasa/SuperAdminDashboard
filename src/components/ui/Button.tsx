import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-gradient-to-r from-[#007AFF] to-[#6366F1] text-white hover:from-[#0056CC] hover:to-[#4F46E5] focus:ring-[#007AFF] shadow-lg': variant === 'primary',
          'backdrop-blur-xl bg-white/80 text-gray-700 border border-gray-300 hover:bg-white/90 focus:ring-gray-500 shadow-lg': variant === 'secondary',
          'bg-[#EF4444] text-white hover:bg-[#DC2626] focus:ring-[#EF4444] shadow-lg': variant === 'danger',
          'border border-gray-300 text-gray-700 bg-transparent hover:backdrop-blur-xl hover:bg-white/50 focus:ring-gray-500': variant === 'outline',
          'text-gray-600 bg-transparent hover:backdrop-blur-xl hover:bg-white/30 focus:ring-gray-500': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};