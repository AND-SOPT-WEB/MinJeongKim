import { Global, css } from '@emotion/react';
import React from 'react';

const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        background-color: #ecf4ff;
      }
    `}
  />
);

export default GlobalStyles;
