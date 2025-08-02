import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/80 rounded-2xl border border-white/20 shadow-xl',
        hover && 'hover:shadow-2xl hover:bg-white/90 transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};