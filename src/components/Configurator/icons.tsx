import React, { useState } from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { SiXiaomi } from 'react-icons/si';
import { IoWaterOutline } from 'react-icons/io5';
import {
  MdBatteryChargingFull,
  MdMonitor,
  MdOutlinePhonelinkSetup,
  MdSmartphone,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import type { PopularRepairIcon } from '../PopularRepairs/popular-repairs-data';
import { withBase } from '../../utils/withBase';

const repairIcons: Partial<Record<PopularRepairIcon, IconType>> = {
  smartphone: MdSmartphone,
  monitor: MdMonitor,
  battery: MdBatteryChargingFull,
  water: IoWaterOutline,
  backGlass: MdOutlinePhonelinkSetup,
};

const repairSvgIcons: Partial<Record<PopularRepairIcon, string>> = {
  chargingPort: '/images/assets/configIcons/icon_zlacze_ladowania.svg',
  motherboard: '/images/assets/configIcons/icon_naprawa_plyty_glownej.svg',
};

export const RepairIcon: React.FC<{ icon: PopularRepairIcon; className?: string }> = ({
  icon,
  className,
}) => {
  const svgSrc = repairSvgIcons[icon];
  if (svgSrc) {
    return (
      <img
        src={withBase(svgSrc)}
        alt=""
        aria-hidden="true"
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const Icon = repairIcons[icon] ?? MdSmartphone;
  return <Icon className={className} aria-hidden="true" />;
};

export const PhoneGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <MdSmartphone className={className} aria-hidden="true" />
);

/**
 * Zdjęcie frontu telefonu z bezpiecznym fallbackiem do ikony, gdy zdjęcie nie
 * jest dostępne lub nie uda się go wczytać. `wrapperClassName` ustala rozmiar,
 * tło i zaokrąglenie kontenera.
 */
export const PhoneImage: React.FC<{
  src?: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
  glyphClassName?: string;
}> = ({ src, alt, wrapperClassName, imgClassName, glyphClassName }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[#f4f4f2] ${
        wrapperClassName ?? ''
      }`}
    >
      {showImage ? (
        <img
          src={withBase(src as string)}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain ${imgClassName ?? ''}`}
        />
      ) : (
        <PhoneGlyph className={`text-[#94a3b8] ${glyphClassName ?? 'h-1/2 w-1/2'}`} />
      )}
    </div>
  );
};

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
