import { Redirect } from 'expo-router';

import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useProfileStore } from '@/store/useProfileStore';

export default function RootIndex() {
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);
  const profile = useProfileStore((state) => state.profile);

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!profile) {
    return <Redirect href="/auth/create-profile" />;
  }

  return <Redirect href="/(tabs)" />;
}
