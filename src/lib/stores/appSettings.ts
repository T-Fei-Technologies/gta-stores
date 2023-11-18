import { writable } from 'svelte/store';
import type { AppSettings } from '$lib/types/AppSettings';

export const appSettings = writable<AppSettings>({
  store: {
    id: '',
    name: '',
    description: '',
    theme: '',
    bg_image: '',
    products_name: '',
  },
  categories: [],
  subCategories: [],
  discount: 0,
  markup: {},
  partsCatalog: [],
});
