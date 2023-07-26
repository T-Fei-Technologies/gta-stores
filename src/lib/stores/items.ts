import { writable } from 'svelte/store';
import type { WorksheetItem } from '$lib/types/WorksheetItem';

export const items = writable<WorksheetItem[]>([]);
