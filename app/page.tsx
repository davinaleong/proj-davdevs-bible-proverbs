'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import translationsData from './data/translations.json';
import { getCurrentChapter, getProverbDescription, formatDate } from './helpers/date';
import { loadSettings, getCurrentTranslation } from './helpers/settings';
import { loadChapterContent, getChapterNavigation, preloadNextChapter, preloadPreviousChapter } from './helpers/content';

// Loading component for suspense
function ChapterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentTranslation, setCurrentTranslation] = useState<string>('');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isToday, setIsToday] = useState<boolean>(false);

  // Get translation and chapter from URL params, settings, or defaults
  useEffect(() => {
    const urlTranslation = searchParams.get('translation');
    const urlChapter = searchParams.get('chapter');
    
    const translation = getCurrentTranslation(urlTranslation);
    const chapter = urlChapter ? parseInt(urlChapter) : getCurrentChapter();
    const todaysChapter = getCurrentChapter();
    
    setCurrentTranslation(translation);
    setCurrentChapter(chapter);
    setIsToday(chapter === todaysChapter);
    
    // Load content
    loadChapterContentAsync(translation, chapter);
    
    // Preload adjacent chapters for better UX
    preloadNextChapter(translation, chapter);
    preloadPreviousChapter(translation, chapter);
  }, [searchParams]);

  const loadChapterContentAsync = async (translation: string, chapter: number) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await loadChapterContent(translation, chapter);
      
      if (result.error) {
        setError(result.error);
        setContent(null);
      } else {
        setContent(result.content);
        setError('');
      }
      
    } catch (err) {
      console.error('Error loading chapter:', err);
      setError(`Failed to load Chapter ${chapter} for ${translation} translation.`);
      setContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = loadSettings();
  const todaysDate = formatDate(new Date(), settings.dateFormat);
  const translationInfo = translationsData.translations.find(t => t.code === currentTranslation);
  const navigation = getChapterNavigation(currentChapter);

  const goToToday = () => {
    const todaysChapter = getCurrentChapter();
    router.push(`/?translation=${currentTranslation}&chapter=${todaysChapter}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">Loading {getProverbDescription(currentChapter)}...</div>
          <div className="text-sm text-fg/70">{translationInfo?.name}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-lg font-medium mb-2 text-danger">{error}</div>
        <div className="space-x-4 mt-4">
          <Link
            href="/translations"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Select Translation
          </Link>
          <button
            onClick={goToToday}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Go to Today's Proverb
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Today's Proverb</h1>
          <p className="text-sm text-fg/70 mt-1">{translationInfo?.name} ({currentTranslation})</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-fg/70">{todaysDate}</span>
          <div className="flex gap-2">
            {!isToday && (
              <button
                onClick={goToToday}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
              >
                Today
              </button>
            )}
            <Link
              href="/translations"
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
            >
              Translations
            </Link>
          </div>
        </div>
      </header>
      
      <div className="max-w-none" style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.7' }}>
        {content ? (
          <div className="chapter-content space-y-4">
            {content}
          </div>
        ) : (
          <div className="mb-4 p-4 bg-surface border border-border rounded-md">
            <p className="mb-2" style={{ fontSize: 'var(--font-size-base)' }}>
              <strong>Note:</strong> MDX content loading not yet implemented.
            </p>
            <p className="leading-relaxed" style={{ fontSize: 'var(--font-size-lg)' }}>
              Content for Proverbs Chapter {currentChapter} ({translationInfo?.name || currentTranslation}) would be rendered here from the MDX file.
            </p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-surface border border-border rounded-md">
          <h3 className="font-medium mb-2">Navigation</h3>
          <div className="flex gap-2 flex-wrap">
            {navigation.hasPrevious && (
              <Link
                href={`/?translation=${currentTranslation}&chapter=${navigation.previousChapter}`}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
              >
                ← Chapter {navigation.previousChapter}
              </Link>
            )}
            {navigation.hasNext && (
              <Link
                href={`/?translation=${currentTranslation}&chapter=${navigation.nextChapter}`}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
              >
                Chapter {navigation.nextChapter} →
              </Link>
            )}
            {!isToday && (
              <button
                onClick={goToToday}
                className="text-xs px-3 py-1 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors ml-2"
              >
                📅 Go to Today's Proverb (Chapter {getCurrentChapter()})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </div>
    }>
      <ChapterContent />
    </Suspense>
  );
}
