/**
 * Bible API content loader utility for the Dav/Devs Bible Proverbs app
 */

import { fetchProverbsChapter, BibleChapter } from './bible-api';

export interface ChapterContent {
  content: BibleChapter | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Load Bible content for a specific translation and chapter using bible-api.com
 */
export async function loadChapterContent(
  translation: string, 
  chapter: number
): Promise<{ content: BibleChapter | null; error: string | null }> {
  // Use the Bible API to fetch content
  return await fetchProverbsChapter(translation, chapter);
}

/**
 * Check if a chapter exists for a given translation (all Proverbs chapters 1-31 exist)
 */
export async function checkChapterExists(
  translation: string, 
  chapter: number
): Promise<boolean> {
  return chapter >= 1 && chapter <= 31;
}

/**
 * Get all available chapters for a translation (Proverbs has 31 chapters)
 */
export async function getAvailableChapters(translation: string): Promise<number[]> {
  return Array.from({ length: 31 }, (_, i) => i + 1);
}

/**
 * Preload the next chapter for better UX
 */
export function preloadNextChapter(translation: string, currentChapter: number): void {
  if (currentChapter < 31) {
    // Preload next chapter in background
    fetchProverbsChapter(translation, currentChapter + 1)
      .catch(() => {
        // Silently ignore preload failures
      });
  }
}

/**
 * Preload the previous chapter for better UX
 */
export function preloadPreviousChapter(translation: string, currentChapter: number): void {
  if (currentChapter > 1) {
    // Preload previous chapter in background
    fetchProverbsChapter(translation, currentChapter - 1)
      .catch(() => {
        // Silently ignore preload failures
      });
  }
}

/**
 * Get chapter navigation info
 */
export interface ChapterNavigation {
  hasPrevious: boolean;
  hasNext: boolean;
  previousChapter?: number;
  nextChapter?: number;
}

export function getChapterNavigation(currentChapter: number): ChapterNavigation {
  return {
    hasPrevious: currentChapter > 1,
    hasNext: currentChapter < 31,
    previousChapter: currentChapter > 1 ? currentChapter - 1 : undefined,
    nextChapter: currentChapter < 31 ? currentChapter + 1 : undefined,
  };
}