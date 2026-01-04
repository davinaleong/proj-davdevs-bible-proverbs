/**
 * Bible API service for bible-api.com integration
 */

export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note?: string;
}

export interface BibleApiResponse {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note?: string;
}

/**
 * Fetch a chapter of Proverbs from bible-api.com
 */
export async function fetchProverbsChapter(
  translation: string = 'web',
  chapter: number
): Promise<{ content: BibleChapter | null; error: string | null }> {
  try {
    // Validate chapter number
    if (chapter < 1 || chapter > 31) {
      return {
        content: null,
        error: `Invalid chapter number: ${chapter}. Proverbs has 31 chapters.`
      };
    }

    // Construct the API URL for Proverbs chapter
    const url = `https://bible-api.com/data/${translation.toLowerCase()}/PRO/${chapter}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: BibleApiResponse = await response.json();
    
    return {
      content: {
        reference: data.reference,
        verses: data.verses,
        text: data.text,
        translation_id: data.translation_id,
        translation_name: data.translation_name,
        translation_note: data.translation_note
      },
      error: null
    };

  } catch (error) {
    console.error('Error fetching Bible chapter:', error);
    
    return {
      content: null,
      error: error instanceof Error ? error.message : 'Failed to fetch Bible chapter'
    };
  }
}

/**
 * Fetch a random verse from Proverbs for today's Proverb of the Day
 */
export async function fetchTodaysProverb(
  translation: string = 'web'
): Promise<{ content: BibleVerse | null; error: string | null }> {
  try {
    // Get today's chapter (based on day of month, 1-31)
    const today = new Date();
    const todaysChapter = today.getDate();
    
    // Fetch the full chapter
    const chapterResult = await fetchProverbsChapter(translation, todaysChapter);
    
    if (chapterResult.error || !chapterResult.content) {
      return {
        content: null,
        error: chapterResult.error || 'Failed to fetch today\'s proverb'
      };
    }

    // Return the first verse of today's chapter as the "Proverb of the Day"
    const firstVerse = chapterResult.content.verses[0];
    
    if (!firstVerse) {
      return {
        content: null,
        error: 'No verses found in today\'s chapter'
      };
    }

    return {
      content: firstVerse,
      error: null
    };

  } catch (error) {
    console.error('Error fetching today\'s proverb:', error);
    
    return {
      content: null,
      error: error instanceof Error ? error.message : 'Failed to fetch today\'s proverb'
    };
  }
}

/**
 * Get available translations from the API
 */
export async function fetchAvailableTranslations(): Promise<{ translations: string[]; error: string | null }> {
  try {
    const response = await fetch('https://bible-api.com/data', {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      translations: Array.isArray(data) ? data : Object.keys(data),
      error: null
    };

  } catch (error) {
    console.error('Error fetching available translations:', error);
    
    return {
      translations: [],
      error: error instanceof Error ? error.message : 'Failed to fetch translations'
    };
  }
}