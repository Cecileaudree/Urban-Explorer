import { createContext, useState } from "react";
const lightTheme = {
  background: "#FFFFFF",
  card: "#F4F6F8",
  text: "#000000",
  input: "#FFFFFF",
  placeholder: "#666",
  border: "#3A3A4A",
};

const darkTheme = {
  background: "#13131F",
  card: "#1E1E2E",
  text: "#FFFFFF",
  input: "#2A2A3D",
  placeholder: "#aaa",
  border: "#E5E7EB",
};

interface ThemeContextType {
  isDarkMode: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  colors: darkTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
