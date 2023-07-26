import type { PartsCatalog } from '$lib/types/AppSettings';

export const getPartById = (partsCatalog: PartsCatalog, id: string) => {
  const cosmeticsPart = partsCatalog.cosmetics.find((part) => part.id === id);
  if (cosmeticsPart) return cosmeticsPart;

  const toolsPart = partsCatalog.tools.find((part) => part.id === id);
  if (toolsPart) return toolsPart;

  for(const subtype in partsCatalog.performance)
  {
    const performancePart = partsCatalog.performance[subtype].find((part) => part.id === id);
    if (performancePart) return performancePart;
  }

  return undefined;
};
