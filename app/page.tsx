'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import translationsData from './data/translations.json';

// Loading component for suspense
function ChapterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentTranslation, setCurrentTranslation] = useState<string>('');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Get translation and chapter from URL params or localStorage
  useEffect(() => {
    const urlTranslation = searchParams.get('translation');
    const urlChapter = searchParams.get('chapter');
    const savedTranslation = localStorage.getItem('preferred-translation') || 'KJV';
    
    const translation = urlTranslation || savedTranslation;
    const chapter = urlChapter ? parseInt(urlChapter) : 1;
    
    setCurrentTranslation(translation);
    setCurrentChapter(chapter);
    
    // Load content
    loadChapterContent(translation, chapter);
  }, [searchParams]);

  const loadChapterContent = async (translation: string, chapter: number) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Try to import the MDX file
      const chapterFile = await import(`./content/${translation}/chapter-${chapter}.mdx`);
      
      // For now, we'll show a placeholder since we can't easily render MDX dynamically
      // In a real implementation, you'd use an MDX parser or have pre-built content
      const translationInfo = translationsData.translations.find(t => t.code === translation);
      setContent(`Content for Proverbs Chapter ${chapter} (${translationInfo?.name || translation}) would be loaded here from the MDX file.`);
      
    } catch (err) {
      console.error('Error loading chapter:', err);
      setError(`Chapter ${chapter} not found for ${translation} translation.`);
    } finally {
      setIsLoading(false);
    }
  };

  const todaysDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short', 
    year: 'numeric'
  });

  const translationInfo = translationsData.translations.find(t => t.code === currentTranslation);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">Loading Proverbs {currentChapter}...</div>
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
          <Link
            href={`/chapters?translation=${currentTranslation}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Select Chapter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Proverbs {currentChapter}</h1>
          <p className="text-sm text-fg/70 mt-1">{translationInfo?.name} ({currentTranslation})</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-fg/70">{todaysDate}</span>
          <div className="flex gap-2">
            <Link
              href="/translations"
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
            >
              Translations
            </Link>
            <Link
              href={`/chapters?translation=${currentTranslation}`}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
            >
              Chapters
            </Link>
          </div>
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <div className="mb-4 p-4 bg-surface border border-border rounded-md">
          <p className="text-sm text-fg/70 mb-2">
            <strong>Note:</strong> This is a placeholder implementation.
          </p>
          <p className="leading-relaxed">
            {content}
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-surface border border-border rounded-md">
          <h3 className="font-medium mb-2">Navigation</h3>
          <div className="flex gap-2 flex-wrap">
            {currentChapter > 1 && (
              <Link
                href={`/?translation=${currentTranslation}&chapter=${currentChapter - 1}`}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
              >
                ← Chapter {currentChapter - 1}
              </Link>
            )}
            {currentChapter < 31 && (
              <Link
                href={`/?translation=${currentTranslation}&chapter=${currentChapter + 1}`}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
              >
                Chapter {currentChapter + 1} →
              </Link>
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
