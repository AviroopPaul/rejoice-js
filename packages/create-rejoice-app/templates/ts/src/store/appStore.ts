import { create } from "rejoice-js";

interface AppStore {
  happiness: number;
  increase: () => void;
  decrease: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  happiness: 50,
  increase: () => set({ happiness: Math.min(100, get().happiness + 10) }),
  decrease: () => set({ happiness: Math.max(0, get().happiness - 10) }),
}));
