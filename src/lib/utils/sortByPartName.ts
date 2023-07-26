import type { Part } from '$lib/types/Part';

export const sortByPartName = (a: Part, b: Part) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;