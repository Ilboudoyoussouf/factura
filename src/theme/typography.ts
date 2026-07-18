export const fontFamilies = {
  displayScript: 'GreatVibes_400Regular',
  serif: 'PlayfairDisplay_600SemiBold',
  serifBold: 'PlayfairDisplay_700Bold',
  sans: 'Sora_400Regular',
  sansMedium: 'Sora_500Medium',
  sansSemiBold: 'Sora_600SemiBold',
  sansBold: 'Sora_700Bold',
} as const;

export const typeScale = {
  display: { fontFamily: fontFamilies.serifBold, fontSize: 32, lineHeight: 40 },
  h1: { fontFamily: fontFamilies.sansBold, fontSize: 26, lineHeight: 32 },
  h2: { fontFamily: fontFamilies.sansSemiBold, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: fontFamilies.sans, fontSize: 15, lineHeight: 22 },
  bodyMedium: { fontFamily: fontFamilies.sansMedium, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fontFamilies.sansMedium, fontSize: 13, lineHeight: 18 },
  label: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
} as const;

export {
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
} from '@expo-google-fonts/sora';
export {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
export { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
