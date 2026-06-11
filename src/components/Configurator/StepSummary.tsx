import React from 'react';
import { FiArrowLeft, FiCheckCircle, FiClock, FiPhone } from 'react-icons/fi';
import { RiMailSendLine } from 'react-icons/ri';
import { contact } from '../../config/site';
import { serviceWarranty } from './configurator-data';
import { PhoneGlyph } from './icons';
import type { Phone, Repair } from './types';
import type { RepairType } from './configurator-data';

interface Props {
  model: Phone;
  repair: RepairType;
  onChangeRepair: () => void;
  onDownloadForm: () => void;
  onBack: () => void;
}

const InfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-8 text-center shadow-contact">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11]">
      {icon}
    </div>
    <p className="text-[20px] font-bold text-[#010101]">{label}</p>
    <p className="text-[16px] text-[#64748b]">{value}</p>
  </div>
);

const StepSummary: React.FC<Props> = ({ model, repair, onChangeRepair, onDownloadForm, onBack }) => {
  const repairObj: Repair | undefined = repair.repairKey
    ? model.repairs?.find((r) => r.key === repair.repairKey)
    : undefined;

  const price = repairObj?.price ?? 'Wycena telefoniczna';
  const duration = repairObj?.duration ?? 'do ustalenia';
  const description = repairObj?.description;

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
        <div className="rounded-2xl bg-white p-7 shadow-contact sm:p-9 lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#010101] sm:text-4xl">
            {model.name}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11]">
              <PhoneGlyph className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-[#010101]">{repair.title}</span>
            <button
              type="button"
              onClick={onChangeRepair}
              className="text-sm font-medium text-[#64748b] underline-offset-2 transition hover:text-[#1c1d11] hover:underline"
            >
              Zmień
            </button>
          </div>

          <p className="mt-6 text-4xl font-bold text-[#010101] sm:text-5xl">{price}</p>

          {Array.isArray(description) ? (
            <ul className="mt-5 list-inside list-disc text-[15px] leading-relaxed text-[#64748b] sm:text-base">
              {description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#64748b] sm:text-base">
              {description ??
                'Skontaktuj się z nami telefonicznie - przygotujemy indywidualną wycenę tej naprawy dla Twojego modelu.'}
            </p>
          )}

          <a
            href={contact.phoneHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2"
          >
            <FiPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
            Zadzwoń teraz
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <InfoCard
            icon={<FiCheckCircle className="h-10 w-10" aria-hidden="true" />}
            label="Czas naprawy"
            value={duration}
          />
          <InfoCard
            icon={<FiClock className="h-10 w-10" aria-hidden="true" />}
            label="Gwarancja"
            value={serviceWarranty}
          />
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-5 rounded-2xl bg-white p-6 text-center shadow-contact sm:p-8 lg:flex-row lg:gap-8 lg:text-left">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11]">
          <RiMailSendLine className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#010101] sm:text-xl">
            Nie masz jak dowieźć telefonu do serwisu?
          </h3>
          <p className="mt-1 text-[15px] text-[#64748b] sm:text-base">
            Skorzystaj z opcji wysyłki telefonu do serwisu
          </p>
        </div>
        <button
          type="button"
          onClick={onDownloadForm}
          className="inline-flex w-full shrink-0 items-center justify-center rounded-[14px] bg-[#1c1d11] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2 sm:text-base lg:w-auto"
        >
          Wypełnij formularz wysyłki
        </button>
      </div>
    </div>
  );
};

export default StepSummary;
