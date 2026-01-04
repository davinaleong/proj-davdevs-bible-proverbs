'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import translationsData from '../data/translations.json';
import { getCurrentTranslation, updateSetting } from '../helpers/settings';
import { PageHeader, ButtonCard, Badge, InfoBox } from '../components';

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
      <PageHeader 
        title="Select Translation"
        subtitle="Choose your Bible translation, then select a chapter"
      >
        <span className="text-sm text-fg/70">
          {isLoading ? 'Loading...' : 
            `Current: ${translationsData.translations.find(t => t.code === currentTranslation)?.code || currentTranslation}`
          }
        </span>
      </PageHeader>
      
      <div className="space-y-3">
        {translationsData.translations.map((translation) => {
          const isActive = currentTranslation === translation.code;
          
          return (
            <ButtonCard
              key={translation.code}
              onClick={() => selectTranslation(translation.code)}
              isActive={isActive}
              className="w-full"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">{translation.code}</span>
                  <div className="flex flex-col">
                    <span className="text-fg/80 text-sm">{translation.name}</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    {translation.isDefault && (
                      <Badge variant="accent">Default</Badge>
                    )}
                    {isActive && (
                      <Badge variant="active">✓ Selected</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-primary/60">
                →
              </div>
            </ButtonCard>
          );
        })}
      </div>
      
      <InfoBox title="📖 About Translations" icon="">
        <p className="text-sm text-fg/70 leading-relaxed mb-3">
          Your selected translation will become your new favorite and will be used as the default for future visits. 
          Each translation offers a unique perspective on the wisdom of Proverbs.
        </p>
        <ul className="text-xs text-fg/60 space-y-1">
          <li><strong>KJV:</strong> Classic English with traditional language and phrasing</li>
          <li><strong>YLT:</strong> Literal translation maintaining Hebrew word order and meaning</li>
        </ul>
      </InfoBox>
    </div>
  );
}