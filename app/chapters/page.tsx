'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import translationsData from '../data/translations.json';

export default function ChaptersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentTranslation, setCurrentTranslation] = useState<string>('');

  // Get translation from URL params or localStorage
  useEffect(() => {
    const urlTranslation = searchParams.get('translation');
    const savedTranslation = localStorage.getItem('preferred-translation') || 'KJV';
    const translation = urlTranslation || savedTranslation;
    setCurrentTranslation(translation);
  }, [searchParams]);

  // Generate array of 31 chapters (Proverbs has 31 chapters)
  const chapters = Array.from({ length: 31 }, (_, i) => i + 1);

  const currentTranslationName = translationsData.translations.find(
    t => t.code === currentTranslation
  )?.name || currentTranslation;

  const handleChapterClick = (chapterNumber: number) => {
    // Save selected translation and navigate to chapter
    localStorage.setItem('preferred-translation', currentTranslation);
    router.push(`/?translation=${currentTranslation}&chapter=${chapterNumber}`);
  };

  return (
    <div className="max-w-4xl">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Select Chapter</h1>
          <p className="text-sm text-fg/70 mt-1">{currentTranslationName} ({currentTranslation})</p>
        </div>
        <Link
          href="/translations"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Change Translation
        </Link>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => handleChapterClick(chapter)}
            className="
              aspect-square flex items-center justify-center
              border border-border rounded-md bg-surface 
              hover:bg-border/20 hover:shadow-sm transition-all duration-200
              text-lg font-medium
              min-h-[var(--tap-target)]
            "
          >
            {chapter}
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-surface border border-border rounded-md">
        <h3 className="font-medium mb-2">Book of Proverbs</h3>
        <p className="text-sm text-fg/70">
          The Book of Proverbs contains 31 chapters of wisdom literature. 
          Select a chapter above to read the verses in your preferred translation.
        </p>
      </div>
    </div>
  );
}