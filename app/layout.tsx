import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "DavDevs Bible Proverbs",
  description: "Read and study the Book of Proverbs with multiple translations and themes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 px-4 py-6">
          {children}
        </main>
        <footer className="text-center py-4 text-xs text-fg/60 border-t border-border">
          <p>DavDevs Bible Proverbs © Davina Leong, 2026</p>
          <div className="mt-1 space-x-2">
            <a href="#" className="hover:text-primary">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
