'use client';

import { useEffect } from 'react';
import { loadSettings, applyTextScale } from '../helpers/settings';
import PrivacyContent from '../content/static/privacy.mdx';
import { BackLink, FooterLinks } from '../components';

export default function PrivacyPage() {
  useEffect(() => {
    // Load and apply text settings
    const settings = loadSettings();
    applyTextScale(settings.textScale);
  }, []);

  return (
    <div className="max-w-4xl">
      <BackLink href="/">Back to Home</BackLink>
      
      <article className="chapter-content prose-static">
        <PrivacyContent />
      </article>
      
      <FooterLinks
        className="mt-8"
        links={[
          { href: '/terms', label: 'Terms of Service' },
          { href: '/', label: 'Return to Home' }
        ]}
      />
    </div>
  );
}