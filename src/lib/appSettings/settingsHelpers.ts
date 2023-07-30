import { appSettings } from '$lib/stores/appSettings';
import { defaultAppSettings } from '$lib/consts/defaultAppSettings';
import { get } from 'svelte/store';

export const loadSettings = async () => {
  // Try fetching prices from API
  const fetchedSettings = await fetch(`/settings.json`);

  if (fetchedSettings.ok) {
    const fetchedSettingsJson = await fetchedSettings.json();
    localStorage.setItem('appSettings', JSON.stringify(fetchedSettingsJson));
    appSettings.set(fetchedSettingsJson);
    return;
  }

  if (!fetchedSettings.ok) {
    // Fetch the appSettings catalog from local storage
    const storedSettings = localStorage.getItem('appSettings');

    // If the app settings exist, use them or create a new one from our seed data
    if (!storedSettings) {
      localStorage.setItem('appSettings', JSON.stringify(defaultAppSettings));
      appSettings.set(defaultAppSettings);
    } else {
      appSettings.set(JSON.parse(storedSettings));
    }
  }
};

export const saveSettings = async () => {
  const jsonAppSettings = JSON.stringify(get(appSettings));

  localStorage.setItem('appSettings', jsonAppSettings);

  try {
    await fetch(`/management`, {
      method: 'POST',
      body: jsonAppSettings,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    alert('Error saving settings: ' + error);
  }
};

export const clearStorage = async () => {
  localStorage.clear();
  await loadSettings();
};