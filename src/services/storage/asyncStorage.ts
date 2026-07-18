import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

export const zustandAsyncStorage: StateStorage = {
  getItem: async (name) => (await AsyncStorage.getItem(name)) ?? null,
  setItem: async (name, value) => AsyncStorage.setItem(name, value),
  removeItem: async (name) => AsyncStorage.removeItem(name),
};

export const STORAGE_KEYS = {
  profile: 'factura/profile',
  wallet: 'factura/wallet',
  cards: 'factura/cards',
  theme: 'factura/theme',
  onboarding: 'factura/onboarding',
} as const;

export async function clearAllAppData() {
  await AsyncStorage.removeMany(Object.values(STORAGE_KEYS));
}
