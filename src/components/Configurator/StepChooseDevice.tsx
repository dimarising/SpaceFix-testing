import React from 'react';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { DeviceCard } from './cards';
import { brands } from './configurator-data';
import type { Brand } from './types';

interface Props {
  onSelect: (brand: Brand) => void;
  onBack: () => void;
}

const StepChooseDevice: React.FC<Props> = ({ onSelect, onBack }) => (
  <div>
    <StepHeader title="Wybierz urządzenie" onBack={onBack} />

    <div className="mx-auto grid w-full max-w-[1208px] grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6">
      {brands.map((brand: any) => (
        <DeviceCard key={brand.name} name={brand.name} onClick={() => onSelect(brand)} />
      ))}
    </div>

    <NotFoundCta question="Nieznalazłeś swojego producenta?" />
  </div>
);

export default StepChooseDevice;
