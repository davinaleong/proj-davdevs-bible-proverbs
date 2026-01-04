'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { loadSettings, applyTextScale } from '../helpers/settings';
import PrivacyContent from '../content/static/privacy.mdx';

export default function PrivacyPage() {
  useEffect(() => {
    // Load and apply text settings
    const settings = loadSettings();
    applyTextScale(settings.textScale);
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-primary hover:text-primary/80 transition-colors text-sm"
        >
          ← Back to Home
        </Link>
      </div>
      
      <article className="chapter-content prose-static">
        <PrivacyContent />
      </article>
      
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex gap-4 justify-center">
          <Link
            href="/terms"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            Terms of Service
          </Link>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}