'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import translationsData from '../data/translations.json';
import { getCurrentTranslation, updateSetting } from '../helpers/settings';

export default function TranslationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTranslation, setCurrentTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load current translation from settings on mount
  useEffect(() => {
    const translation = getCurrentTranslation(searchParams.get('translation'));
    setCurrentTranslation(translation);
    setIsLoading(false);
  }, [searchParams]);

  // Handle translation selection and navigate to chapters selection
  const selectTranslation = (translationCode: string) => {
    setCurrentTranslation(translationCode);
    
    // Update settings to save the preferred translation
    updateSetting('favouriteTranslation', translationCode);
    
    // Navigate to chapters page with selected translation
    router.push(`/chapters?translation=${translationCode}`);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Select Translation</h1>
          <p className="text-sm text-fg/70 mt-1">Choose your Bible translation, then select a chapter</p>
        </div>
        <span className="text-sm text-fg/70">
          {isLoading ? 'Loading...' : 
            `Current: ${translationsData.translations.find(t => t.code === currentTranslation)?.code || currentTranslation}`
          }
        </span>
      </header>
      
      <div className="space-y-3">
        {translationsData.translations.map((translation) => {
          const isActive = currentTranslation === translation.code;
          
          return (
            <button
              key={translation.code}
              onClick={() => selectTranslation(translation.code)}
              className={`
                w-full flex items-center justify-between p-4 text-left 
                border rounded-sm transition-all duration-200
                min-h-[var(--tap-target)]
                ${isActive 
                  ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20' 
                  : 'border-border bg-surface hover:bg-border/20 hover:shadow-sm hover:border-primary/30'
                }
              `}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">{translation.code}</span>
                  <div className="flex flex-col">
                    <span className="text-fg/80 text-sm">{translation.name}</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    {translation.isDefault && (
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                        Default
                      </span>
                    )}
                    {isActive && (
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-primary/60">
                →
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-surface border border-border rounded-sm">
        <h3 className="font-medium mb-2">📖 About Translations</h3>
        <p className="text-sm text-fg/70 leading-relaxed mb-3">
          Your selected translation will become your new favorite and will be used as the default for future visits. 
          Each translation offers a unique perspective on the wisdom of Proverbs.
        </p>
        <ul className="text-xs text-fg/60 space-y-1">
          <li><strong>KJV:</strong> Classic English with traditional language and phrasing</li>
          <li><strong>YLT:</strong> Literal translation maintaining Hebrew word order and meaning</li>
        </ul>
      </div>
    </div>
  );
}