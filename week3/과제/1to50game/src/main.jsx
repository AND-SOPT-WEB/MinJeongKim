import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";

const theme = {
  colors: {
    primary: "#1A1A19",
    secondary: "#31511E",
    tertiary: "#859F3D",
    bright: "#F6FCDF",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
