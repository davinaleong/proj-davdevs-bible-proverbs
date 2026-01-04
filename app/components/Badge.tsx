interface BadgeProps {
  variant: 'default' | 'active' | 'accent' | 'primary';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function Badge({ variant, children, size = 'sm' }: BadgeProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-full
    ${size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'}
  `;

  const variantClasses = {
    default: 'bg-border/20 text-fg',
    active: 'bg-primary/20 text-primary',
    accent: 'bg-accent/10 text-accent',
    primary: 'bg-primary/10 text-primary'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}