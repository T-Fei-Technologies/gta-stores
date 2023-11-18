import { writable } from 'svelte/store';
import type { AppSettings } from '$lib/types/AppSettings';

export const appSettings = writable<AppSettings>({
  store: {
    id:             '',
    name:           '',
    description:    '',
    theme:          '',
    bg_image:       '',
    products_name:  '',
    worksheet_name: '',
    billing_key:    '',
    bg_image_url:   '',
    favicon:        '',
    favicon_url:    '',
  },
  categories: [],
  subCategories: [],
  discount: 0,
  markup: {},
  partsCatalog: [],
});
