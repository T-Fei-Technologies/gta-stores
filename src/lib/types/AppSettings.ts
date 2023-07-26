import type { Part } from '$lib/types/Part';

export type PartsCatalog = {
  cosmetics: Part[];
  performance: { [key: string]: Part[] };
  tools: Part[];
};

export type AppSettings = {
  markup: {
    cosmetics: number;
    performance: number;
    tools: number;
  };
  discount: number;
  partsCatalog: PartsCatalog;
}
