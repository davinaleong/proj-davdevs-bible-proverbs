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
                const savedTheme = localStorage.getItem('preferred-theme') || 'davdevs-paper';
                document.documentElement.setAttribute('data-theme', savedTheme);
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
