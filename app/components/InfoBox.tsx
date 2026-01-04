import { ReactNode } from 'react';

interface InfoBoxProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export default function InfoBox({ title, icon, children, className = '' }: InfoBoxProps) {
  return (
    <div className={`mt-8 p-4 bg-surface border border-border rounded-sm ${className}`}>
      <h3 className="font-medium mb-2">
        {icon && `${icon} `}{title}
      </h3>
      {children}
    </div>
  );
}