import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS, zustandAsyncStorage } from '@/services/storage/asyncStorage';
import type { CardTemplate, TextValueOverride, UserCard } from '@/types';
import { createDraftFromTemplate } from '@/services/cards/cardFactory';

type CardsStoreState = {
  cards: UserCard[];
  createDraft: (template: CardTemplate) => UserCard;
  updateTextValue: (cardId: string, regionId: string, value: string) => void;
  updateTextOverride: (cardId: string, regionId: string, override: TextValueOverride) => void;
  finalizeCard: (cardId: string) => void;
  recordExport: (cardId: string) => void;
  deleteCard: (cardId: string) => void;
  duplicateCard: (cardId: string) => UserCard | undefined;
  getCardById: (cardId: string) => UserCard | undefined;
  resetCards: () => void;
};

export const useCardsStore = create<CardsStoreState>()(
  persist(
    (set, get) => ({
      cards: [],
      createDraft: (template) => {
        const draft = createDraftFromTemplate(template);
        set((state) => ({ cards: [draft, ...state.cards] }));
        return draft;
      },
      updateTextValue: (cardId, regionId, value) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  textValues: { ...card.textValues, [regionId]: value },
                  updatedAt: new Date().toISOString(),
                }
              : card,
          ),
        }));
      },
      updateTextOverride: (cardId, regionId, override) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  textOverrides: {
                    ...card.textOverrides,
                    [regionId]: { ...card.textOverrides?.[regionId], ...override },
                  },
                  updatedAt: new Date().toISOString(),
                }
              : card,
          ),
        }));
      },
      finalizeCard: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, status: 'finalized', updatedAt: new Date().toISOString() } : card,
          ),
        }));
      },
      recordExport: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? { ...card, exportCount: card.exportCount + 1, lastExportedAt: new Date().toISOString() }
              : card,
          ),
        }));
      },
      deleteCard: (cardId) => {
        set((state) => ({ cards: state.cards.filter((card) => card.id !== cardId) }));
      },
      duplicateCard: (cardId) => {
        const source = get().cards.find((card) => card.id === cardId);
        if (!source) return undefined;
        const now = new Date().toISOString();
        const copy: UserCard = {
          ...source,
          id: `card_${Date.now()}`,
          status: 'draft',
          exportCount: 0,
          lastExportedAt: undefined,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ cards: [copy, ...state.cards] }));
        return copy;
      },
      getCardById: (cardId) => get().cards.find((card) => card.id === cardId),
      resetCards: () => set({ cards: [] }),
    }),
    {
      name: STORAGE_KEYS.cards,
      storage: createJSONStorage(() => zustandAsyncStorage),
    },
  ),
);
