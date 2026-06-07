import iphoneModels from './models.ts';
import { appleWatchModels } from '../appleWatch/models.ts';

const appleCategories = [
  { name: 'iPhone', slug: 'iphone/', imgSrc: '/images/iphone-photo.png', phones: iphoneModels },
  { name: 'iPad', slug: 'apple-ipad/', imgSrc: '/images/ipad-photo.png', phones: [], ignore: 'pages' },
  { name: 'Apple Watch', slug: 'apple-watch/', imgSrc: '/images/applewatch-photo.png', phones: appleWatchModels },
];

export default appleCategories;
