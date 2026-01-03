'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Today', href: '/' },
  { label: 'Translations', href: '/translations' },
  { label: 'Themes', href: '/themes' },
  { label: 'Settings', href: '/settings' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-surface">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-6 py-4 text-sm font-medium border-b-2 transition-colors
                min-h-[var(--tap-target)]
                ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-fg/70 hover:text-fg hover:border-border'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}