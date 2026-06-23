export type WhyUsFeature = {
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
};

export type WhyUsStat = {
  value: string;
  label: string;
};

const whyUsIconBase = '/images/assets/why%20spacefix';

export const whyUsFeatures: WhyUsFeature[] = [
  {
    title: 'Doświadczenie i wiedza',
    description: 'W <strong>SpaceFix</strong> łączymy doświadczenie i wiedzę ekspercką, by oferować usługi na najwyższym poziomie w dziedzinie technologii mobilnych. Jesteśmy specjalistami w <strong>naprawie smartfonów i tabletów w Warszawie</strong>, z długoletnim doświadczeniem, pozwalającym nam na szybkie i efektywne rozwiązywanie problemów technicznych.',
    iconSrc: `${whyUsIconBase}/icon_doswiadczenie_i_wiedza.svg`,
    iconAlt: 'Doświadczenie i wiedza',
  },
  {
    title: 'Punktualność i terminowość',
    description: 'Cenimy Twój czas, dlatego w <strong>SpaceFix</strong>, zlokalizowanym w sercu <strong>Ursusa</strong>, gwarantujemy <strong>terminowe usługi naprawy telefonów i smartfonów</strong>. Nasz zespół dołoży wszelkich starań, aby Twoje urządzenie było gotowe bez zbędnej zwłoki, z poszanowaniem Twojego harmonogramu.',
    iconSrc: `${whyUsIconBase}/icon_punktualnosc_i_terminowosc.svg`,
    iconAlt: 'Punktualność i terminowość',
  },
  {
    title: 'Dbałość o detale i estetykę',
    description: 'Dbamy o każdy szczegół naprawy, od estetyki do funkcjonalności. W <strong>SpaceFix</strong> nie ma miejsca na kompromisy dotyczące jakości - każda <strong>wymiana ekranu</strong>, <strong>baterii</strong> czy <strong>inne usługi naprawcze</strong> wykonywane są z precyzją, zachowując wygląd i czyniąc Twoje urządzenie jak nowe, gotowe służyć w dynamicznym życiu <strong>Warszawy</strong>.',
    iconSrc: `${whyUsIconBase}/icon_dbalosc_o_detale_i_estetyke.svg`,
    iconAlt: 'Dbałość o detale i estetykę',
  },
  {
    title: 'Referencje i opinie klientów',
    description: 'Poleceni przez mieszkańców <strong>Ursusa i Warszawy</strong>, jesteśmy dumni z pozytywnych opinii naszych klientów. Satysfakcja użytkowników, którzy skorzystali z naszych usług naprawy <strong>telefonów i smartfonów</strong>, motywuje nas do podnoszenia standardów pracy. Zaufaj ekspertom z <strong>SpaceFix</strong> i dołącz do grona zadowolonych klientów, którzy doświadczyli profesjonalizmu na każdym etapie współpracy.',
    iconSrc: `${whyUsIconBase}/icon_referencje_i_opinie_klientow.svg`,
    iconAlt: 'Referencje i opinie klientów',
  },
];

export const whyUsStats: WhyUsStat[] = [
  { value: '6 mies.', label: 'Gwarancji na naprawy' },
  { value: '5.0', label: 'Średnia z 400 opinii Google' },
  { value: '24-48h', label: 'Średni czas naprawy' },
  { value: '5000+', label: 'Naprawionych telefonów' },
];
