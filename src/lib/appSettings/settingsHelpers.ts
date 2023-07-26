import { appSettings } from '$lib/stores/appSettings';
import { defaultAppSettings } from '$lib/consts/defaultAppSettings';
import { get } from 'svelte/store';

export const loadSettings = () => {
  // Fetch the appSettings catalog from local storage
  const storedSettings = localStorage.getItem('appSettings');

  // If the app settings exist, use them or create a new one from our seed data
  if (!storedSettings) {
    localStorage.setItem('appSettings', JSON.stringify(defaultAppSettings));
    appSettings.set(defaultAppSettings);
  } else {
    appSettings.set(JSON.parse(storedSettings));
  }
};

export const saveSettings = () => {
  localStorage.setItem('appSettings', JSON.stringify(get(appSettings)));
};