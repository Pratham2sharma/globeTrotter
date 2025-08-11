// ============================================================================
// UTILITY FUNCTIONS - Helper functions for styling and class management
// ============================================================================

import { clsx, type ClassValue } from "clsx"      // Utility for conditional classes
import { twMerge } from "tailwind-merge"           // Utility for merging Tailwind classes

// ============================================================================
// CLASS NAME UTILITY - Combines and deduplicates CSS classes
// ============================================================================
// This function combines multiple class values and resolves Tailwind conflicts
// Example: cn('px-2 py-1', 'px-4') => 'py-1 px-4' (px-4 overrides px-2)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))  // First combine with clsx, then merge with twMerge
}
