import type { CreditPack } from '@/types';

export const creditPacks: CreditPack[] = [
  {
    id: 'pack-decouverte',
    name: 'Découverte',
    credits: 20,
    priceLabel: '1,99 €',
  },
  {
    id: 'pack-populaire',
    name: 'Populaire',
    credits: 60,
    bonusCredits: 10,
    priceLabel: '4,99 €',
    highlighted: true,
  },
  {
    id: 'pack-mariage-complet',
    name: 'Mariage Complet',
    credits: 150,
    bonusCredits: 30,
    priceLabel: '9,99 €',
  },
];
