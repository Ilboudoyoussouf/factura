import type { TextAlign, TemplateBackground } from './template';

export type CardStatus = 'draft' | 'finalized';

export type TextValueOverride = {
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  align?: TextAlign;
};

export type UserCard = {
  id: string;
  templateId: string;
  status: CardStatus;
  textValues: Record<string, string>;
  textOverrides?: Record<string, TextValueOverride>;
  backgroundOverride?: Partial<TemplateBackground>;
  createdAt: string;
  updatedAt: string;
  exportCount: number;
  lastExportedAt?: string;
};
