import data from '../../data/data';

export type PopularRepairIcon =
  | 'smartphone'
  | 'monitor'
  | 'battery'
  | 'water'
  | 'backGlass'
  | 'laser';

export type RepairKey = 'front-glass' | 'display' | 'back-glass' | 'battery';

export interface RepairType {
  id: string;
  title: string;
  description: string;
  icon: PopularRepairIcon;
  /** Klucz dopasowujący ten typ do konkretnej naprawy modelu. null => brak ceny per-model. */
  repairKey: RepairKey | null;
}

export const repairTypes: RepairType[] = [
  {
    id: 'wymiana-szybki',
    title: 'Wymiana szybki',
    description: 'Profesjonalna wymiana uszkodzonej szybki',
    icon: 'smartphone',
    repairKey: 'front-glass',
  },
  {
    id: 'wyswietlacz',
    title: 'Wyświetlacz',
    description: 'Naprawa i wymiana wyświetlacza',
    icon: 'monitor',
    repairKey: 'display',
  },
  {
    id: 'bateria',
    title: 'Bateria',
    description: 'Wymiana baterii - dłuższa żywotność',
    icon: 'battery',
    repairKey: 'battery',
  },
  {
    id: 'naprawa-zalania',
    title: 'Naprawa zalania',
    description: 'Profesjonalne czyszczenie i naprawa',
    icon: 'water',
    repairKey: null,
  },
  {
    id: 'wymiana-tylnej-szyby',
    title: 'Wymiana tylnej szyby',
    description: 'Wymiana panelu tylnego w całości',
    icon: 'backGlass',
    repairKey: 'back-glass',
  },
  {
    id: 'laserowa-regeneracja',
    title: 'Laserowa Regeneracja Szyby',
    description: 'profesjonalna regeneracja szkła bez wymiany wyświetlacza',
    icon: 'laser',
    repairKey: null,
  },
];

/** Marki dostępne w konfiguratorze (pomijamy te oznaczone jako ignore: 'list', np. iPad). */
export const brands = data.filter((brand: any) => brand.ignore !== 'list');

/** Stałe dotyczące wysyłki telefonu do serwisu (ekran 5 i 6). */
export const shipping = {
  paymentMethod: 'Przelew bankowy',
  repairTime: '3-4 dni robocze',
  warranty: '3 miesiące',
  returnShippingCost: 15,
};

/** Gwarancja na naprawę stacjonarną (ekran 5). */
export const serviceWarranty = '6 miesięcy';

/** Adres paczkomatu do wysyłki telefonu (ekran 6). */
export const paczkomat = 'Paczkomat WAW33B Bohaterów Warszawy 25, Warszawa';

/** Plik formularza do pobrania (placeholder - docelowy PDF podstawimy później). */
export const FORM_URL = '/forms/formularz-wysylki.pdf';

/** Serie (kategorie) marki dostępne w konfiguratorze - z modelami i nie kierujące na osobne strony. */
export const getSelectableCategories = (brand: any): any[] =>
  (brand?.categories ?? []).filter(
    (category: any) => category?.ignore !== 'pages' && (category?.phones?.length ?? 0) > 0,
  );

/** Modele danej serii. */
export const getModels = (category: any): any[] => category?.phones ?? [];

/** Wyciąga liczbę złotych z ceny zapisanej jako string, np. "549 zł" => 549. */
export const parsePrice = (price?: string): number | null => {
  if (!price) return null;
  const match = price.replace(/\s/g, '').match(/(\d+)/);
  return match ? Number(match[1]) : null;
};

/** Formatuje liczbę złotych jako "549,00 zł". */
export const formatPln = (value: number): string =>
  `${value.toLocaleString('pl-PL')},00 zł`;
