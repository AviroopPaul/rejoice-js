export type ThemeMode = "light" | "dark";
export interface ThemeState {
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}
export interface RejoiceProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}
