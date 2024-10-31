import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "@emotion/react";

const theme = {
  colors: {
    primary: '#874949',
    secondary: '#f0a1a1',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '32px',
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
