import { withBase } from '../utils/withBase';
import { repairTypes, getServiceHref } from '../components/Configurator/configurator-data';

export const contact = {
  phone: '+48 730 889 759',
  phoneDisplay: '730 889 759',
  phoneHref: 'tel:+48730889759',
  email: 'kontakt@spacefix.pl',
  emailHref:
    'mailto:kontakt@spacefix.pl?subject=Potrzebuję%20naprawy!&body=Potrzebuję%20naprawy!%0D%0APoniżej%20podaję%20jaki%20sprzęt%20potrzebuje%20Waszej%20naprawy%20i%20co%20dokładnie%20mu%20dolega!%20:)%0D%0AZostawiam%20również%20numer%20telefonu%20pod%20który%20zadzwonicie%20z%20wyceną:',
  address: 'ul. Malinowa 16/U1, 02-495 Warszawa',
  addressLine1: 'ul. Malinowa 16/U1',
  addressLine2: '02-495 Warszawa',
  mapsHref: 'https://www.google.com/maps/place/SpaceFix+-+Serwis+Apple+,+Samsung+,+Xiaomi/@52.1931235,20.8805978,17z',
  mapsDirectionsHref:
    'https://www.google.com/maps/dir/?api=1&destination=ul.+Malinowa+16%2FU1,+02-495+Warszawa',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.7661380908194!2d20.8831727!3d52.1931235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4719357b16c39af7%3A0x93bd1b1e77aeba83!2sSpaceFix%20-%20Serwis%20Apple%2C%20Samsung%2C%20Xiaomi%2C%20Huawei!5e0!3m2!1spl!2spl!4v1727521001502!5m2!1spl!2spl',
  instagram: 'https://www.instagram.com/spacefix_repair/',
  facebook: 'https://www.facebook.com/profile.php?id=61586846714991',
  tiktok: 'https://www.tiktok.com/@spacefix_repair',
  googleReviews: 'https://maps.app.goo.gl/1zJNd1jXk6x6YLeT6',
};

export const socialLinks = [
  {
    label: 'Facebook',
    href: contact.facebook,
    icon: '/images/assets/social/facebook.svg',
  },
  {
    label: 'Instagram',
    href: contact.instagram,
    icon: '/images/assets/social/instagram.svg',
  },
  {
    label: 'TikTok',
    href: contact.tiktok,
    icon: '/images/assets/social/tiktok.svg',
  },
];

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** Linki do samodzielnych podstron usług (SEO) — używane w menu i na stronie. */
export const serviceNavLinks: NavLink[] = repairTypes.map((repair) => ({
  label: repair.title,
  href: getServiceHref(repair.slug),
}));

export const homeNavLinks: NavLink[] = [
  { label: 'Strona Główna', href: withBase('/#hero') },
  { label: 'Usługi', href: withBase('/#naprawy'), children: serviceNavLinks },
  { label: 'Cennik', href: withBase('/#cennik') },
  { label: 'Kontakt', href: withBase('/#kontakt') },
];

export const openingHours = [
  { days: 'Poniedziałek – Piątek', hours: '10:00–19:00' },
  { days: 'Sobota', hours: '10:00–16:00' },
  { days: 'Niedziela', hours: 'Nieczynne' },
];
