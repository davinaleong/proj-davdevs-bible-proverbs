'use client';

import { useState, useEffect } from 'react';
import translationsData from '../data/translations.json';

export default function TranslationsPage() {
  const [currentTranslation, setCurrentTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load current translation from localStorage on mount
  useEffect(() => {
    const savedTranslation = localStorage.getItem('preferred-translation') || 'KJV';
    setCurrentTranslation(savedTranslation);
    setIsLoading(false);
  }, []);

  // Handle translation switching
  const switchTranslation = (translationCode: string) => {
    setCurrentTranslation(translationCode);
    localStorage.setItem('preferred-translation', translationCode);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Translations</h1>
        <span className="text-sm text-fg/70">
          {isLoading ? 'Loading...' : 
            `Current: ${translationsData.translations.find(t => t.code === currentTranslation)?.code || currentTranslation}`
          }
        </span>
      </header>
      
      <div className="max-w-2xl space-y-2">
        {translationsData.translations.map((translation) => {
          const isActive = currentTranslation === translation.code;
          
          return (
            <button
              key={translation.code}
              onClick={() => switchTranslation(translation.code)}
              className={`
                w-full flex items-center justify-between p-4 text-left 
                border rounded-md transition-all duration-200
                min-h-[var(--tap-target)]
                ${isActive 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-border bg-surface hover:bg-border/20 hover:shadow-sm'
                }
              `}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-base">{translation.code}</span>
                  <span className="text-fg/70">· {translation.name}</span>
                  {translation.isDefault && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      Default
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="max-w-2xl not-visited:mt-8 p-4 bg-surface border border-border rounded-md">
        <h3 className="font-medium mb-2">About Translations</h3>
        <p className="text-sm text-fg/70">
          Your preferred Bible translation is automatically saved to your browser and will persist across sessions. 
          Each translation offers a unique perspective on the sacred text of Proverbs.
        </p>
      </div>
    </div>
  );
}