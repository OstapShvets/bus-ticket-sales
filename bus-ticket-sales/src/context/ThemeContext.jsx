// src/context/ThemeContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Update theme on mount and when theme changes
  useEffect(() => {
    // Set the class on the <body> tag
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark theme
  const toggle = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
