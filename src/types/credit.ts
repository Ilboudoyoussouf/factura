export type CreditTransactionType = 'grant_signup' | 'purchase' | 'spend_export' | 'spend_pdf';

export type CreditTransaction = {
  id: string;
  type: CreditTransactionType;
  amount: number;
  balanceAfter: number;
  label: string;
  createdAt: string;
  relatedCardId?: string;
  relatedPackId?: string;
};

export type CreditPack = {
  id: string;
  name: string;
  credits: number;
  bonusCredits?: number;
  priceLabel: string;
  highlighted?: boolean;
};

export type WalletState = {
  balance: number;
  transactions: CreditTransaction[];
};
