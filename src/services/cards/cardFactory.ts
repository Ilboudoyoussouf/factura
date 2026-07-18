import type { CardTemplate, UserCard } from '@/types';

export function createDraftFromTemplate(template: CardTemplate): UserCard {
  const now = new Date().toISOString();
  const textValues: Record<string, string> = {};
  for (const region of template.textRegions) {
    textValues[region.id] = region.defaultValue;
  }
  return {
    id: `card_${Date.now()}`,
    templateId: template.id,
    status: 'draft',
    textValues,
    createdAt: now,
    updatedAt: now,
    exportCount: 0,
  };
}
