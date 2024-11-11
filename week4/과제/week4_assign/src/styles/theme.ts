import { Theme as EmotionTheme } from '@emotion/react';

export interface Themetype extends EmotionTheme {
  colors: {
    primary: string;
    primary_dark: string;
    secondary: string;
    background: string;
    text: string;
    white: string;
    gray: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
}

export const theme: Themetype = {
  colors: {
    primary: 'rgba(0,140,255,0.66)',
    primary_dark: 'rgba(0,90,165,0.66)',
    secondary: '#ff9dbf',
    background: '#ecf4ff',
    text: '#333',
    white: '#fff',
    gray: '#666',
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

export default theme;
