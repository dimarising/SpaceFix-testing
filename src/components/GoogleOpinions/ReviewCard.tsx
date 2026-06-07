import React from 'react';
import type { Review } from './types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function formatAuthorName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return parts[0] ?? name;

  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${parts[0]} ${lastInitial}.`;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => (
  <article
    className={`flex w-full max-w-[380px] flex-col rounded-[2rem] bg-white p-7 shadow-sm lg:h-[265px] lg:p-8 ${className}`}
  >
    <StarRating rating={review.rating} variant="dark" />
    <blockquote className="mt-4 flex-1 text-[15px] leading-snug text-surface-dark line-clamp-4 lg:mt-3 lg:text-base lg:leading-relaxed">
      &ldquo;{review.text}&rdquo;
    </blockquote>
    <div className="mt-4 border-t border-slate-100 pt-4 lg:mt-auto lg:pt-5">
      <p className="text-sm font-bold text-surface-dark lg:text-base">{formatAuthorName(review.author)}</p>
      <p className="mt-0.5 text-xs text-slate-500 lg:text-sm">Google</p>
    </div>
  </article>
);

export default ReviewCard;
