import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const settingsZustand = create<any>()(
  devtools(
    persist(
      (set, get) => ({
        isOpenSettings: true,
        setIsOpen: () => set({ isOpenSettings: !get().isOpenSettings }),
      }),
      {
        name: "settings",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
