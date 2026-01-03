// Data helpers for accessing JSON files in the data directory

import dateFormatsData from '../data/dateFormats.json';
import textScalesData from '../data/textScales.json';
import themesData from '../data/themes.json';
import translationsData from '../data/translations.json';

// Types
export interface DateFormat {
  id: string;
  name: string;
  format: string;
  example: string;
  isDefault?: boolean;
}

export interface TextScale {
  id: string;
  name: string;
  scale: number;
  description: string;
  isDefault?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
}

export interface Translation {
  code: string;
  name: string;
  isDefault?: boolean;
}

// Date Format Helpers
export const getDateFormats = (): DateFormat[] => {
  return dateFormatsData.dateFormats;
};

export const getDefaultDateFormat = (): DateFormat | undefined => {
  return dateFormatsData.dateFormats.find(format => format.isDefault);
};

export const getDateFormatById = (id: string): DateFormat | undefined => {
  return dateFormatsData.dateFormats.find(format => format.id === id);
};

// Text Scale Helpers
export const getTextScales = (): TextScale[] => {
  return textScalesData.textScales;
};

export const getDefaultTextScale = (): TextScale | undefined => {
  return textScalesData.textScales.find(scale => scale.isDefault);
};

export const getTextScaleById = (id: string): TextScale | undefined => {
  return textScalesData.textScales.find(scale => scale.id === id);
};

// Theme Helpers
export const getThemes = (): Theme[] => {
  return themesData.themes;
};

export const getDefaultTheme = (): Theme | undefined => {
  return themesData.themes.find(theme => theme.isDefault);
};

export const getThemeById = (id: string): Theme | undefined => {
  return themesData.themes.find(theme => theme.id === id);
};

export const getThemesByCategory = (categoryName: string): Theme[] => {
  const category = themesData.categories.find(cat => cat.name === categoryName);
  if (!category) return [];
  
  return category.themes
    .map(themeId => getThemeById(themeId))
    .filter((theme): theme is Theme => theme !== undefined);
};

export const getThemeCategories = () => {
  return themesData.categories;
};

// Format date using selected format
export const formatDate = (date: Date, formatId?: string): string => {
  const dateFormat = formatId ? getDateFormatById(formatId) : getDefaultDateFormat();
  
  if (!dateFormat) {
    // Fallback to default format
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Simple date formatting - in a real app you might use a library like date-fns
  const formatMap: Record<string, string> = {
    'dd': date.getDate().toString().padStart(2, '0'),
    'd': date.getDate().toString(),
    'MMM': date.toLocaleDateString('en-US', { month: 'short' }),
    'MMMM': date.toLocaleDateString('en-US', { month: 'long' }),
    'MM': (date.getMonth() + 1).toString().padStart(2, '0'),
    'yyyy': date.getFullYear().toString(),
    'EEEE': date.toLocaleDateString('en-US', { weekday: 'long' })
  };

  let formattedDate = dateFormat.format;
  Object.entries(formatMap).forEach(([key, value]) => {
    formattedDate = formattedDate.replace(new RegExp(key, 'g'), value);
  });

  return formattedDate;
};

// Apply text scale to CSS
export const applyTextScale = (scaleId?: string): number => {
  const textScale = scaleId ? getTextScaleById(scaleId) : getDefaultTextScale();
  return textScale?.scale ?? 1.0;
};

// Translation Helpers
export const getTranslations = (): Translation[] => {
  return translationsData.translations;
};

export const getDefaultTranslation = (): Translation | undefined => {
  return translationsData.translations.find(translation => translation.isDefault);
};

export const getTranslationByCode = (code: string): Translation | undefined => {
  return translationsData.translations.find(translation => translation.code === code);
};

// Get today's Proverb chapter based on date
export const getTodaysProverbChapter = (): number => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  // Ensure chapter is between 1-31 (Proverbs has 31 chapters)
  return Math.min(dayOfMonth, 31);
};