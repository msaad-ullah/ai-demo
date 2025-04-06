import React, {type PropsWithChildren, createContext} from 'react';
import theme from './theme';

// Created an theme context so that the theme is accessible throughout the application

export const ThemeContext = createContext(theme);

export default function ThemeProvider({children}: PropsWithChildren) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
