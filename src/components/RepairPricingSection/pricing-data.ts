export type PricingRow = {
  model: string;
  screen: string;
  battery: string;
  waterDamage?: string;
};

export const pricingRows: PricingRow[] = [
  { model: 'iPhone 13', screen: '249 zł', battery: '179 zł' },
  { model: 'iPhone 14', screen: '299 zł', battery: '199 zł', waterDamage: '199 zł' },
  { model: 'iPhone 15', screen: '349 zł', battery: '229 zł' },
  { model: 'Samsung S23', screen: '279 zł', battery: '199 zł', waterDamage: '199 zł' },
  { model: 'Samsung S24', screen: '329 zł', battery: '229 zł' },
];

export const pricingFeatures = [
  {
    title: 'Oryginalne części',
    description: 'Używamy tylko sprawdzonych komponentów najwyższej jakości',
  },
  {
    title: 'Gwarancja 6 miesięcy',
    description: 'Pełna ochrona na każdą wykonaną naprawę',
  },
  {
    title: 'Fachowa wymiana',
    description: 'Nad twoim telefonem pracują najlepsi specjaliści z naszego serwisu',
  },
];
