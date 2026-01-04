'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { loadSettings, applyTextScale } from '../helpers/settings';
import TermsContent from '../content/static/terms.mdx';

export default function TermsPage() {
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
        <TermsContent />
      </article>
      
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex gap-4 justify-center">
          <Link
            href="/privacy"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            Privacy Policy
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