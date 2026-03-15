import { useThemeStore } from "../store/themeStore";
export const useTheme = () => {
  const { mode, isDarkMode, toggleTheme, setTheme } = useThemeStore();
  return { mode, isDarkMode, toggleTheme, setTheme };
};
