import React from 'react';

type StarRatingVariant = 'dark' | 'light' | 'gold';

interface StarRatingProps {
  rating?: number;
  variant?: StarRatingVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
} as const;

const variantClasses = {
  dark: { filled: 'text-surface-dark', empty: 'text-slate-200' },
  light: { filled: 'text-white', empty: 'text-white/30' },
  gold: { filled: 'text-amber-400', empty: 'text-amber-200' },
} as const;

const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const colors = variantClasses[variant];

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Ocena ${rating} z 5`}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`${sizeClasses[size]} ${index < rating ? colors.filled : colors.empty}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
