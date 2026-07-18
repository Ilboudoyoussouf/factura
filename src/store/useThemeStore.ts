import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS, zustandAsyncStorage } from '@/services/storage/asyncStorage';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeStoreState = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: STORAGE_KEYS.theme,
      storage: createJSONStorage(() => zustandAsyncStorage),
    },
  ),
);
