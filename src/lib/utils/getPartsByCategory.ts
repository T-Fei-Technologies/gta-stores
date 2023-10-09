import type { Part } from '$lib/types/Part';
import type { Category } from '$lib/types/Category';
import type { SubCategory } from '$lib/types/SubCategory';

export const getPartsByCategory = (parts: Part[], category: Category): Part[] => {
  return parts.filter(part => part.category === category.id);
};

export const getPartsBySubCategory = (parts: Part[], subCategory?: SubCategory): Part[] => {
  return subCategory ? parts.filter(part => part.sub_category === subCategory.id) : parts;
};
