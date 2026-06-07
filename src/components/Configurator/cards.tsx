import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { BrandBadge, BrandGlyph, RepairIcon } from './icons';
import type { RepairType } from './configurator-data';

const chevron = (
  <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#1c1d11] transition group-hover:gap-2">
    Wybierz
    <FiChevronRight className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
  </span>
);

/** Ekran 1 - karta typu naprawy (układ pionowy, jak Najpopularniejsze naprawy). */
export const RepairCard: React.FC<{ repair: RepairType; onClick: () => void }> = ({
  repair,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex h-full flex-col rounded-2xl bg-white p-6 text-left shadow-contact transition hover:shadow-card-hover sm:p-8"
  >
    <div
      className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11] sm:mb-6 sm:h-16 sm:w-16"
      aria-hidden="true"
    >
      <RepairIcon icon={repair.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
    </div>
    <h3 className="text-lg font-bold text-[#010101] sm:text-xl">{repair.title}</h3>
    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#2A2C11] sm:text-base">
      {repair.description}
    </p>
    <span className="mt-5 sm:mt-6">{chevron}</span>
  </button>
);

/** Ekran 2 - karta urządzenia/marki (układ poziomy z logo). */
export const DeviceCard: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex h-[132px] w-full max-w-[592px] items-center gap-5 rounded-2xl bg-white px-6 text-left shadow-contact transition hover:shadow-card-hover"
  >
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eeeeec] text-2xl text-[#1c1d11]"
      aria-hidden="true"
    >
      <BrandGlyph name={name} className="h-7 w-7" />
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="text-lg font-bold text-[#010101] sm:text-xl">{name}</h3>
      <span className="mt-1 block">{chevron}</span>
    </div>
  </button>
);

/** Ekran 3 - karta serii (układ poziomy z bejdżem marki po prawej). */
export const SeriesCard: React.FC<{ name: string; brandName: string; onClick: () => void }> = ({
  name,
  brandName,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex h-[132px] w-full max-w-[592px] items-center justify-between gap-4 rounded-2xl bg-white px-6 text-left shadow-contact transition hover:shadow-card-hover"
  >
    <div className="min-w-0">
      <h3 className="text-lg font-bold text-[#010101] sm:text-xl">{name}</h3>
      <span className="mt-1 block">{chevron}</span>
    </div>
    <BrandBadge name={brandName} />
  </button>
);

/** Ekran 4 - karta modelu (prosta). */
export const ModelCard: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-full w-full items-center rounded-2xl bg-white p-7 text-left text-[20px] font-bold text-[#010101] shadow-contact transition hover:shadow-card-hover hover:bg-[#fafafa]"
  >
    {name}
  </button>
);
