import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';

import { Chip, ScreenContainer } from '@/components/ui';
import { categories } from '@/data/categories';
import { templates } from '@/data/templates';
import { TemplateCard } from '@/features/templates/TemplateCard';
import { useAppTheme } from '@/theme/ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');
const COLUMN_GAP = 16;
const CARD_WIDTH = (screenWidth - 24 * 2 - COLUMN_GAP) / 2;

export default function GalleryScreen() {
  const { colors, spacing, typeScale } = useAppTheme();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTemplates = useMemo(
    () => (activeCategory ? templates.filter((template) => template.category === activeCategory) : templates),
    [activeCategory],
  );

  return (
    <ScreenContainer padded={false}>
      <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.lg }}>
        <Text style={[typeScale.display, { color: colors.textPrimary }]}>Galerie</Text>
        <Text style={[typeScale.body, { color: colors.textSecondary, marginTop: 4 }]}>
          {filteredTemplates.length} modèles disponibles
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.xl, gap: spacing.sm, paddingBottom: spacing.lg }}>
        <Chip label="Tous" selected={activeCategory === null} onPress={() => setActiveCategory(null)} />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            selected={activeCategory === category.id}
            onPress={() => setActiveCategory(category.id)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredTemplates}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: COLUMN_GAP, paddingHorizontal: spacing.xl }}
        contentContainerStyle={{ gap: COLUMN_GAP, paddingBottom: 140 }}
        renderItem={({ item }) => (
          <TemplateCard template={item} width={CARD_WIDTH} onPress={() => router.push(`/template/${item.id}`)} />
        )}
      />
    </ScreenContainer>
  );
}
