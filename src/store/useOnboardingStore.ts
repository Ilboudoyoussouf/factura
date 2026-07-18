import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS, zustandAsyncStorage } from '@/services/storage/asyncStorage';

type OnboardingStoreState = {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: STORAGE_KEYS.onboarding,
      storage: createJSONStorage(() => zustandAsyncStorage),
    },
  ),
);
