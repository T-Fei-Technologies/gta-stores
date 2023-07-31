import { appSettings } from '$lib/stores/appSettings';
import { defaultAppSettings } from '$lib/consts/defaultAppSettings';
import { get } from 'svelte/store';

export const SETTINGS_DEBOUNCE_MS = 1500;

export const loadSettings = async () => {
  // Try fetching prices from API
  const fetchedSettings = await fetch(`/settings.json`, { cache: 'no-cache' });

  if (fetchedSettings.ok) {
    const fetchedSettingsJson = await fetchedSettings.json();
    localStorage.setItem('appSettings', JSON.stringify(fetchedSettingsJson));
    appSettings.set({ ...defaultAppSettings, ...fetchedSettingsJson });
    return;
  }

  if (!fetchedSettings.ok) {
    // Fetch the appSettings catalog from local storage
    const storedSettings = localStorage.getItem('appSettings');

    // If the app settings exist, use them or create a new one from our seed data
    if (!storedSettings) {
      // Try fetching default prices from API
      const fetchedDefaultSettings = await fetch(`/default-settings.json`);

      if (fetchedDefaultSettings.ok) {
        const fetchedDefaultSettingsJson = await fetchedDefaultSettings.json();
        localStorage.setItem('appSettings', JSON.stringify(fetchedDefaultSettingsJson));
        appSettings.set({ ...defaultAppSettings, ...fetchedDefaultSettingsJson });
        return;
      }

      if (!fetchedDefaultSettings.ok) {
        localStorage.setItem('appSettings', JSON.stringify(defaultAppSettings));
      }

      appSettings.set(defaultAppSettings);
    } else {
      appSettings.set({ ...defaultAppSettings, ...JSON.parse(storedSettings) });
    }
  }
};

export const loadDefaultSettings = async () => {
  // Try fetching prices from API
  const fetchedSettings = await fetch(`/default-settings.json`);

  if (fetchedSettings.ok) {
    const fetchedSettingsJson = await fetchedSettings.json();
    localStorage.setItem('appSettings', JSON.stringify(fetchedSettingsJson));
    appSettings.set({ ...defaultAppSettings, ...fetchedSettingsJson });
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

export const saveAppSettings = () => {
  const jsonAppSettings = JSON.stringify(get(appSettings));
  localStorage.setItem('appSettings', jsonAppSettings);
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