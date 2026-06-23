import fs from 'node:fs';
import path from 'node:path';

/**
 * Dopasowuje zeskrobane (scripts/output/phone-images-*.json) zdjęcia telefonów
 * do modeli z src/data/**, pobiera je lokalnie do public/images/phones/
 * i generuje mapę slug -> ścieżka w src/data/phone-images.ts.
 *
 * Uruchom po `npm run fetch-phone-images <brand>`:
 *   node scripts/apply-phone-images.mjs
 */

const ROOT = path.resolve('.');
const OUTPUT_DIR = path.join(ROOT, 'scripts/output');
const IMAGES_DIR = path.join(ROOT, 'public/images/phones');
const MAP_FILE = path.join(ROOT, 'src/data/phone-images.ts');

/** Pliki z modelami, w których szukamy par name/slug. */
const MODEL_FILES = [
  'src/data/iphone/models.ts',
  'src/data/samsung/models.ts',
  'src/data/xiaomi/models.ts',
  'src/data/google/models.ts',
];

/**
 * Ręczne korekty błędnych adresów ze źródła (GSMArena/scraper pomylił zdjęcia
 * iPhone 11 Pro i 11 Pro Max). Klucz = znormalizowana nazwa modelu.
 */
const IMAGE_OVERRIDES = {
  iphone11promax: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max-.jpg',
  iphone11pro: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',
};

/**
 * Normalizuje nazwę do porównań:
 *  - małe litery,
 *  - "+" -> "plus" (np. Galaxy S26+ == Galaxy S26 Plus),
 *  - usuwa prefiksy marek (Samsung/Xiaomi), bo GSMArena ich nie używa
 *    (np. "Samsung Galaxy S25" -> "galaxys25", "Xiaomi Redmi Note 12" -> "redminote12"),
 *  - usuwa wszystkie znaki niealfanumeryczne.
 */
function normalize(name) {
  return String(name)
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\b(samsung|xiaomi)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Luźniejszy klucz — dodatkowo pomija sufiksy łączności (5G/4G/LTE),
 * bo GSMArena dodaje je niespójnie (np. "Galaxy S22 Ultra 5G" vs nasze
 * "Galaxy S22 Ultra", albo nasze "Galaxy A54 5G" vs ich "Galaxy A54").
 */
function looseKey(name) {
  return String(name)
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/\b(samsung|xiaomi)\b/g, ' ')
    .replace(/\b(5g|4g|lte)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Wczytuje wszystkie pliki scripts/output/phone-images-*.json do dwóch map:
 * dokładnej (exact) i luźnej (loose, bez sufiksów 5G/4G).
 */
function loadScrapedImages() {
  const exact = new Map();
  const loose = new Map();
  if (!fs.existsSync(OUTPUT_DIR)) return { exact, loose };

  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    if (!/^phone-images-.*\.json$/.test(file)) continue;
    const items = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf8'));
    for (const item of items) {
      if (!item?.phoneName || !item?.phoneImage) continue;
      const exactKey = normalize(item.phoneName);
      const looseK = looseKey(item.phoneName);
      if (!exact.has(exactKey)) exact.set(exactKey, item.phoneImage);
      // W mapie luźnej preferujemy wpis bazowy (bez sufiksu), gdy klucze kolidują.
      if (!loose.has(looseK) || exactKey === looseK) loose.set(looseK, item.phoneImage);
    }
  }

  for (const [key, url] of Object.entries(IMAGE_OVERRIDES)) {
    exact.set(key, url);
  }

  return { exact, loose };
}

/** Znajduje URL zdjęcia dla nazwy modelu: najpierw exact, potem loose. */
function findImage(maps, modelName) {
  return maps.exact.get(normalize(modelName)) ?? maps.loose.get(looseKey(modelName)) ?? null;
}

/** Wyciąga pary { name, slug } z pliku TS modeli (kolejne pola name/slug). */
function extractModels(fileText) {
  const regex = /name:\s*'([^']*)'\s*,\s*slug:\s*'([^']*)'/g;
  const models = [];
  let match;
  while ((match = regex.exec(fileText)) !== null) {
    models.push({ name: match[1].trim(), slug: match[2].trim() });
  }
  return models;
}

/** slug -> nazwa pliku obrazka (bez ścieżki). */
function imageFileName(slug, url) {
  const base = slug.replace(/\/+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const ext = (path.extname(new URL(url).pathname) || '.jpg').toLowerCase();
  return `${base}${ext}`;
}

async function download(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} dla ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

async function main() {
  const scraped = loadScrapedImages();
  if (scraped.exact.size === 0) {
    console.error('❌ Brak danych w scripts/output/. Uruchom najpierw `npm run fetch-phone-images <brand>`.');
    process.exit(1);
  }

  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const slugToPath = {};
  const matched = [];
  const unmatched = [];

  for (const relFile of MODEL_FILES) {
    const absFile = path.join(ROOT, relFile);
    if (!fs.existsSync(absFile)) continue;
    const models = extractModels(fs.readFileSync(absFile, 'utf8'));

    for (const model of models) {
      const url = findImage(scraped, model.name);
      if (!url) {
        unmatched.push(model.name);
        continue;
      }
      const fileName = imageFileName(model.slug, url);
      const destPath = path.join(IMAGES_DIR, fileName);
      try {
        if (!fs.existsSync(destPath)) {
          await download(url, destPath);
        }
        slugToPath[model.slug] = `/images/phones/${fileName}`;
        matched.push(model.name);
      } catch (error) {
        console.warn(`⚠ Nie pobrano zdjęcia dla "${model.name}": ${error.message}`);
        unmatched.push(model.name);
      }
    }
  }

  const entries = Object.keys(slugToPath)
    .sort()
    .map((slug) => `  '${slug}': '${slugToPath[slug]}',`)
    .join('\n');

  const fileContent = `/**
 * Mapa slug modelu -> lokalna ścieżka zdjęcia frontu telefonu.
 * Generowane automatycznie przez scripts/apply-phone-images.mjs — nie edytuj ręcznie.
 */
export const phoneImages: Record<string, string> = {
${entries}
};
`;

  fs.writeFileSync(MAP_FILE, fileContent, 'utf8');

  console.log(`✅ Dopasowano i pobrano ${matched.length} zdjęć -> public/images/phones/`);
  console.log(`✅ Zapisano mapę -> ${path.relative(ROOT, MAP_FILE)}`);
  if (unmatched.length > 0) {
    console.log(`\nℹ Bez dopasowania (${unmatched.length}): ${unmatched.join(', ')}`);
  }
}

main().catch((error) => {
  console.error('❌ Nieoczekiwany błąd:', error);
  process.exit(1);
});
