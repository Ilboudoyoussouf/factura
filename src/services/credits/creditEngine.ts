import { useWalletStore } from '@/store/useWalletStore';
import type { CreditTransactionType } from '@/types';

export const SIGNUP_BONUS_CREDITS = 20;
export const EXPORT_IMAGE_COST = 10;
export const EXPORT_PDF_COST = 15;

export function canAfford(amount: number): boolean {
  return useWalletStore.getState().balance >= amount;
}

export function getBalance(): number {
  return useWalletStore.getState().balance;
}

export function charge(input: {
  amount: number;
  type: Extract<CreditTransactionType, 'spend_export' | 'spend_pdf'>;
  label: string;
  relatedCardId?: string;
}): boolean {
  if (!canAfford(input.amount)) return false;
  useWalletStore.getState().applyTransaction({
    type: input.type,
    amount: -input.amount,
    label: input.label,
    relatedCardId: input.relatedCardId,
  });
  return true;
}

export function grantPurchase(input: { amount: number; label: string; relatedPackId?: string }) {
  useWalletStore.getState().applyTransaction({
    type: 'purchase',
    amount: input.amount,
    label: input.label,
    relatedPackId: input.relatedPackId,
  });
}
