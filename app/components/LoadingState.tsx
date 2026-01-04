interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingState({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'py-4',
    md: 'py-8', 
    lg: 'py-12'
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="text-center">
        <div className="text-lg font-medium">{message}</div>
      </div>
    </div>
  );
}