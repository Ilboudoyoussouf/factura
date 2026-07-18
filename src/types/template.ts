export type TemplateCategoryId = 'elegant-classic' | 'modern-minimal' | 'floral-romantic' | 'boheme' | 'luxe-gold';

export type TemplateCategory = {
  id: TemplateCategoryId;
  name: string;
  description: string;
};

export type TemplateBackground = {
  type: 'solid' | 'gradient' | 'pattern';
  colors: string[];
  angle?: number;
  patternId?: 'floral' | 'feathers' | 'filigree' | 'lines' | 'none';
};

export type TextAlign = 'left' | 'center' | 'right';

export type TextRegion = {
  id: string;
  label: string;
  defaultValue: string;
  placeholder: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  align: TextAlign;
  x: number;
  y: number;
  maxWidth: number;
  maxLines?: number;
};

export type CardTemplate = {
  id: string;
  category: TemplateCategoryId;
  name: string;
  description: string;
  background: TemplateBackground;
  textRegions: TextRegion[];
  palette: string[];
  aspectRatio: number;
  creditCost: number;
  isFeatured?: boolean;
  isNew?: boolean;
};
