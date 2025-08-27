import { createContext, useState, useContext } from "react";

// Create context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isSideBarOpen, setSideBarStatus] = useState(false);

  return (
    <ThemeContext.Provider value={{ isSideBarOpen, setSideBarStatus }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook (optional, for cleaner usage)
export const useTheme = () => useContext(ThemeContext);