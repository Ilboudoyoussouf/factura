import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Avatar, Card, Chip, ScreenContainer, SectionHeader } from '@/components/ui';
import { clearAllAppData } from '@/services/storage/asyncStorage';
import { useCardsStore } from '@/store/useCardsStore';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useThemeStore, type ThemePreference } from '@/store/useThemeStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useAppTheme } from '@/theme/ThemeProvider';

const THEME_OPTIONS: { label: string; value: ThemePreference }[] = [
  { label: 'Système', value: 'system' },
  { label: 'Clair', value: 'light' },
  { label: 'Sombre', value: 'dark' },
];

export default function ProfileScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  const profile = useProfileStore((state) => state.profile);
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser l’application',
      'Toutes vos données locales (profil, crédits, cartes) seront supprimées. Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            setResetting(true);
            await clearAllAppData();
            useProfileStore.getState().resetProfile();
            useWalletStore.getState().resetWallet();
            useCardsStore.getState().resetCards();
            useOnboardingStore.setState({ hasCompletedOnboarding: false });
            setResetting(false);
            router.replace('/');
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: 140 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xxl }}>
          <Avatar name={profile?.name ?? '?'} size={56} />
          <View>
            <Text style={[typeScale.h1, { color: colors.textPrimary }]}>{profile?.name ?? 'Invité'}</Text>
            {profile?.email ? <Text style={[typeScale.caption, { color: colors.textSecondary }]}>{profile.email}</Text> : null}
          </View>
        </View>

        <SectionHeader title="Apparence" />
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xxl }}>
          {THEME_OPTIONS.map((option) => (
            <Chip key={option.value} label={option.label} selected={preference === option.value} onPress={() => setPreference(option.value)} />
          ))}
        </View>

        <SectionHeader title="À propos" />
        <Card style={{ marginBottom: spacing.xxl }}>
          <Text style={[typeScale.body, { color: colors.textSecondary }]}>
            Factura vous aide à créer des cartes d’invitation de mariage personnalisées à partir de modèles prêts à
            l’emploi. Le système de crédits de cette version est une simulation à des fins de démonstration — aucun
            paiement réel n’est effectué.
          </Text>
        </Card>

        <SectionHeader title="Zone avancée" />
        <Card>
          <Text style={[typeScale.bodyMedium, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
            Réinitialiser les données
          </Text>
          <Text style={[typeScale.caption, { color: colors.textSecondary, marginBottom: spacing.md }]}>
            Efface le profil, le solde de crédits et toutes les cartes stockées sur cet appareil.
          </Text>
          <Chip label={resetting ? 'Réinitialisation…' : 'Réinitialiser l’application'} onPress={handleReset} />
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
