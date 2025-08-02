import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant: 'active' | 'inactive' | 'pending';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-green-100 text-green-800': variant === 'active',
          'bg-red-100 text-red-800': variant === 'inactive',
          'bg-yellow-100 text-yellow-800': variant === 'pending',
        },
        className
      )}
    >
      <div
        className={cn('w-2 h-2 rounded-full mr-1.5', {
          'bg-green-400': variant === 'active',
          'bg-red-400': variant === 'inactive',
          'bg-yellow-400': variant === 'pending',
        })}
      />
      {children}
    </span>
  );
};