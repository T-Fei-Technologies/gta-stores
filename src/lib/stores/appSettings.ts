import { writable } from 'svelte/store';
import type { AppSettings } from '$lib/types/AppSettings';

export const appSettings = writable<AppSettings>({
  categories: [],
  subCategories: [],
  discount: 0,
  markup: {},
  partsCatalog: [],
});
