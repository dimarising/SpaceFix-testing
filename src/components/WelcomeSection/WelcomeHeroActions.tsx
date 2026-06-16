import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { contact } from '../../config/site';
import { KONFIGURATOR_PATH } from '../Configurator/konfigurator-url';

const calculatorIcon = (
  <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const ctaBase =
  'inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-base font-bold transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.98] sm:w-auto';

const WelcomeHeroActions = () => (
  <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
    <a href={KONFIGURATOR_PATH} className={`${ctaBase} bg-[#1c1d11] text-white shadow-sm hover:bg-[#2a2b1a]`}>
      {calculatorIcon}
      Wyceń Naprawę
    </a>
    <a
      href={contact.phoneHref}
      className={`${ctaBase} border border-white/30 bg-[#f5f5f0] text-[#1c1d11] shadow-sm hover:bg-white`}
    >
      <FiPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
      Zadzwoń {contact.phoneDisplay}
    </a>
  </div>
);

export default WelcomeHeroActions;
