import type { PART_CATEGORIES } from '$lib/types/PartCategories';

export type WorksheetItem = {
  partId: string;
  quantity: number;
  type: PART_CATEGORIES;
  subtype?: string;
}
