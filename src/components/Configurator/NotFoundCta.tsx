import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { contact } from '../../config/site';

const NotFoundCta: React.FC<{ question: string }> = ({ question }) => (
  <div className="mt-12 flex flex-col items-center gap-5 text-center md:mt-16">
    <p className="text-xl text-[#64748b] sm:text-2xl">{question}</p>
    <a
      href={contact.phoneHref}
      className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2"
    >
      <FiPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
      Zadzwoń {contact.phoneDisplay}
    </a>
  </div>
);

export default NotFoundCta;
