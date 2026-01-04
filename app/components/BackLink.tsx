import Link from 'next/link';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <div className="mb-6">
      <Link 
        href={href}
        className="text-primary hover:text-primary/80 transition-colors text-sm"
      >
        ← {children}
      </Link>
    </div>
  );
}