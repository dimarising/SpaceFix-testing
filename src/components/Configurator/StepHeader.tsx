import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { BrandBadge } from './icons';

interface StepHeaderProps {
  title: string;
  badge?: string;
  onBack?: () => void;
}

const StepHeader: React.FC<StepHeaderProps> = ({ title, badge, onBack }) => (
  <div className="relative mb-8 md:mb-10">
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1c1d11] shadow-contact transition hover:bg-white"
      >
        <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Wstecz</span>
      </button>
    )}

    <div className="flex flex-col items-center gap-3 text-center">
      {badge && <BrandBadge name={badge} dark />}
      <h1 className="text-3xl font-bold tracking-tight text-[#010101] sm:text-4xl md:text-5xl">
        {title}
      </h1>
    </div>
  </div>
);

export default StepHeader;
