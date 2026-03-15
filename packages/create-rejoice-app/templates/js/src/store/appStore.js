import { create } from "rejoice-js";

export const useAppStore = create((set, get) => ({
  happiness: 50,
  increase: () => set({ happiness: Math.min(100, get().happiness + 10) }),
  decrease: () => set({ happiness: Math.max(0, get().happiness - 10) }),
}));
