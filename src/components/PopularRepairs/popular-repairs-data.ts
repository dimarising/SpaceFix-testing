import { repairTypes, getServiceHref, type PopularRepairIcon } from '../Configurator/configurator-data';

export type { PopularRepairIcon };

export interface PopularRepair {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: PopularRepairIcon;
}

/** Karty na stronie głównej — prowadzą na samodzielne podstrony usług (SEO). */
export const popularRepairs: PopularRepair[] = repairTypes.map((repair) => ({
  title: repair.title,
  description: repair.description,
  href: getServiceHref(repair.slug),
  linkLabel: 'Dowiedz się więcej',
  icon: repair.icon,
}));
