/**
 * MDX content loader utility for the Dav/Devs Bible Proverbs app
 */

import { ReactElement } from 'react';

export interface ChapterContent {
  content: ReactElement | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Load MDX content for a specific translation and chapter
 */
export async function loadChapterContent(
  translation: string, 
  chapter: number
): Promise<{ content: ReactElement | null; error: string | null }> {
  try {
    // Validate chapter number
    if (chapter < 1 || chapter > 31) {
      return {
        content: null,
        error: `Invalid chapter number: ${chapter}. Proverbs has 31 chapters.`
      };
    }

    // Try to dynamically import the MDX file
    const chapterModule = await import(`../content/${translation}/chapter-${chapter}.mdx`);
    
    // MDX files export a default component
    const ContentComponent = chapterModule.default;
    
    if (!ContentComponent) {
      return {
        content: null,
        error: `Chapter ${chapter} content not found for ${translation} translation.`
      };
    }

    // Return the React component
    return {
      content: ContentComponent({}),
      error: null
    };
    
  } catch (error) {
    console.error(`Error loading chapter ${chapter} for ${translation}:`, error);
    
    // Check if it's a module not found error
    if (error instanceof Error && error.message.includes('Cannot resolve module')) {
      return {
        content: null,
        error: `Chapter ${chapter} is not available for ${translation} translation.`
      };
    }
    
    return {
      content: null,
      error: `Failed to load chapter ${chapter} for ${translation} translation.`
    };
  }
}

/**
 * Check if a chapter exists for a given translation
 */
export async function checkChapterExists(
  translation: string, 
  chapter: number
): Promise<boolean> {
  try {
    await import(`../content/${translation}/chapter-${chapter}.mdx`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all available chapters for a translation
 */
export async function getAvailableChapters(translation: string): Promise<number[]> {
  const chapters: number[] = [];
  
  // Check chapters 1-31
  for (let i = 1; i <= 31; i++) {
    if (await checkChapterExists(translation, i)) {
      chapters.push(i);
    }
  }
  
  return chapters;
}

/**
 * Preload the next chapter for better UX
 */
export function preloadNextChapter(translation: string, currentChapter: number): void {
  if (currentChapter < 31) {
    // Use dynamic import to preload
    import(`../content/${translation}/chapter-${currentChapter + 1}.mdx`)
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
    // Use dynamic import to preload
    import(`../content/${translation}/chapter-${currentChapter - 1}.mdx`)
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