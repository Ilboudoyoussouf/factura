import { StyleSheet, Text, View } from 'react-native';

import type { CardTemplate, TextValueOverride } from '@/types';

import { CardPatternOverlay } from './CardPatternOverlay';
import { GradientView } from './ui/GradientView';

type CardRendererProps = {
  template: CardTemplate;
  width: number;
  textValues?: Record<string, string>;
  textOverrides?: Record<string, TextValueOverride>;
  activeRegionId?: string;
};

const FONT_REFERENCE_WIDTH = 340;

export function CardRenderer({ template, width, textValues, textOverrides, activeRegionId }: CardRendererProps) {
  const height = width / template.aspectRatio;
  const { background } = template;
  const scale = width / 100;
  const fontScale = width / FONT_REFERENCE_WIDTH;

  const backgroundNode =
    background.type === 'gradient' ? (
      <GradientView
        colors={background.colors as [string, string, ...string[]]}
        angleDeg={background.angle ?? 135}
        style={StyleSheet.absoluteFill}
      />
    ) : background.type === 'pattern' ? (
      <GradientView
        colors={background.colors as [string, string, ...string[]]}
        angleDeg={background.angle ?? 135}
        style={StyleSheet.absoluteFill}
      />
    ) : (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: background.colors[0] }]} />
    );

  return (
    <View style={{ width, height, borderRadius: 20 * (scale > 1 ? 1 : scale), overflow: 'hidden' }}>
      {backgroundNode}
      {background.type === 'pattern' && background.patternId ? (
        <CardPatternOverlay patternId={background.patternId} tint={template.palette[1] ?? '#FFFFFF'} />
      ) : null}
      {template.textRegions.map((region) => {
        const value = textValues?.[region.id] ?? region.defaultValue;
        const override = textOverrides?.[region.id];
        const isActive = activeRegionId === region.id;
        return (
          <View
            key={region.id}
            style={{
              position: 'absolute',
              left: (region.x - region.maxWidth / 2) * scale,
              top: (region.y / 100) * height,
              width: region.maxWidth * scale,
              alignItems: region.align === 'center' ? 'center' : region.align === 'right' ? 'flex-end' : 'flex-start',
              borderWidth: isActive ? 1 : 0,
              borderColor: isActive ? template.palette[1] : 'transparent',
              borderStyle: 'dashed',
              borderRadius: 6,
              padding: isActive ? 2 : 0,
            }}>
            <Text
              numberOfLines={region.maxLines}
              style={{
                fontFamily: override?.fontFamily ?? region.fontFamily,
                fontSize: (override?.fontSize ?? region.fontSize) * fontScale,
                color: override?.color ?? region.color,
                textAlign: override?.align ?? region.align,
              }}>
              {value}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
