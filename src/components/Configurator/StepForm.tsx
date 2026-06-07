import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiFileText, FiPhone, FiSend, FiTool } from 'react-icons/fi';
import { contact } from '../../config/site';
import FormDeviceHeader from './FormDeviceHeader';
import FormDownloadInfo from './FormDownloadInfo';
import FormSummarySidebar from './FormSummarySidebar';
import type { Phone } from './types';
import type { RepairType } from './configurator-data';

interface Props {
  model: Phone;
  repair: RepairType;
  onBack: () => void;
}

const steps = [
  {
    number: '01',
    title: 'Uzupełnij formularz',
    description: 'Wypełnij formularz danymi swoimi i swojego telefonu',
    icon: <FiFileText className="h-10 w-10" aria-hidden="true" />,
  },
  {
    number: '02',
    title: 'Wyślij telefon',
    description: 'Wyślij telefon z wypełnionym formularzem na jeden z podanych adresów',
    icon: <FiSend className="h-10 w-10" aria-hidden="true" />,
  },
  {
    number: '03',
    title: 'Kontakt z pracownikiem',
    description: 'Po odebraniu i sprawdzeniu telefonu pracownik skontaktuje się z tobą',
    icon: <FiTool className="h-10 w-10" aria-hidden="true" />,
  },
  {
    number: '04',
    title: 'Naprawa gotowa!',
    description: 'Opłać naprawę i odbierz telefon lub poczekaj aż serwis odeśle go do ciebie.',
    icon: <FiCheckCircle className="h-10 w-10" aria-hidden="true" />,
  },
];

const StepForm: React.FC<Props> = ({ model, repair, onBack }) => {
  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#1c1d11] shadow-contact transition hover:bg-white"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          Wstecz
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FormDeviceHeader repair={repair} model={model} />
          <FormDownloadInfo />
        </div>

        <FormSummarySidebar model={model} repairKey={repair.repairKey} />
      </div>

      <div className="mt-6 rounded-2xl bg-white p-7 shadow-contact sm:p-10">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#010101] sm:text-3xl">
          Krok po kroku
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1c1d11] text-xs font-bold text-white">
                {step.number}
              </span>
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-[#eeeeec] text-[#1c1d11]">
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-[#010101]">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-5 text-center">
        <p className="text-xl text-[#64748b] sm:text-2xl">Potrzebujesz pomocy?</p>
        <a
          href={contact.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2"
        >
          <FiPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
          Zadzwoń {contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
};

export default StepForm;
