import { repairTypes, type PopularRepairIcon } from '../Configurator/configurator-data';
import { getKonfiguratorHref } from '../Configurator/konfigurator-url';

export type { PopularRepairIcon };

export interface PopularRepair {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: PopularRepairIcon;
}

/** Karty na stronie głównej — te same typy napraw co w konfiguratorze (krok 2 po kliknięciu). */
export const popularRepairs: PopularRepair[] = repairTypes.map((repair) => ({
  title: repair.title,
  description: repair.description,
  href: getKonfiguratorHref(repair.id),
  linkLabel: 'Wyceń',
  icon: repair.icon,
}));
