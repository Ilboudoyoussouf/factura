import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { CardRenderer } from '@/components/CardRenderer';
import { Card, Chip, EmptyState, IconButton, ScreenContainer, StatusBadge } from '@/components/ui';
import { getTemplateById } from '@/data/templates';
import { useCardsStore } from '@/store/useCardsStore';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { CardStatus } from '@/types';

const FILTERS: { label: string; value: CardStatus | 'all' }[] = [
  { label: 'Toutes', value: 'all' },
  { label: 'Brouillons', value: 'draft' },
  { label: 'Finalisées', value: 'finalized' },
];

export default function MyCardsScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  const cards = useCardsStore((state) => state.cards);
  const deleteCard = useCardsStore((state) => state.deleteCard);
  const duplicateCard = useCardsStore((state) => state.duplicateCard);

  const [filter, setFilter] = useState<CardStatus | 'all'>('all');

  const filteredCards = useMemo(
    () => (filter === 'all' ? cards : cards.filter((card) => card.status === filter)),
    [cards, filter],
  );

  return (
    <ScreenContainer>
      <View style={{ paddingTop: spacing.md, paddingBottom: spacing.lg }}>
        <Text style={[typeScale.display, { color: colors.textPrimary }]}>Mes cartes</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        {FILTERS.map((item) => (
          <Chip key={item.value} label={item.label} selected={filter === item.value} onPress={() => setFilter(item.value)} />
        ))}
      </View>

      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: 140 }}
        ListEmptyComponent={
          <EmptyState
            icon="🗂️"
            title="Aucune carte ici"
            description="Créez une carte depuis la galerie pour la retrouver dans cette liste."
            actionLabel="Découvrir la galerie"
            onActionPress={() => router.push('/(tabs)/gallery')}
          />
        }
        renderItem={({ item }) => {
          const template = getTemplateById(item.templateId);
          if (!template) return null;
          return (
            <Card onPress={() => router.push(`/editor/${item.id}`)}>
              <View style={{ flexDirection: 'row', gap: spacing.md }}>
                <CardRenderer template={template} width={72} textValues={item.textValues} textOverrides={item.textOverrides} />
                <View style={{ flex: 1, gap: 6 }}>
                  <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.textValues.coupleNames ?? template.name}
                  </Text>
                  <StatusBadge status={item.status} />
                  <Text style={[typeScale.caption, { color: colors.textSecondary }]}>
                    Modifiée le {new Date(item.updatedAt).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <View style={{ gap: spacing.sm }}>
                  <IconButton size={34} onPress={() => duplicateCard(item.id)}>
                    <Text style={{ color: colors.textPrimary }}>⧉</Text>
                  </IconButton>
                  <IconButton size={34} onPress={() => deleteCard(item.id)}>
                    <Text style={{ color: colors.danger }}>🗑</Text>
                  </IconButton>
                </View>
              </View>
            </Card>
          );
        }}
      />
    </ScreenContainer>
  );
}
