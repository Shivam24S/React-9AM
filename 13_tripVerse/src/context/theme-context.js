import { createContext } from "react";

export const themeContext = createContext({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export default themeContext;
