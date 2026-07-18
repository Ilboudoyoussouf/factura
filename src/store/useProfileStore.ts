import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS, zustandAsyncStorage } from '@/services/storage/asyncStorage';
import type { LocalProfile } from '@/types';

type ProfileStoreState = {
  profile: LocalProfile | null;
  createProfile: (input: { name: string; email?: string; weddingDate?: string }) => LocalProfile;
  updateProfile: (input: Partial<Pick<LocalProfile, 'name' | 'email' | 'weddingDate'>>) => void;
  resetProfile: () => void;
};

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set, get) => ({
      profile: null,
      createProfile: ({ name, email, weddingDate }) => {
        const profile: LocalProfile = {
          id: `profile_${Date.now()}`,
          name,
          email,
          weddingDate,
          createdAt: new Date().toISOString(),
        };
        set({ profile });
        return profile;
      },
      updateProfile: (input) => {
        const current = get().profile;
        if (!current) return;
        set({ profile: { ...current, ...input } });
      },
      resetProfile: () => set({ profile: null }),
    }),
    {
      name: STORAGE_KEYS.profile,
      storage: createJSONStorage(() => zustandAsyncStorage),
    },
  ),
);
