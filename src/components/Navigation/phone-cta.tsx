import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { contact } from '../../config/site';

interface PhoneCtaProps {
  className?: string;
  fullWidth?: boolean;
}

export default function PhoneCta({ className = '', fullWidth = false }: PhoneCtaProps) {
  return (
    <a
      href={contact.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#1c1d11] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a2b1a] sm:px-6 sm:py-3 sm:text-base ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      <FiPhone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
      <span>{contact.phoneDisplay}</span>
    </a>
  );
}
