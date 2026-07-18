import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';

import { getTemplateById } from '@/data/templates';
import { CardRenderer } from '@/components/CardRenderer';
import { Button, Chip, IconButton, ScreenContainer } from '@/components/ui';
import { useCardsStore } from '@/store/useCardsStore';
import { useAppTheme } from '@/theme/ThemeProvider';
import { fontFamilies } from '@/theme/typography';

const FONT_OPTIONS: { label: string; family: string }[] = [
  { label: 'Élégante', family: fontFamilies.serifBold },
  { label: 'Moderne', family: fontFamilies.sansSemiBold },
  { label: 'Manuscrite', family: fontFamilies.displayScript },
];

export default function EditorScreen() {
  const { cardId } = useLocalSearchParams<{ cardId: string }>();
  const { colors, spacing, typeScale, radii } = useAppTheme();

  const card = useCardsStore((state) => state.cards.find((item) => item.id === cardId));
  const updateTextValue = useCardsStore((state) => state.updateTextValue);
  const updateTextOverride = useCardsStore((state) => state.updateTextOverride);

  const template = card ? getTemplateById(card.templateId) : undefined;
  const [activeRegionId, setActiveRegionId] = useState<string | undefined>(template?.textRegions[0]?.id);

  if (!card || !template) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.textPrimary }}>Carte introuvable.</Text>
      </ScreenContainer>
    );
  }

  const activeRegion = template.textRegions.find((region) => region.id === activeRegionId);
  const activeOverride = activeRegionId ? card.textOverrides?.[activeRegionId] : undefined;

  return (
    <ScreenContainer edges={['top', 'bottom']} padded={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.sm,
          }}>
          <IconButton onPress={() => router.back()}>
            <Text style={{ fontSize: 18, color: colors.textPrimary }}>‹</Text>
          </IconButton>
          <Text style={[typeScale.h2, { color: colors.textPrimary }]}>Personnaliser</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={{ alignItems: 'center', paddingVertical: spacing.lg }}>
          <CardRenderer
            template={template}
            width={260}
            textValues={card.textValues}
            textOverrides={card.textOverrides}
            activeRegionId={activeRegionId}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderTopLeftRadius: radii.xl,
            borderTopRightRadius: radii.xl,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.lg,
          }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.lg }}>
            {template.textRegions.map((region) => (
              <Chip
                key={region.id}
                label={region.label}
                selected={region.id === activeRegionId}
                onPress={() => setActiveRegionId(region.id)}
              />
            ))}
          </ScrollView>

          {activeRegion ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.lg, paddingBottom: spacing.xl }}>
              <View style={{ gap: spacing.xs }}>
                <Text style={{ fontFamily: fontFamilies.sansSemiBold, fontSize: 12, color: colors.textSecondary }}>
                  {activeRegion.label.toUpperCase()}
                </Text>
                <TextInput
                  value={card.textValues[activeRegion.id] ?? ''}
                  onChangeText={(value) => updateTextValue(card.id, activeRegion.id, value)}
                  placeholder={activeRegion.placeholder}
                  placeholderTextColor={colors.textSecondary}
                  multiline={Boolean(activeRegion.maxLines && activeRegion.maxLines > 1)}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: radii.md,
                    padding: spacing.md,
                    color: colors.textPrimary,
                    fontFamily: fontFamilies.sans,
                    fontSize: 15,
                    minHeight: 48,
                  }}
                />
              </View>

              <View style={{ gap: spacing.xs }}>
                <Text style={{ fontFamily: fontFamilies.sansSemiBold, fontSize: 12, color: colors.textSecondary }}>
                  COULEUR DU TEXTE
                </Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                  {template.palette.map((color) => {
                    const isSelected = (activeOverride?.color ?? activeRegion.color) === color;
                    return (
                      <IconButton key={color} variant="plain" onPress={() => updateTextOverride(card.id, activeRegion.id, { color })}>
                        <View
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: radii.pill,
                            backgroundColor: color,
                            borderWidth: isSelected ? 2 : 1,
                            borderColor: isSelected ? colors.primary : colors.border,
                          }}
                        />
                      </IconButton>
                    );
                  })}
                </View>
              </View>

              <View style={{ gap: spacing.xs }}>
                <Text style={{ fontFamily: fontFamilies.sansSemiBold, fontSize: 12, color: colors.textSecondary }}>
                  STYLE DE POLICE
                </Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' }}>
                  {FONT_OPTIONS.map((option) => (
                    <Chip
                      key={option.family}
                      label={option.label}
                      selected={(activeOverride?.fontFamily ?? activeRegion.fontFamily) === option.family}
                      onPress={() => updateTextOverride(card.id, activeRegion.id, { fontFamily: option.family })}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : null}

          <View style={{ paddingBottom: spacing.xl }}>
            <Button label="Aperçu et export" onPress={() => router.push(`/export/${card.id}`)} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
