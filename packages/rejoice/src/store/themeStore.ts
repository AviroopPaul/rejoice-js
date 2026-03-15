import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ThemeState, ThemeMode } from "../types";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light" as ThemeMode,
      isDarkMode: false,
      toggleTheme: () => {
        const next = get().mode === "light" ? "dark" : "light";
        set({ mode: next, isDarkMode: next === "dark" });
      },
      setTheme: (mode) => set({ mode, isDarkMode: mode === "dark" }),
    }),
    {
      name: "rejoice-theme-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ mode: s.mode, isDarkMode: s.isDarkMode }),
    }
  )
);
