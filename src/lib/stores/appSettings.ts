import { writable } from 'svelte/store';
import type { AppSettings } from '$lib/types/AppSettings';
import { defaultAppSettings } from '$lib/consts/defaultAppSettings';

export const appSettings = writable<AppSettings>(defaultAppSettings);
