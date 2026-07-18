import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { CardRenderer } from '@/components/CardRenderer';
import { Card, CreditBadge, EmptyState, ScreenContainer, SectionHeader, StatusBadge } from '@/components/ui';
import { getTemplateById, templates } from '@/data/templates';
import { TemplateCard } from '@/features/templates/TemplateCard';
import { useCardsStore } from '@/store/useCardsStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useAppTheme } from '@/theme/ThemeProvider';

const featuredTemplates = templates.filter((template) => template.isFeatured);

export default function HomeScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  const profile = useProfileStore((state) => state.profile);
  const balance = useWalletStore((state) => state.balance);
  const recentCards = useCardsStore((state) => state.cards).slice(0, 3);

  const firstName = profile?.name?.split(' ')[0] ?? '';

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: 140 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.xl,
          }}>
          <View>
            <Text style={[typeScale.caption, { color: colors.textSecondary }]}>Bonjour</Text>
            <Text style={[typeScale.h1, { color: colors.textPrimary }]}>{firstName || 'à vous'} 👋</Text>
          </View>
          <CreditBadge amount={balance} />
        </View>

        <SectionHeader
          title="Modèles tendance"
          actionLabel="Voir tout"
          onActionPress={() => router.push('/(tabs)/gallery')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xxl }}>
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              width={190}
              onPress={() => router.push(`/template/${template.id}`)}
            />
          ))}
        </ScrollView>

        <SectionHeader
          title="Mes cartes récentes"
          actionLabel="Tout voir"
          onActionPress={() => router.push('/(tabs)/my-cards')}
        />
        {recentCards.length === 0 ? (
          <EmptyState
            icon="💌"
            title="Aucune carte pour l’instant"
            description="Choisissez un modèle dans la galerie pour créer votre première carte."
            actionLabel="Parcourir la galerie"
            onActionPress={() => router.push('/(tabs)/gallery')}
          />
        ) : (
          <View style={{ gap: spacing.md, paddingBottom: spacing.xxxl }}>
            {recentCards.map((card) => {
              const template = getTemplateById(card.templateId);
              if (!template) return null;
              return (
                <Card key={card.id} onPress={() => router.push(`/editor/${card.id}`)}>
                  <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                    <CardRenderer template={template} width={64} textValues={card.textValues} />
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]}>{template.name}</Text>
                      <StatusBadge status={card.status} />
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
