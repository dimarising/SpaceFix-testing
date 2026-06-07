import React from 'react';

interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  count,
  activeIndex,
  onSelect,
  className = '',
}) => (
  <div className={`flex items-center justify-center gap-2 ${className}`} role="tablist" aria-label="Nawigacja opinii">
    {[...Array(count)].map((_, index) => {
      const isActive = index === activeIndex;

      return (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-label={`Opinia ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full bg-surface-dark transition-all duration-300 ${
            isActive ? 'w-6 opacity-100' : 'w-2 opacity-30 hover:opacity-60'
          }`}
        />
      );
    })}
  </div>
);

export default CarouselDots;
