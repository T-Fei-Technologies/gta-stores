import type { LoadEvent } from '@sveltejs/kit';
import { appSettings } from '$lib/stores/appSettings';

export const load = ({ data }: LoadEvent) => {
  appSettings.set(data?.appSettings);

  return {
    user: data?.user,
  };
};
