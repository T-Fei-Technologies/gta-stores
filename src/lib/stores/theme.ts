import { writable } from 'svelte/store';
import type { Theme } from '$lib/types/Theme';
import { THEMES } from '$lib/consts/themes';

export const theme = writable<Theme>(THEMES['default']);