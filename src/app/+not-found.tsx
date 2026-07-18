import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ui';
import { useAppTheme } from '@/theme/ThemeProvider';

export default function NotFoundScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md }}>
        <Text style={[typeScale.h1, { color: colors.textPrimary }]}>Page introuvable</Text>
        <Link href="/(tabs)">
          <Text style={{ color: colors.primary }}>Retour à l’accueil</Text>
        </Link>
      </View>
    </ScreenContainer>
  );
}
