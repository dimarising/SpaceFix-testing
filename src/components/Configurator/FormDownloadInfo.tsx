import React from 'react';
import { contact } from '../../config/site';
import { FORM_URL, paczkomat } from './configurator-data';

const FormDownloadInfo: React.FC = () => (
  <div className="rounded-2xl bg-white p-7 shadow-contact sm:p-9">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <h1 className="text-2xl font-bold text-[#010101] sm:text-3xl">Pobrano formularz!</h1>
      <a
        href={FORM_URL}
        download
        className="text-sm font-medium text-[#64748b] underline-offset-2 transition hover:text-[#1c1d11] hover:underline"
      >
        Pobierz jeszcze raz
      </a>
    </div>

    <p className="mt-5 text-[15px] leading-relaxed text-[#64748b] sm:text-base">
      Po otrzymaniu telefonu pracownik serwisu skontaktuje się z tobą w celu przeprowadzenia
      płatności.
    </p>

    <div className="mt-6 space-y-5">
      <div>
        <p className="text-[15px] text-[#64748b]">Telefon z wypełnionym formularzem wyślij na adres:</p>
        <p className="mt-1 text-base font-bold text-[#010101] sm:text-lg">
          {contact.addressLine1}, {contact.addressLine2}
        </p>
      </div>
      <div>
        <p className="text-[15px] text-[#64748b]">Lub do paczkomatu:</p>
        <p className="mt-1 text-base font-bold text-[#010101] sm:text-lg">{paczkomat}</p>
      </div>
      <div>
        <p className="text-[15px] text-[#64748b]">Telefon kontaktowy w sprawie przesyłek:</p>
        <p className="mt-1 text-base font-bold text-[#010101] sm:text-lg">{contact.phone}</p>
      </div>
    </div>
  </div>
);

export default FormDownloadInfo;
