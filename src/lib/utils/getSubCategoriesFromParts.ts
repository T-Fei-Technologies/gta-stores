import type { Part } from '$lib/types/Part';
import type { SubCategory } from '$lib/types/SubCategory';

export const getSubCategoriesFromParts = (parts: Part[], subcategories: SubCategory[]): SubCategory[] => {
  const subCategories = parts.reduce((acc: Record<string, SubCategory>, part) => {
    const subCategory = subcategories.find((subCategory: SubCategory) => subCategory.id === part.sub_category);

    if (!!subCategory && !acc[subCategory.id]) {
      acc[subCategory.id] = {
        id: subCategory.id,
        name: subCategory.name,
        parentCategory: subCategory.parentCategory,
      };
    }

    return acc;
  }, {});

  return Object.values(subCategories);
}