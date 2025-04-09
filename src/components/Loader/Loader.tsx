import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-2 border-blue-200 border-t-transparent rounded-full animate-spin [animation-delay:0.1s]"></div>
        <div className="absolute inset-2 border-2 border-blue-100 border-t-transparent rounded-full animate-spin [animation-delay:0.2s]"></div>
      </div>
    </div>
  );
};
