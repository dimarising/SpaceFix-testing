import React from 'react';
import { contact } from '../../config/site';
import { paczkomat } from './configurator-data';
import type { ShippingFormData } from './shipping-form-data';

interface Props {
  pdfUrl: string;
  formData: ShippingFormData;
  onDownloadAgain: () => void;
}

const FormDownloadInfo: React.FC<Props> = ({ pdfUrl, formData, onDownloadAgain }) => (
  <div className="rounded-2xl bg-white p-7 shadow-contact sm:p-9">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <h1 className="text-2xl font-bold text-[#010101] sm:text-3xl">Pobrano formularz!</h1>
      <a
        href={pdfUrl}
        download="formularz-wysylki-spacefix.pdf"
        onClick={onDownloadAgain}
        className="text-sm font-medium text-[#64748b] underline-offset-2 transition hover:text-[#1c1d11] hover:underline"
      >
        Pobierz jeszcze raz
      </a>
    </div>

    <p className="mt-4 text-[15px] text-[#64748b]">
      Formularz został przygotowany dla:{' '}
      <span className="font-semibold text-[#010101]">
        {formData.firstName} {formData.lastName}
      </span>
    </p>

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
