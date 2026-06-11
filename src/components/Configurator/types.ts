import type { RepairType } from './configurator-data';

export type Brand = any;
export type Category = any;

export interface Repair {
  key: string;
  title: string;
  shortTitle: string;
  price: string;
  description: string | string[];
  duration: string;
}

export interface Phone {
  name: string;
  slug: string;
  repairs?: Repair[];
}

export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ConfiguratorState {
  step: Step;
  repair?: RepairType;
  brand?: Brand;
  category?: Category;
  model?: Phone;
}
