import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GOOGLE_RATING } from './types';
import StarRating from './StarRating';

interface RatingSummaryBadgeProps {
  href?: string;
  className?: string;
}

const RatingSummaryBadge: React.FC<RatingSummaryBadgeProps> = ({ href, className = '' }) => {
  const content = (
    <>
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm lg:mb-3">
        <FcGoogle className="h-5 w-5" aria-hidden />
      </div>
      <StarRating rating={5} variant="light" size="lg" />
      <p className="mt-2 text-2xl font-bold tracking-tight lg:text-[28px]">
        {GOOGLE_RATING.score}/{GOOGLE_RATING.maxScore.toFixed(1)}
      </p>
      <p className="mt-1 text-xs font-medium text-white/80 lg:text-sm">
        Na podstawie {GOOGLE_RATING.reviewCount} opinii Google
      </p>
    </>
  );

  const badgeClassName = `flex h-auto w-full max-w-[363px] flex-col items-center justify-center rounded-[1.25rem] bg-[#1a1a1a] px-8 py-6 text-white shadow-lg lg:h-[224px] lg:w-[363px] lg:max-w-[363px] lg:px-10 lg:py-0 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${badgeClassName} transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]`}
      >
        {content}
      </a>
    );
  }

  return <div className={badgeClassName}>{content}</div>;
};

export default RatingSummaryBadge;
