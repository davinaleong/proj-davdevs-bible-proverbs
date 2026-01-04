import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  actionLabel,
  actionHref,
  onAction
}: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <div className="text-lg font-medium mb-2 text-danger">{message}</div>
      {(actionHref || onAction) && (
        <div className="mt-4">
          {actionHref ? (
            <Link
              href={actionHref}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {actionLabel || 'Try Again'}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {actionLabel || 'Try Again'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}