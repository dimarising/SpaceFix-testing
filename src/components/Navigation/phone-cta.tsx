import React, { useEffect, useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import { contact } from '../../config/site';
import { getContactPriority, type ContactPriority } from '../../utils/openingHours';
import { withBase } from '../../utils/withBase';

interface PhoneCtaProps {
  className?: string;
  fullWidth?: boolean;
  /** Kompaktowe przyciski dla paska nawigacji — rosną dopiero od breakpointu xl. */
  compact?: boolean;
}

export default function PhoneCta({
  className = '',
  fullWidth = false,
  compact = false,
}: PhoneCtaProps) {
  const [priority, setPriority] = useState<ContactPriority>('email');
  const emailIsPriority = priority === 'email';

  useEffect(() => {
    const updatePriority = () => setPriority(getContactPriority());

    updatePriority();
    const intervalId = window.setInterval(updatePriority, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const sizeClass = compact
    ? 'px-3 py-2 text-sm xl:px-4 xl:py-2.5'
    : 'px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base';
  const baseLinkClass = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-bold transition ${sizeClass} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;
  const primaryLinkClass = `${baseLinkClass} bg-[#1c1d11] text-white hover:bg-[#2a2b1a]`;
  const secondaryLinkClass = `${baseLinkClass} border border-[#1c1d11]/15 bg-white text-[#1c1d11] hover:bg-[#f4f4f1]`;

  return (
    <div className={`flex ${fullWidth ? 'w-full flex-col gap-3' : 'items-center gap-2'}`}>
      <a
        href={contact.emailHref}
        className={`${emailIsPriority ? primaryLinkClass : secondaryLinkClass} ${
          emailIsPriority ? 'order-first' : 'order-last'
        }`}
      >
        <img
          src={withBase('/images/mail.png')}
          alt=""
          aria-hidden="true"
          className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
          style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
        />
        <span className={compact ? 'sr-only lg:not-sr-only' : ''}>{contact.email}</span>
      </a>

      <a href={contact.phoneHref} className={emailIsPriority ? secondaryLinkClass : primaryLinkClass}>
        <FiPhone className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
        <span>{contact.phoneDisplay}</span>
      </a>
    </div>
  );
}
