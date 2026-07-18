import { useFonts } from 'expo-font';

import { useCardsStore } from '@/store/useCardsStore';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useWalletStore } from '@/store/useWalletStore';
import {
  GreatVibes_400Regular,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
} from '@/theme/typography';

import { useStoreHydration } from './useStoreHydration';

export function useAppReadyGate() {
  const [fontsLoaded] = useFonts({
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    GreatVibes_400Regular,
  });

  const themeHydrated = useStoreHydration(useThemeStore);
  const onboardingHydrated = useStoreHydration(useOnboardingStore);
  const profileHydrated = useStoreHydration(useProfileStore);
  const walletHydrated = useStoreHydration(useWalletStore);
  const cardsHydrated = useStoreHydration(useCardsStore);

  return Boolean(
    fontsLoaded && themeHydrated && onboardingHydrated && profileHydrated && walletHydrated && cardsHydrated,
  );
}
