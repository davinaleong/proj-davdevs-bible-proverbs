/**
 * Static content utilities for loading MDX pages
 */

export interface StaticContentResult {
  content: any;
  error: string | null;
}

/**
 * Load privacy policy content
 */
export async function loadPrivacyContent(): Promise<StaticContentResult> {
  try {
    const { default: PrivacyContent } = await import('../content/static/privacy.mdx');
    return {
      content: PrivacyContent,
      error: null
    };
  } catch (err) {
    console.error('Error loading privacy content:', err);
    return {
      content: null,
      error: 'Failed to load privacy policy content.'
    };
  }
}

/**
 * Load terms of service content
 */
export async function loadTermsContent(): Promise<StaticContentResult> {
  try {
    const { default: TermsContent } = await import('../content/static/terms.mdx');
    return {
      content: TermsContent,
      error: null
    };
  } catch (err) {
    console.error('Error loading terms content:', err);
    return {
      content: null,
      error: 'Failed to load terms of service content.'
    };
  }
}

/**
 * Generic static content loader
 */
export async function loadStaticContent(contentPath: string): Promise<StaticContentResult> {
  try {
    const { default: Content } = await import(`../content/static/${contentPath}.mdx`);
    return {
      content: Content,
      error: null
    };
  } catch (err) {
    console.error(`Error loading static content: ${contentPath}`, err);
    return {
      content: null,
      error: `Failed to load ${contentPath} content.`
    };
  }
}