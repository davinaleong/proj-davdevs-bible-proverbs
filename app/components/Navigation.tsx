'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const leftNavItems = [
  { label: 'Today', href: '/' },
  { label: 'Translations', href: '/translations' },
  { label: 'Themes', href: '/themes' },
];

const rightNavItems = [
  { label: 'Settings', href: '/settings' },
];

export default function Navigation() {
  const pathname = usePathname();

  const renderNavLink = (item: { label: string; href: string }) => {
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
  };

  return (
    <nav className="border-b border-border bg-surface">
      <div className="flex justify-between mx-auto w-full max-w-4xl px-4">
        <div className="flex">
          {leftNavItems.map(renderNavLink)}
        </div>
        <div className="flex">
          {rightNavItems.map(renderNavLink)}
        </div>
      </div>
    </nav>
  );
}