import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import { Button, GradientText, Input, ScreenContainer } from '@/components/ui';
import { SIGNUP_BONUS_CREDITS } from '@/services/credits/creditEngine';
import { useProfileStore } from '@/store/useProfileStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useAppTheme } from '@/theme/ThemeProvider';

export default function CreateProfileScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  const createProfile = useProfileStore((state) => state.createProfile);
  const initializeWallet = useWalletStore((state) => state.initializeWallet);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = () => {
    if (name.trim().length < 2) {
      setError('Merci d’indiquer votre prénom ou nom.');
      return;
    }
    createProfile({ name: name.trim(), email: email.trim() || undefined, weddingDate: weddingDate.trim() || undefined });
    initializeWallet(SIGNUP_BONUS_CREDITS);
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', gap: spacing.xxl }}>
          <View style={{ gap: spacing.sm }}>
            <Text style={[typeScale.display, { color: colors.textPrimary }]}>Bienvenue</Text>
            <Text style={[typeScale.body, { color: colors.textSecondary }]}>
              Créez votre profil local pour commencer. Aucune donnée ne quitte votre appareil.
            </Text>
          </View>

          <View style={{ gap: spacing.lg }}>
            <Input label="Votre prénom" placeholder="Amina" value={name} onChangeText={setName} errorText={error} />
            <Input
              label="Email (optionnel)"
              placeholder="amina@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              label="Date du mariage (optionnel)"
              placeholder="12 Septembre 2026"
              value={weddingDate}
              onChangeText={setWeddingDate}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.surfaceElevated,
              borderRadius: 16,
              padding: spacing.lg,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
            }}>
            <Text style={{ fontSize: 20 }}>✦</Text>
            <Text style={[typeScale.caption, { color: colors.textSecondary, flex: 1 }]}>
              <GradientText style={typeScale.caption}>{`${SIGNUP_BONUS_CREDITS} crédits`}</GradientText> vous
              seront offerts à la création de votre profil (simulation).
            </Text>
          </View>

          <Button label="Créer mon profil" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
