import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { CardRenderer } from '@/components/CardRenderer';
import { BottomSheet, Button, IconButton, ScreenContainer } from '@/components/ui';
import { getTemplateById } from '@/data/templates';
import { EXPORT_IMAGE_COST, EXPORT_PDF_COST, canAfford, charge, getBalance } from '@/services/credits/creditEngine';
import { exportCardAsPdf, shareCardImage } from '@/services/cards/cardExport';
import { useCardsStore } from '@/store/useCardsStore';
import { useAppTheme } from '@/theme/ThemeProvider';

export default function ExportScreen() {
  const { cardId } = useLocalSearchParams<{ cardId: string }>();
  const { colors, spacing, typeScale, radii } = useAppTheme();

  const card = useCardsStore((state) => state.cards.find((item) => item.id === cardId));
  const finalizeCard = useCardsStore((state) => state.finalizeCard);
  const recordExport = useCardsStore((state) => state.recordExport);

  const captureRef = useRef<View>(null);
  const [loadingAction, setLoadingAction] = useState<'image' | 'pdf' | null>(null);
  const [showInsufficientSheet, setShowInsufficientSheet] = useState(false);
  const [missingAmount, setMissingAmount] = useState(0);

  const template = card ? getTemplateById(card.templateId) : undefined;

  if (!card || !template) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.textPrimary }}>Carte introuvable.</Text>
      </ScreenContainer>
    );
  }

  const runExport = async (kind: 'image' | 'pdf') => {
    const cost = kind === 'image' ? EXPORT_IMAGE_COST : EXPORT_PDF_COST;
    if (!canAfford(cost)) {
      setMissingAmount(cost - getBalance());
      setShowInsufficientSheet(true);
      return;
    }

    setLoadingAction(kind);
    try {
      const charged = charge({
        amount: cost,
        type: kind === 'image' ? 'spend_export' : 'spend_pdf',
        label: kind === 'image' ? `Export image · ${template.name}` : `Export PDF · ${template.name}`,
        relatedCardId: card.id,
      });
      if (!charged) {
        setMissingAmount(cost - getBalance());
        setShowInsufficientSheet(true);
        return;
      }

      if (kind === 'image') {
        await shareCardImage(captureRef);
      } else {
        await exportCardAsPdf(captureRef);
      }

      finalizeCard(card.id);
      recordExport(card.id);
    } catch {
      Alert.alert('Export impossible', 'Une erreur est survenue pendant l’export. Réessayez.');
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm }}>
        <Text style={[typeScale.h2, { color: colors.textPrimary }]}>Aperçu et export</Text>
        <IconButton onPress={() => router.back()}>
          <Text style={{ fontSize: 16, color: colors.textPrimary }}>✕</Text>
        </IconButton>
      </View>

      <View style={{ alignItems: 'center', marginVertical: spacing.xl }}>
        <View ref={captureRef} collapsable={false}>
          <CardRenderer template={template} width={260} textValues={card.textValues} textOverrides={card.textOverrides} />
        </View>
      </View>

      <View style={{ gap: spacing.md }}>
        <ExportOptionRow
          title="Partager en image"
          description="PNG haute qualité, prêt à envoyer par message."
          cost={EXPORT_IMAGE_COST}
          loading={loadingAction === 'image'}
          onPress={() => runExport('image')}
        />
        <ExportOptionRow
          title="Exporter en PDF"
          description="Format imprimable pour vos invités."
          cost={EXPORT_PDF_COST}
          loading={loadingAction === 'pdf'}
          onPress={() => runExport('pdf')}
        />
      </View>

      <BottomSheet visible={showInsufficientSheet} onClose={() => setShowInsufficientSheet(false)}>
        <View style={{ gap: spacing.md, alignItems: 'center' }}>
          <Text style={{ fontSize: 32 }}>✦</Text>
          <Text style={[typeScale.h2, { color: colors.textPrimary, textAlign: 'center' }]}>Crédits insuffisants</Text>
          <Text style={[typeScale.body, { color: colors.textSecondary, textAlign: 'center' }]}>
            Il vous manque {missingAmount} crédits pour cet export. Rechargez votre portefeuille pour continuer.
          </Text>
          <Button
            label="Aller au portefeuille"
            onPress={() => {
              setShowInsufficientSheet(false);
              router.push('/(tabs)/wallet');
            }}
          />
        </View>
      </BottomSheet>
    </ScreenContainer>
  );
}

function ExportOptionRow({
  title,
  description,
  cost,
  loading,
  onPress,
}: {
  title: string;
  description: string;
  cost: number;
  loading: boolean;
  onPress: () => void;
}) {
  const { colors, spacing, radii, typeScale } = useAppTheme();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        gap: spacing.sm,
      }}>
      <Text style={[typeScale.bodyMedium, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[typeScale.caption, { color: colors.textSecondary }]}>{description}</Text>
      <Button label={`${cost} crédits · Exporter`} onPress={onPress} loading={loading} variant="secondary" />
    </View>
  );
}
