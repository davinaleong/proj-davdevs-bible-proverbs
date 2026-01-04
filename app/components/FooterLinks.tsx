import Link from 'next/link';

interface FooterLinksProps {
  links: Array<{
    href: string;
    label: string;
  }>;
  className?: string;
}

export default function FooterLinks({ links, className = '' }: FooterLinksProps) {
  return (
    <div className={`pt-6 border-t border-border ${className}`}>
      <div className="flex gap-4 justify-center">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}