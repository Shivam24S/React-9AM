import { useContext } from "react";
import themeContext from "./theme-context";

export const useTheme = () => {
  return useContext(themeContext);
};

export default useTheme;
