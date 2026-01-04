import { ReactNode } from 'react';

interface ButtonCardProps {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  children: ReactNode;
}

export default function ButtonCard({ 
  onClick, 
  isActive = false, 
  className = '', 
  children 
}: ButtonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 text-left border rounded-sm transition-all duration-200
        min-h-[var(--tap-target)]
        ${isActive 
          ? 'border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20' 
          : 'border-border bg-surface hover:bg-border/20 hover:shadow-md hover:border-primary/30'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}