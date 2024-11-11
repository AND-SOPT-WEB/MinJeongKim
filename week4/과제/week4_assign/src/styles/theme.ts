import '@emotion/react';

export const theme = {
  colors: {
    primary: 'rgba(0,140,255,0.66)',
    secondary: '#ff9dbf',
    background: '#ecf4ff',
    text: '#333',
    white: '#fff',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
};

export type ThemeType = typeof theme;
export default theme;
