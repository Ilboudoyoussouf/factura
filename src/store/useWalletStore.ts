import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS, zustandAsyncStorage } from '@/services/storage/asyncStorage';
import type { CreditTransaction, WalletState } from '@/types';

type WalletStoreState = WalletState & {
  hasWallet: boolean;
  initializeWallet: (signupBonus: number) => void;
  applyTransaction: (input: Omit<CreditTransaction, 'id' | 'createdAt' | 'balanceAfter'>) => CreditTransaction;
  resetWallet: () => void;
};

export const useWalletStore = create<WalletStoreState>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      hasWallet: false,
      initializeWallet: (signupBonus) => {
        if (get().hasWallet) return;
        const transaction: CreditTransaction = {
          id: `txn_${Date.now()}`,
          type: 'grant_signup',
          amount: signupBonus,
          balanceAfter: signupBonus,
          label: 'Bienvenue : crédits offerts',
          createdAt: new Date().toISOString(),
        };
        set({ balance: signupBonus, transactions: [transaction], hasWallet: true });
      },
      applyTransaction: (input) => {
        const nextBalance = get().balance + input.amount;
        const transaction: CreditTransaction = {
          ...input,
          id: `txn_${Date.now()}_${Math.round(Math.random() * 1000)}`,
          balanceAfter: nextBalance,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ balance: nextBalance, transactions: [transaction, ...state.transactions] }));
        return transaction;
      },
      resetWallet: () => set({ balance: 0, transactions: [], hasWallet: false }),
    }),
    {
      name: STORAGE_KEYS.wallet,
      storage: createJSONStorage(() => zustandAsyncStorage),
    },
  ),
);
