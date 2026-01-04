'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import translationsData from '../data/translations.json';
import { getCurrentChapter } from '../helpers/date';
import { getCurrentTranslation, updateSetting } from '../helpers/settings';

export default function ChaptersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentTranslation, setCurrentTranslation] = useState<string>('');

  // Get translation from URL params or settings
  useEffect(() => {
    const urlTranslation = searchParams.get('translation');
    const translation = getCurrentTranslation(urlTranslation);
    setCurrentTranslation(translation);
  }, [searchParams]);

  // Generate array of 31 chapters (Proverbs has 31 chapters)
  const chapters = Array.from({ length: 31 }, (_, i) => i + 1);
  const todaysChapter = getCurrentChapter();

  const currentTranslationName = translationsData.translations.find(
    t => t.code === currentTranslation
  )?.name || currentTranslation;

  const handleChapterClick = (chapterNumber: number) => {
    // Update settings to save the selected translation as favorite
    updateSetting('favouriteTranslation', currentTranslation);
    
    // Navigate back to home with the selected chapter loaded
    router.push(`/?translation=${currentTranslation}&chapter=${chapterNumber}`);
  };

  const goToTodaysChapter = () => {
    handleChapterClick(todaysChapter);
  };

  return (
    <div className="max-w-4xl">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Select Chapter</h1>
          <p className="text-sm text-fg/70 mt-1">{currentTranslationName} ({currentTranslation})</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={goToTodaysChapter}
            className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
          >
            📅 Today's Chapter ({todaysChapter})
          </button>
          <Link
            href="/translations"
            className="text-sm text-primary hover:text-primary/80 transition-colors underline"
          >
            Change Translation
          </Link>
        </div>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 mb-6">
        {chapters.map((chapter) => {
          const isToday = chapter === todaysChapter;
          
          return (
            <button
              key={chapter}
              onClick={() => handleChapterClick(chapter)}
              className={`
                aspect-square flex items-center justify-center relative
                border rounded-lg transition-all duration-200
                text-lg font-semibold min-h-[var(--tap-target)]
                ${isToday 
                  ? 'border-primary bg-primary/10 text-primary shadow-md ring-2 ring-primary/20' 
                  : 'border-border bg-surface hover:bg-border/20 hover:shadow-sm hover:border-primary/30'
                }
              `}
            >
              {chapter}
              {isToday && (
                <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-surface border border-border rounded-lg">
        <h3 className="font-medium mb-2">📜 Book of Proverbs</h3>
        <p className="text-sm text-fg/70 leading-relaxed mb-3">
          The Book of Proverbs contains 31 chapters of divine wisdom and practical guidance for daily living. 
          Select any chapter to read the verses, or choose today's chapter for your daily reading.
        </p>
        <div className="text-xs text-fg/60 space-y-1">
          <p><strong>Today's Chapter:</strong> Chapter {todaysChapter} (automatically selected based on today's date)</p>
          <p><strong>Translation:</strong> Your selection will be saved as your preferred translation</p>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          onClick={goToTodaysChapter}
          className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors font-medium"
        >
          📅 Go to Today's Chapter ({todaysChapter})
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-border/20 rounded-lg hover:bg-border/30 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}