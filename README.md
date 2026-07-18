# Factura — Cartes d'invitation de mariage

Application mobile (Expo / React Native / TypeScript) qui permet de créer des cartes d'invitation de mariage à partir de modèles prêts à l'emploi et personnalisables : texte, couleurs et police, aperçu en direct, export en image ou PDF.

Le système de crédits (offerts à l'inscription, dépensés à l'export, rechargeables via des packs) est une **simulation fictive** entièrement locale — aucun paiement réel n'est effectué.

## Démarrer

```bash
npm install
npx expo start
```

Ouvrez ensuite le projet dans Expo Go, un simulateur iOS/Android, ou le web (`w` dans le terminal Expo).

## Stack

- Expo + React Native + TypeScript strict
- Expo Router (navigation file-based, `src/app`)
- Zustand (état + persistance locale via AsyncStorage)
- react-native-svg / expo-linear-gradient / expo-blur pour les visuels de carte et l'UI glassmorphism
- react-native-view-shot + expo-sharing + expo-print pour l'export image/PDF

## Structure

```
src/app/            Écrans (Expo Router)
src/components/      Composants partagés (rendu de carte, tab bar) + design system (ui/)
src/theme/           Tokens de thème (couleurs, typographie, espacement, ombres)
src/data/            Catalogue de modèles, catégories, packs de crédits
src/store/           Stores Zustand persistés (profil, portefeuille, cartes, thème, onboarding)
src/services/        Persistance locale, moteur de crédits, export de carte
src/types/           Types partagés
```

## Persistance

Toutes les données (profil, solde de crédits, cartes créées, préférence de thème) sont stockées localement sur l'appareil via AsyncStorage — aucun backend n'est requis pour cette version.
