
// ============================================
// FILE: src/styles/themes.ts
// ============================================
export const lightTheme = {
  colors: {
    primary: '#8B7355', // Walnut
    secondary: '#F5F5F0', // Natural
    accent: '#6B8E6F', // Sage
    clay: '#CC7357', // Clay
    background: '#FFFFFF',
    foreground: '#333333',
    muted: '#999999',
    border: '#E5E5E5',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
}

export const darkTheme = {
  colors: {
    primary: '#A89178', // Lighter Walnut
    secondary: '#2A2A2A', // Dark Natural
    accent: '#8BAA8E', // Lighter Sage
    clay: '#E88E75', // Lighter Clay
    background: '#1A1A1A',
    foreground: '#E5E5E5',
    muted: '#888888',
    border: '#333333',
  },
  fonts: lightTheme.fonts,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
}

export type Theme = typeof lightTheme