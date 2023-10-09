import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = ({ setHeaders }: ServerLoadEvent) => {
  setHeaders({
    'cache-control': 'public, max-age=3600',
  });
};
