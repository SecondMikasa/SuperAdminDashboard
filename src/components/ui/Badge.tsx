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
          'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20': variant === 'active',
          'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20': variant === 'inactive',
          'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20': variant === 'pending',
        },
        className
      )}
    >
      <div
        className={cn('w-2 h-2 rounded-full mr-1.5', {
          'bg-[#10B981]': variant === 'active',
          'bg-[#EF4444]': variant === 'inactive',
          'bg-[#F59E0B]': variant === 'pending',
        })}
      />
      {children}
    </span>
  );
};