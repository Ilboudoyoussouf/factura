import { useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';

import { Badge, BottomSheet, Button, Card, GradientView, ScreenContainer, SectionHeader } from '@/components/ui';
import { creditPacks } from '@/data/creditPacks';
import { grantPurchase } from '@/services/credits/creditEngine';
import { useWalletStore } from '@/store/useWalletStore';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { CreditPack } from '@/types';

const TRANSACTION_LABELS: Record<string, { icon: string; tone: 'success' | 'danger' | 'neutral' }> = {
  grant_signup: { icon: '🎁', tone: 'success' },
  purchase: { icon: '💳', tone: 'success' },
  spend_export: { icon: '📤', tone: 'danger' },
  spend_pdf: { icon: '🖨️', tone: 'danger' },
};

export default function WalletScreen() {
  const { colors, spacing, typeScale, radii } = useAppTheme();
  const balance = useWalletStore((state) => state.balance);
  const transactions = useWalletStore((state) => state.transactions);

  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  const handleConfirmPurchase = async () => {
    if (!selectedPack) return;
    setPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    grantPurchase({
      amount: selectedPack.credits + (selectedPack.bonusCredits ?? 0),
      label: `Achat simulé · Pack ${selectedPack.name}`,
      relatedPackId: selectedPack.id,
    });
    setPurchasing(false);
    setSelectedPack(null);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: 140 }}>
        <GradientView style={{ borderRadius: radii.xl, padding: spacing.xl, marginBottom: spacing.xxl }}>
          <Text style={{ fontFamily: typeScale.caption.fontFamily, fontSize: 13, color: colors.textInverse, opacity: 0.85 }}>
            Solde disponible
          </Text>
          <Text style={{ fontFamily: typeScale.display.fontFamily, fontSize: 40, color: colors.textInverse, marginTop: 4 }}>
            {balance} ✦
          </Text>
          <Text style={{ fontSize: 12, color: colors.textInverse, opacity: 0.75, marginTop: spacing.sm }}>
            Simulation — aucun paiement réel n’est effectué.
          </Text>
        </GradientView>

        <SectionHeader title="Recharger mes crédits" />
        <View style={{ gap: spacing.md, marginBottom: spacing.xxl }}>
          {creditPacks.map((pack) => (
            <Pressable key={pack.id} onPress={() => setSelectedPack(pack)}>
              <Card
                style={{
                  borderColor: pack.highlighted ? colors.primary : colors.border,
                  borderWidth: pack.highlighted ? 1.5 : 1,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                      <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]}>{pack.name}</Text>
                      {pack.highlighted ? <Badge label="Populaire" tone="success" /> : null}
                    </View>
                    <Text style={[typeScale.caption, { color: colors.textSecondary }]}>
                      {pack.credits} crédits{pack.bonusCredits ? ` + ${pack.bonusCredits} bonus` : ''}
                    </Text>
                  </View>
                  <Text style={[typeScale.h2, { color: colors.textPrimary }]}>{pack.priceLabel}</Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Historique" />
        {transactions.length === 0 ? (
          <Text style={[typeScale.body, { color: colors.textSecondary }]}>Aucune transaction pour l’instant.</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
            renderItem={({ item }) => {
              const meta = TRANSACTION_LABELS[item.type] ?? { icon: '✦', tone: 'neutral' as const };
              return (
                <Card elevated={false} style={{ paddingVertical: spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                    <Text style={{ fontSize: 20 }}>{meta.icon}</Text>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]}>{item.label}</Text>
                      <Text style={[typeScale.caption, { color: colors.textSecondary }]}>
                        {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                      </Text>
                    </View>
                    <Text
                      style={[
                        typeScale.bodyMedium,
                        { color: item.amount >= 0 ? colors.success : colors.danger },
                      ]}>
                      {item.amount >= 0 ? '+' : ''}
                      {item.amount}
                    </Text>
                  </View>
                </Card>
              );
            }}
          />
        )}
      </ScrollView>

      <BottomSheet visible={Boolean(selectedPack)} onClose={() => setSelectedPack(null)}>
        {selectedPack ? (
          <View style={{ gap: spacing.md }}>
            <Text style={[typeScale.h2, { color: colors.textPrimary }]}>Confirmer l’achat</Text>
            <Text style={[typeScale.body, { color: colors.textSecondary }]}>
              Pack {selectedPack.name} · {selectedPack.credits + (selectedPack.bonusCredits ?? 0)} crédits pour{' '}
              {selectedPack.priceLabel}.
            </Text>
            <View style={{ backgroundColor: colors.surfaceElevated, borderRadius: radii.md, padding: spacing.md }}>
              <Text style={[typeScale.caption, { color: colors.textSecondary }]}>
                Simulation uniquement — aucun paiement réel ne sera effectué.
              </Text>
            </View>
            <Button label="Confirmer" onPress={handleConfirmPurchase} loading={purchasing} />
          </View>
        ) : null}
      </BottomSheet>
    </ScreenContainer>
  );
}
