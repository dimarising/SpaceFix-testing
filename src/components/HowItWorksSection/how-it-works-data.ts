export type HowItWorksStepIcon = 'phone' | 'search' | 'check';

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: HowItWorksStepIcon;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Zadzwoń lub odwiedź nas',
    description:
      'Skontaktuj się telefonicznie lub przyjdź do naszego serwisu w Ursusie',
    icon: 'phone',
  },
  {
    number: '02',
    title: 'Darmowa diagnoza i wycena',
    description: 'Zbadamy problem i przedstawimy szczegółową wycenę naprawy',
    icon: 'search',
  },
  {
    number: '03',
    title: 'Naprawa + gwarancja',
    description:
      'Profesjonalna naprawa z 6-miesięczną gwarancją na wykonane usługi',
    icon: 'check',
  },
];

export const howItWorksShipping = {
  title: 'Nie masz jak dowieźć telefonu do serwisu?',
  description: 'Skorzystaj z opcji wysyłki telefonu do serwisu',
  buttonLabel: 'Wyślij telefon do nas!',
};
