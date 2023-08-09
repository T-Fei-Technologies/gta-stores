import type { WorksheetItem } from '$lib/types/WorksheetItem';

export const getItemCount = (items: WorksheetItem[]) => {
  return items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
};