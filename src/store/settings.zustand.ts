import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const settingsZustand = create()(
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
