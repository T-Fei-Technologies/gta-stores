import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const getAvatarUrl = (userId: string, avatarPath: string) => {
  return `${PUBLIC_POCKETBASE_URL}/api/files/users/${userId}/${avatarPath}`;
}
