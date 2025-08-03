import React from 'react'
import { cn } from '../../lib/utils'
import { cardVariants, interactiveHover } from '../../lib/design-system'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'glass-sm'
  interactive?: boolean
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  interactive = false
}) => {
  const baseClasses = variant === 'default' ? 'bg-white border border-gray-200' : ''
  const interactiveClasses = interactive ? interactiveHover : ''

  return (
    <div
      className={cn(
        baseClasses,
        cardVariants[variant],
        interactiveClasses,
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  )
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className
}) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  )
}