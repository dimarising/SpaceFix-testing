import React from 'react';
import { PhoneImage, RepairIcon } from './icons';
import type { Phone } from './types';
import type { RepairType } from './configurator-data';

interface Props {
  repair: RepairType;
  model: Phone;
}

const FormDeviceHeader: React.FC<Props> = ({ repair, model }) => (
  <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-contact sm:p-10">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11]">
        <RepairIcon icon={repair.icon} className="h-5 w-5" />
      </div>
      <span className="text-base font-bold text-[#010101] sm:text-lg">{repair.title}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-right text-base font-bold text-[#010101] sm:text-lg">{model.name}</span>
      <PhoneImage
        src={model.image}
        alt={model.name}
        wrapperClassName="h-12 w-12 shrink-0 rounded-xl"
        imgClassName="p-1"
        glyphClassName="h-6 w-6"
      />
    </div>
  </div>
);

export default FormDeviceHeader;
