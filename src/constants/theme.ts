/**
 * Design System - Colors, Spacing, Typography
 * Centralized theme constants to avoid hardcoding values across components
 */

export const Colors = {
  // Primary Colors
  primary: '#3b82f6',      // blue-500
  primaryDark: '#2563eb',  // blue-600
  
  // Status Colors
  success: '#10b981',      // green-500
  successLight: '#d1fae5', // green-100
  successBorder: '#a7f3d0', // green-200
  successText: '#065f46',  // green-900
  
  error: '#ef4444',        // red-500
  errorLight: '#fee2e2',   // red-100
  errorBorder: '#fecaca',  // red-200
  errorText: '#991b1b',    // red-900
  
  // Neutral Colors
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray900: '#1f2937',
  
  // Semantic Colors
  background: '#f9fafb',
  card: '#ffffff',
  text: '#1f2937',
  textSecondary: '#4b5563',
  border: '#e5e7eb',
  white: '#ffffff',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
} as const;

export const FontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
