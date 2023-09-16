import { appSettings } from '$lib/stores/appSettings';
import { defaultAppSettings } from '$lib/consts/defaultAppSettings';
import { get } from 'svelte/store';

export const SETTINGS_DEBOUNCE_MS = 1500;

export const loadSettings = async () => {
  // Try fetching prices from API
  const fetchedSettings = await fetch(`/settings.json`, { cache: 'no-cache' });

  if (fetchedSettings.ok) {
    const fetchedSettingsJson = await fetchedSettings.json();
    appSettings.set({ ...defaultAppSettings, ...fetchedSettingsJson });
    return;
  }

  if (!fetchedSettings.ok) {
    const fetchedDefaultSettings = await fetch(`/default-settings.json`);

    if (fetchedDefaultSettings.ok) {
      const fetchedDefaultSettingsJson = await fetchedDefaultSettings.json();
      appSettings.set({ ...defaultAppSettings, ...fetchedDefaultSettingsJson });
      return;
    }

    if (!fetchedDefaultSettings.ok) {
      // Throw error if we can't fetch from API
    }
  }
};

export const loadDefaultSettings = async () => {
  // Try fetching prices from API
  const fetchedSettings = await fetch(`/default-settings.json`);

  if (fetchedSettings.ok) {
    const fetchedSettingsJson = await fetchedSettings.json();
    appSettings.set({ ...defaultAppSettings, ...fetchedSettingsJson });
    return;
  }

  if (!fetchedSettings.ok) {
    // Throw error if we can't fetch from API
  }
};

export const saveAppSettings = () => {
  const jsonAppSettings = JSON.stringify(null);
  localStorage.setItem('userSettings', jsonAppSettings);
};

export const saveManagementSettings = async () => {
  const settings = get(appSettings);
  const jsonAppSettings = JSON.stringify({
    markup: settings.markup,
    partsCatalog: settings.partsCatalog,
  });

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

export const clearStorage = async (loadDefault: boolean) => {
  localStorage.clear();
  loadDefault ? await loadDefaultSettings() : await loadSettings();
};
