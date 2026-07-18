import { Text, View } from 'react-native';

import { CardRenderer } from '@/components/CardRenderer';
import { Badge, Card } from '@/components/ui';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { CardTemplate } from '@/types';

type TemplateCardProps = {
  template: CardTemplate;
  width: number;
  onPress: () => void;
};

export function TemplateCard({ template, width, onPress }: TemplateCardProps) {
  const { colors, spacing, typeScale } = useAppTheme();
  const cardWidth = width - spacing.lg * 2;

  return (
    <Card onPress={onPress} style={{ width, padding: spacing.sm }}>
      <View style={{ alignSelf: 'center' }}>
        <CardRenderer template={template} width={cardWidth} />
      </View>
      <View style={{ paddingTop: spacing.sm, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]} numberOfLines={1}>
            {template.name}
          </Text>
          {template.isNew ? <Badge label="Nouveau" tone="success" /> : null}
        </View>
        <Badge label={template.creditCost > 0 ? `${template.creditCost} crédits` : 'Personnalisation gratuite'} tone={template.creditCost > 0 ? 'neutral' : 'success'} />
      </View>
    </Card>
  );
}
