import React from 'react';
import { formatPln, parsePrice, shipping } from './configurator-data';
import type { Phone, Repair } from './types';

interface Props {
  model: Phone;
  repairKey: Repair['key'] | null | undefined;
}

const SummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[13px] text-[#64748b]">{label}</p>
    <p className="text-[24px] font-bold text-[#010101]">{value}</p>
  </div>
);

const FormSummarySidebar: React.FC<Props> = ({ model, repairKey }) => {
  const repairObj: Repair | undefined = repairKey
    ? model.repairs?.find((r) => r.key === repairKey)
    : undefined;

  const priceNum = parsePrice(repairObj?.price);
  const hasPrice = priceNum !== null;
  const repairCost = hasPrice ? formatPln(priceNum as number) : 'Wycena indywidualna';
  const totalCost = hasPrice
    ? formatPln((priceNum as number) + shipping.returnShippingCost)
    : 'Wycena indywidualna';

  return (
    <div className="rounded-2xl bg-white p-7 shadow-contact sm:p-8">
      <div className="space-y-4">
        <SummaryRow label="Metoda Płatności" value={shipping.paymentMethod} />
        <SummaryRow label="Szacowany Czas Naprawy" value={shipping.repairTime} />
        <SummaryRow label="Gwarancja" value={shipping.warranty} />
      </div>

      <hr className="my-6 border-[#e2e8f0]" />

      <div className="space-y-4">
        <SummaryRow label="Szacowany koszt naprawy" value={repairCost} />
        <SummaryRow label="Koszt wysyłki zwrotnej" value={formatPln(shipping.returnShippingCost)} />
        <hr className="my-6 border-[#e2e8f0]" />
        <SummaryRow label="Szacowany koszt łączny" value={totalCost} />
      </div>
    </div>
  );
};

export default FormSummarySidebar;
