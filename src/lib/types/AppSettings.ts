import type { Part } from '$lib/types/Part';
import type { Category } from '$lib/types/Category';
import type { SubCategory } from '$lib/types/SubCategory';

export type AppSettings = {
  categories: Category[];
  subCategories: SubCategory[];
  discount: number;
  markup: Record<string, number>;
  partsCatalog: Part[];
};
