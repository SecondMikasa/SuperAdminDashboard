// Design System Utility Functions
import { cn } from './utils'

// Glass morphism utility
export const glassMorphism = (className?: string) => 
  cn('backdrop-blur-xl bg-white/80 border border-white/20 shadow-glass', className)

export const glassMorphismDark = (className?: string) => 
  cn('backdrop-blur-xl bg-gray-900/80 border border-gray-700/20 shadow-glass', className)

// Button variants
export const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl',
  success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl',
  warning: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl',
  error: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl',
  destructive: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl',
  glass: 'backdrop-blur-xl bg-white/80 border border-white/20 text-gray-700 hover:bg-white/90 shadow-glass',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md',
  ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  default: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
}

// Button layout utility
export const buttonLayout = 'inline-flex items-center justify-center gap-2'

// Status indicator colors
export const statusColors = {
  active: {
    text: 'text-green-500',
    bg: 'bg-green-500',
    border: 'border-green-500'
  },
  inactive: {
    text: 'text-gray-500',
    bg: 'bg-gray-400',
    border: 'border-gray-400'
  },
  pending: {
    text: 'text-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-500'
  },
  error: {
    text: 'text-red-500',
    bg: 'bg-red-500',
    border: 'border-red-500'
  },
  success: {
    text: 'text-green-500',
    bg: 'bg-green-500',
    border: 'border-green-500'
  }
}

// Interactive effects
export const interactiveHover = 'transition-all duration-200 hover:scale-105 hover:shadow-xl cursor-pointer'
export const interactivePress = 'transition-all duration-100 active:scale-95'

// Card variants
export const cardVariants = {
  default: 'bg-white border border-gray-200 rounded-2xl p-6 shadow-xl',
  glass: 'backdrop-blur-xl bg-white/80 border border-white/20 shadow-glass rounded-2xl p-6',
  'glass-sm': 'backdrop-blur-xl bg-white/80 border border-white/20 shadow-glass rounded-xl p-4'
}

// Design system colors
export const colors = {
  primary: {
    blue: '#007AFF',
    purple: '#6366F1'
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444'
}