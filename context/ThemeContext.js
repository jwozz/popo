import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  primary: '#128C7E',
  background: 'rgb(246, 246, 246)',
  text: '#000000',
  bubbleOwn: '#DCF8C6',
  bubbleOther: '#FFFFFF',
};

const darkTheme = {
  primary: '#075E54',
  background: '#121B22',
  text: '#FFFFFF',
  bubbleOwn: '#005C4B',
  bubbleOther: '#202C33',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colors = isDarkMode ? darkTheme : lightTheme;
  
  const toggleTheme = () => setIsDarkMode(prev => !prev);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);