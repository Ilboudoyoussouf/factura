import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, GradientView, ScreenContainer } from '@/components/ui';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useAppTheme } from '@/theme/ThemeProvider';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: '💌',
    title: 'Créez votre carte en quelques minutes',
    description: 'Choisissez un modèle prêt à l’emploi et personnalisez-le pour votre grand jour.',
  },
  {
    icon: '🎨',
    title: 'Des styles pour chaque mariage',
    description: 'Classique, minimaliste, floral, bohème ou doré — trouvez l’univers qui vous ressemble.',
  },
  {
    icon: '✦',
    title: 'Partagez sans effort',
    description: 'Exportez votre carte en image ou en PDF et envoyez-la à vos invités en un instant.',
  },
];

export default function OnboardingScreen() {
  const { colors, spacing, typeScale, radii } = useAppTheme();
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  const goNext = () => {
    if (isLastSlide) {
      completeOnboarding();
      router.replace('/auth/create-profile');
      return;
    }
    const nextIndex = activeIndex + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    setActiveIndex(nextIndex);
  };

  return (
    <ScreenContainer padded={false} edges={['top', 'bottom']}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}>
        {SLIDES.map((slide) => (
          <View key={slide.title} style={[styles.slide, { width, paddingHorizontal: spacing.xl }]}>
            <GradientView style={[styles.iconWrap, { borderRadius: radii.xl }]}>
              <Text style={{ fontSize: 40 }}>{slide.icon}</Text>
            </GradientView>
            <Text style={[typeScale.display, { color: colors.textPrimary, textAlign: 'center', marginTop: spacing.xxl }]}>
              {slide.title}
            </Text>
            <Text
              style={[
                typeScale.body,
                { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md },
              ]}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: spacing.xl, gap: spacing.xl }]}>
        <View style={styles.dots}>
          {SLIDES.map((slide, index) => (
            <View
              key={slide.title}
              style={[
                styles.dot,
                {
                  backgroundColor: index === activeIndex ? colors.primary : colors.border,
                  width: index === activeIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>
        <Button label={isLastSlide ? 'Commencer' : 'Suivant'} onPress={goNext} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  slide: { alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 88, height: 88, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingBottom: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { height: 8, borderRadius: 4 },
});
