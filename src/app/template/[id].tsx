import { router, useLocalSearchParams } from 'expo-router';
import { Dimensions, ScrollView, Text, View } from 'react-native';

import { CardRenderer } from '@/components/CardRenderer';
import { Badge, Button, IconButton, ScreenContainer } from '@/components/ui';
import { categories } from '@/data/categories';
import { getTemplateById } from '@/data/templates';
import { useCardsStore } from '@/store/useCardsStore';
import { useAppTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

export default function TemplateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing, typeScale, radii } = useAppTheme();
  const createDraft = useCardsStore((state) => state.createDraft);

  const template = getTemplateById(id);

  if (!template) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.textPrimary }}>Modèle introuvable.</Text>
      </ScreenContainer>
    );
  }

  const category = categories.find((item) => item.id === template.category);
  const previewWidth = screenWidth - spacing.xl * 2;

  const handlePersonalize = () => {
    const draft = createDraft(template);
    router.push(`/editor/${draft.id}`);
  };

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm }}>
        <IconButton onPress={() => router.back()}>
          <Text style={{ fontSize: 18, color: colors.textPrimary }}>‹</Text>
        </IconButton>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
          <CardRenderer template={template} width={previewWidth} />
        </View>

        <View style={{ gap: spacing.xs, marginBottom: spacing.lg }}>
          {category ? <Badge label={category.name} /> : null}
          <Text style={[typeScale.display, { color: colors.textPrimary }]}>{template.name}</Text>
          <Text style={[typeScale.body, { color: colors.textSecondary }]}>{template.description}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xxl }}>
          {template.palette.map((color) => (
            <View
              key={color}
              style={{ width: 32, height: 32, borderRadius: radii.pill, backgroundColor: color, borderWidth: 1, borderColor: colors.border }}
            />
          ))}
        </View>

        <Button label="Personnaliser cette carte" onPress={handlePersonalize} />
      </ScrollView>
    </ScreenContainer>
  );
}
