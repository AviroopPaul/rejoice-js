import React, { useMemo } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useThemeStore } from "../store/themeStore";
import type { RejoiceProviderProps, ThemeMode } from "../types";

const buildStyledTheme = (mode: ThemeMode) => ({
  mode,
  isDark: mode === "dark",
  colors: {
    background: mode === "dark" ? "#141414" : "#ffffff",
    surface: mode === "dark" ? "#1f1f1f" : "#f5f5f5",
    text: mode === "dark" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.88)",
    primary: "#1677ff",
    border: mode === "dark" ? "#303030" : "#d9d9d9",
  },
  spacing: (n: number) => `${n * 8}px`,
});

const InnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode, isDarkMode } = useThemeStore();
  const styledTheme = useMemo(() => buildStyledTheme(mode), [mode]);
  const antdConfig = useMemo(
    () => ({ algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }),
    [isDarkMode]
  );
  return (
    <ConfigProvider theme={antdConfig}>
      <StyledProvider theme={styledTheme}>{children}</StyledProvider>
    </ConfigProvider>
  );
};

export const RejoiceProvider: React.FC<RejoiceProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const storedMode = useThemeStore.getState().mode;
  if (storedMode === "light" && defaultTheme === "dark") {
    useThemeStore.getState().setTheme("dark");
  }
  return <InnerProvider>{children}</InnerProvider>;
};
