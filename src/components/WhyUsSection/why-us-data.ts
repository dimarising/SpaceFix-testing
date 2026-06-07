export type WhyUsFeatureIcon = 'shield' | 'flash' | 'star' | 'pricetag';

export type WhyUsFeature = {
  title: string;
  description: string;
  icon: WhyUsFeatureIcon;
};

export type WhyUsStat = {
  value: string;
  label: string;
};

export const whyUsFeatures: WhyUsFeature[] = [
  {
    title: '6 miesięcy gwarancji',
    description: 'Pełna gwarancja na każdą wykonaną naprawę',
    icon: 'shield',
  },
  {
    title: 'Naprawy 24-48h',
    description: 'Szybka realizacja, popularne modele naprawiamy od ręki',
    icon: 'flash',
  },
  {
    title: 'Doświadczeni technicy',
    description: 'Profesjonalny zespół z tysiącami udanych napraw',
    icon: 'star',
  },
  {
    title: 'Konkurencyjne ceny',
    description: 'Najlepsza jakość części w przystępnych cenach',
    icon: 'pricetag',
  },
];

export const whyUsStats: WhyUsStat[] = [
  { value: '6 mies.', label: 'Gwarancji na naprawy' },
  { value: '5.0', label: 'Średnia z 400 opinii Google' },
  { value: '24-48h', label: 'Średni czas naprawy' },
  { value: '5000+', label: 'Naprawionych telefonów' },
];
