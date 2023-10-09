import { pb } from '$lib/pocketbase';

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  console.log('Auth store changed: ', pb.authStore.model);
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});
