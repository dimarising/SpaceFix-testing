import React from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { SiXiaomi } from 'react-icons/si';
import { GiLaserBlast } from 'react-icons/gi';
import { IoWaterOutline } from 'react-icons/io5';
import {
  MdBatteryChargingFull,
  MdMonitor,
  MdOutlinePhonelinkSetup,
  MdSmartphone,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import type { PopularRepairIcon } from '../PopularRepairs/popular-repairs-data';

const repairIcons: Record<PopularRepairIcon, IconType> = {
  smartphone: MdSmartphone,
  monitor: MdMonitor,
  battery: MdBatteryChargingFull,
  water: IoWaterOutline,
  backGlass: MdOutlinePhonelinkSetup,
  laser: GiLaserBlast,
};

export const RepairIcon: React.FC<{ icon: PopularRepairIcon; className?: string }> = ({
  icon,
  className,
}) => {
  const Icon = repairIcons[icon];
  return <Icon className={className} aria-hidden="true" />;
};

export const PhoneGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <MdSmartphone className={className} aria-hidden="true" />
);

const brandIcons: Record<string, IconType> = {
  Apple: FaApple,
  Google: FaGoogle,
  Xiaomi: SiXiaomi,
};

/**
 * Logo marki: jeśli dostępna jest ikona (Apple, Google, Xiaomi) renderujemy ją,
 * w przeciwnym razie pierwsza litera nazwy (np. "S" dla Samsung) wyśrodkowana.
 */
export const BrandGlyph: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Icon = brandIcons[name];
  if (Icon) return <Icon className={className} aria-hidden="true" />;
  return (
    <span
      className={`flex items-center justify-center text-3xl font-extrabold leading-none sm:text-4xl ${
        className ?? ''
      }`}
    >
      {name.charAt(0)}
    </span>
  );
};

export const BrandBadge: React.FC<{ name: string; dark?: boolean }> = ({ name, dark }) => (
  <span
    className={`inline-flex items-center rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] ${
      dark ? 'bg-[#1c1d11] text-white' : 'bg-[#eeeeec] text-[#1c1d11]'
    }`}
  >
    {name}
  </span>
);
