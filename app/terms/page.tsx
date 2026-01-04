'use client';

import { useEffect } from 'react';
import { loadSettings, applyTextScale } from '../helpers/settings';
import TermsContent from '../content/static/terms.mdx';
import { BackLink, FooterLinks } from '../components';

export default function TermsPage() {
  useEffect(() => {
    // Load and apply text settings
    const settings = loadSettings();
    applyTextScale(settings.textScale);
  }, []);

  return (
    <div className="max-w-4xl">
      <BackLink href="/">Back to Home</BackLink>
      
      <article className="chapter-content prose-static">
        <TermsContent />
      </article>
      
      <FooterLinks
        className="mt-8"
        links={[
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/', label: 'Return to Home' }
        ]}
      />
    </div>
  );
}