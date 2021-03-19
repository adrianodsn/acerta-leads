import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const defaultTheme: DefaultTheme = {
  colors: {
    black: '#020202',
    blue: '#224D74',
    darkGrey: '#3C3C3C',
    gray: '#989898',
    lightGray: '#D4D4D4',
    red: '#D53F31',
    white: '#FFFFFF',
    yellow: '#F79028'
  },
  fontFamily: 'Montserrat, sans-serif',
  fontSizes: {
    small: '0.75em',
    medium: '1em',
    large: '2em'
  },
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    {children}
  </ThemeProvider>
);

export default Theme;
