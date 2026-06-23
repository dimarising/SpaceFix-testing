import React from 'react';
import { FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { contact, openingHours, socialLinks } from '../../config/site';
import { withBase } from '../../utils/withBase';

const FOOTER_TAGLINE =
  'Profesjonalny serwis telefonów GSM w Warszawie Ursus. Naprawy od ręki z gwarancją.';

const weekdayHours = openingHours.find((row) => row.days.includes('Poniedziałek'));
const saturdayHours = openingHours.find((row) => row.days === 'Sobota');

const formatHours = (hours: string) => hours.replace('–', ' - ');

const footerWeekdayHours = weekdayHours ? `Pn-Pt: ${formatHours(weekdayHours.hours)}` : '';
const footerSaturdayHours = saturdayHours ? `Sb: ${formatHours(saturdayHours.hours)}` : '';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-black">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex max-w-xs flex-col items-center text-center md:max-w-sm">
            <a href="/" className="inline-block">
              <span className="text-base font-bold uppercase tracking-[0.45em] sm:text-lg md:text-xl">
                SpaceFix
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-[#010101]">{FOOTER_TAGLINE}</p>
            <ul className="mt-6 flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1d11] text-white transition hover:bg-[#1c1d11]/80"
                  >
                    <img
                      src={withBase(social.icon)}
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5 [filter:invert(1)]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex w-full max-w-xs flex-col items-center text-center md:mt-0 md:w-auto md:max-w-none">
            <h3 className="text-base font-bold">Kontakt</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex justify-center">
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 transition hover:text-black/70"
                >
                  <FiMapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-center">
                    <span className="block">{contact.addressLine1}</span>
                    <span className="block">{contact.addressLine2}</span>
                  </span>
                </a>
              </li>
              <li className="flex justify-center">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center justify-center gap-3 transition hover:text-black/70"
                >
                  <FiPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex justify-center">
                <div className="inline-flex items-center justify-center gap-3">
                  <FiClock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-center">
                    <span className="block md:hidden">{footerWeekdayHours}</span>
                    <span className="block md:hidden">{footerSaturdayHours}</span>
                    <span className="hidden md:block">
                      {footerWeekdayHours} <br /> {footerSaturdayHours}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-[#010101]">
            © {new Date().getFullYear()} SpaceFix - Serwis GSM. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
