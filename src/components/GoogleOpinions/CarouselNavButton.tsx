import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CarouselNavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const CarouselNavButton: React.FC<CarouselNavButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  className = '',
}) => {
  const Icon = direction === 'prev' ? FiChevronLeft : FiChevronRight;
  const label = direction === 'prev' ? 'Poprzednia opinia' : 'Następna opinia';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-surface-dark shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-surface-dark/20 disabled:cursor-not-allowed disabled:opacity-40 md:h-12 md:w-12 ${className}`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
};

export default CarouselNavButton;
