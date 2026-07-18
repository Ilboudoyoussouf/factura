import { StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import type { TemplateBackground } from '@/types';

type CardPatternOverlayProps = {
  patternId: NonNullable<TemplateBackground['patternId']>;
  tint: string;
};

export function CardPatternOverlay({ patternId, tint }: CardPatternOverlayProps) {
  if (patternId === 'none' || !patternId) return null;

  if (patternId === 'floral') {
    return (
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 140" opacity={0.35}>
        {[
          [10, 12], [16, 20], [8, 24], [90, 118], [84, 126], [92, 130], [12, 128], [88, 14], [80, 8],
        ].map(([cx, cy], index) => (
          <Circle key={index} cx={cx} cy={cy} r={index % 3 === 0 ? 3.2 : 2} fill={tint} />
        ))}
        <Path
          d="M4 10 C 10 4, 20 4, 22 14 M92 8 C 98 14, 98 22, 88 24 M8 122 C 4 130, 10 136, 20 132 M96 118 C 96 128, 88 134, 80 130"
          stroke={tint}
          strokeWidth={1.2}
          fill="none"
        />
      </Svg>
    );
  }

  if (patternId === 'feathers') {
    return (
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 140" opacity={0.3}>
        <Path
          d="M8 6 Q 2 20 10 34 Q 4 30 2 40 M92 100 Q 98 114 90 128 Q 96 124 98 134"
          stroke={tint}
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  if (patternId === 'filigree') {
    return (
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 140" opacity={0.4}>
        <Path
          d="M6 6 H22 M6 6 V22 M6 6 C 6 16, 16 16, 16 6 M94 6 H78 M94 6 V22 M94 6 C 94 16, 84 16, 84 6 M6 134 H22 M6 134 V118 M6 134 C 6 124, 16 124, 16 134 M94 134 H78 M94 134 V118 M94 134 C 94 124, 84 124, 84 134"
          stroke={tint}
          strokeWidth={1}
          fill="none"
        />
      </Svg>
    );
  }

  if (patternId === 'lines') {
    return (
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 140" opacity={0.25}>
        <Path d="M0 34 H100 M0 106 H100" stroke={tint} strokeWidth={0.6} />
      </Svg>
    );
  }

  return null;
}
