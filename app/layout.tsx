import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: {
    default: "Dav/Devs Bible Proverbs",
    template: "%s | Dav/Devs Bible Proverbs",
  },
  description: "Read and study the Book of Proverbs with multiple translations and themes. Access KJV, ASV, YLT, Webster's Bible and more with customizable themes.",
  keywords: [
    "Bible",
    "Proverbs", 
    "Scripture",
    "KJV",
    "King James Version",
    "Bible study",
    "Christian",
    "Wisdom",
    "Biblical text",
    "Multiple translations"
  ],
  authors: [{ name: "Davina Leong", url: "https://davinaleong.com" }],
  creator: "Davina Leong",
  publisher: "Dav/Devs",
  category: "Religion & Spirituality",
  metadataBase: new URL("https://bible-proverbs.davdevs.com"),
  openGraph: {
    type: "website",
    title: "Dav/Devs Bible Proverbs",
    description: "Read and study the Book of Proverbs with multiple translations and themes",
    siteName: "Dav/Devs Bible Proverbs",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Dav/Devs Bible Proverbs", 
    description: "Read and study the Book of Proverbs with multiple translations and themes",
    creator: "@davdevs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="davdevs-paper">      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('dav-devs-bible-settings');
                  let settings = {
                    favouriteTheme: 'davdevs-paper',
                    textScale: 'medium'
                  };
                  
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    settings.favouriteTheme = parsed.favouriteTheme || 'davdevs-paper';
                    // Support backward compatibility with textSize
                    if (parsed.textScale) {
                      settings.textScale = parsed.textScale;
                    } else if (parsed.textSize) {
                      // Map old textSize values to new textScale IDs
                      const sizeMap = {
                        'Small': 'small',
                        'Medium': 'medium', 
                        'Large': 'large'
                      };
                      settings.textScale = sizeMap[parsed.textSize] || 'medium';
                    }
                  }
                  
                  // Apply theme
                  document.documentElement.setAttribute('data-theme', settings.favouriteTheme);
                  
                  // Apply text scale
                  const textScaleMap = {
                    'small': '0.9',
                    'medium': '1.0',
                    'large': '1.15',
                    'extra-large': '1.3'
                  };
                  document.documentElement.style.setProperty('--text-scale', textScaleMap[settings.textScale] || '1.0');
                } catch (error) {
                  console.warn('Failed to load settings:', error);
                  document.documentElement.setAttribute('data-theme', 'davdevs-paper');
                  document.documentElement.style.setProperty('--text-scale', '1.0');
                }
              })();
            `,
          }}
        />
      </head>      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 px-4 py-6 mx-auto w-full max-w-4xl">
          {children}
        </main>
        <footer className="text-center py-4 text-xs text-fg/60 border-t border-border">
          <p>Dav/Devs Bible Proverbs © Davina Leong, 2026</p>
          <div className="mt-1 space-x-2">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
