/**
 * Settings utilities for the Dav/Devs Bible Proverbs app
 */

export interface AppSettings {
  textSize: 'Small' | 'Medium' | 'Large';
  favouriteTheme: string;
  favouriteTranslation: string;
  dateFormat: string;
  persistSettings: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  textSize: 'Medium',
  favouriteTheme: 'davdevs-paper',
  favouriteTranslation: 'KJV',
  dateFormat: 'dd mmm yyyy',
  persistSettings: true,
};

export const TEXT_SIZE_OPTIONS = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
] as const;

export const THEME_OPTIONS = [
  { value: 'minimal-light', label: 'Simple Light' },
  { value: 'minimal-dark', label: 'Simple Dark' },
  { value: 'davdevs-paper', label: 'Dav/Devs Light' },
  { value: 'davdevs-night', label: 'Dav/Devs Dark' },
  { value: 'rose-devotion', label: 'Pretty Pink' },
  { value: 'classic-editorial', label: 'Professional' },
  { value: 'luxury-dark', label: 'Lamborghini' },
  { value: 'teh-tarik', label: 'Teh Tarik' },
] as const;

export const TRANSLATION_OPTIONS = [
  { value: 'KJV', label: 'KJV (King James Version)' },
  { value: 'YLT', label: 'YLT (Young\'s Literal Translation)' },
  { value: 'WBT', label: 'WBT (Webster\'s Bible Translation)' },
  { value: 'ASV', label: 'ASV (American Standard Version)' },
] as const;

export const DATE_FORMAT_OPTIONS = [
  { value: 'dd mmm yyyy', label: '04 Jan 2026' },
  { value: 'dd/mm/yyyy', label: '04/01/2026' },
  { value: 'mm/dd/yyyy', label: '01/04/2026' },
  { value: 'yyyy-mm-dd', label: '2026-01-04' },
  { value: 'dd mmmm yyyy', label: '4 January 2026' },
  { value: 'mmmm dd, yyyy', label: 'January 4, 2026' },
] as const;

export const PERSIST_SETTINGS_OPTIONS = [
  { value: true, label: 'Save preferences in browser' },
  { value: false, label: 'Reset on each visit' },
] as const;

/**
 * Load settings from localStorage
 */
export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = localStorage.getItem('dav-devs-bible-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all required properties exist with defaults
      return {
        textSize: parsed.textSize || DEFAULT_SETTINGS.textSize,
        favouriteTheme: parsed.favouriteTheme || DEFAULT_SETTINGS.favouriteTheme,
        favouriteTranslation: parsed.favouriteTranslation || DEFAULT_SETTINGS.favouriteTranslation,
        dateFormat: parsed.dateFormat || DEFAULT_SETTINGS.dateFormat,
        persistSettings: parsed.persistSettings !== undefined ? parsed.persistSettings : DEFAULT_SETTINGS.persistSettings,
      };
    }
  } catch (error) {
    console.warn('Failed to load settings from localStorage:', error);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (settings.persistSettings) {
      localStorage.setItem('dav-devs-bible-settings', JSON.stringify(settings));
    } else {
      // If persistSettings is false, remove from localStorage
      localStorage.removeItem('dav-devs-bible-settings');
    }
  } catch (error) {
    console.warn('Failed to save settings to localStorage:', error);
  }
}

/**
 * Reset all settings to defaults
 */
export function resetSettings(): AppSettings {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('dav-devs-bible-settings');
    } catch (error) {
      console.warn('Failed to clear settings from localStorage:', error);
    }
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * Apply theme to document
 */
export function applyTheme(theme: string): void {
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/**
 * Apply text size CSS variable
 */
export function applyTextSize(textSize: 'Small' | 'Medium' | 'Large'): void {
  if (typeof window === 'undefined') {
    return;
  }

  const root = document.documentElement;
  switch (textSize) {
    case 'Small':
      root.style.setProperty('--text-scale', '0.875');
      break;
    case 'Medium':
      root.style.setProperty('--text-scale', '1');
      break;
    case 'Large':
      root.style.setProperty('--text-scale', '1.125');
      break;
  }
}

/**
 * Get current translation from settings or URL
 */
export function getCurrentTranslation(urlTranslation?: string | null): string {
  if (urlTranslation) {
    return urlTranslation;
  }
  
  const settings = loadSettings();
  return settings.favouriteTranslation;
}

/**
 * Update a single setting
 */
export function updateSetting<K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): AppSettings {
  const currentSettings = loadSettings();
  const newSettings = { ...currentSettings, [key]: value };
  saveSettings(newSettings);
  
  // Apply the setting immediately if it affects the UI
  if (key === 'favouriteTheme') {
    applyTheme(value as string);
  } else if (key === 'textSize') {
    applyTextSize(value as 'Small' | 'Medium' | 'Large');
  }
  
  return newSettings;
}