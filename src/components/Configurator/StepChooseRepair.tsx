import React from 'react';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { RepairCard } from './cards';
import { repairTypes, type RepairType } from './configurator-data';

interface Props {
  onSelect: (repair: RepairType) => void;
}

const StepChooseRepair: React.FC<Props> = ({ onSelect }) => (
  <div>
    <StepHeader title="Wybierz naprawę" />

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {repairTypes.map((repair) => (
        <RepairCard key={repair.id} repair={repair} onClick={() => onSelect(repair)} />
      ))}
    </div>

    <NotFoundCta question="Nieznalazłeś swojego problemu?" />
  </div>
);

export default StepChooseRepair;
