import fs from 'node:fs';
import path from 'node:path';
import { ApifyClient } from 'apify-client';

/**
 * Pobiera nazwy modeli i adresy URL zdjęć frontów telefonów z GSMArena
 * za pomocą aktora `crawlergang/gsmarena-scraper` na platformie Apify.
 *
 * Wymaga tokenu APIFY_TOKEN (patrz README poniżej / komentarz na dole pliku).
 *
 * Użycie:
 *   APIFY_TOKEN=apify_api_xxx node scripts/fetch-phone-images.mjs apple
 *   node --env-file=.env scripts/fetch-phone-images.mjs samsung
 *
 * Argument (opcjonalny): brandSlug, np. apple | samsung | xiaomi | google.
 * Domyślnie: apple.
 */

const ACTOR_ID = 'crawlergang/gsmarena-scraper';
const brandSlug = (process.argv[2] ?? 'apple').toLowerCase();
const OUTPUT_DIR = path.resolve('scripts/output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, `phone-images-${brandSlug}.json`);

/**
 * Prosty loader .env (bez zależności) — wczytuje APIFY_TOKEN z pliku .env,
 * jeśli zmienna nie została już ustawiona w środowisku.
 */
function loadEnvFile() {
  if (process.env.APIFY_TOKEN) return;
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    if (process.env[key] !== undefined) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

/**
 * Zostawia tylko interesujące nas pola. Aktor GSMArena zwraca `deviceName`
 * oraz `imageUrl` — mapujemy je na phoneName/phoneImage (z fallbackami).
 */
function toPhoneImage(item) {
  return {
    phoneName: item.deviceName ?? item.phoneName ?? item.name ?? null,
    phoneImage: item.imageUrl ?? item.phoneImage ?? item.image ?? null,
  };
}

async function main() {
  loadEnvFile();

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    console.error(
      '\n❌ Brak APIFY_TOKEN.\n' +
        '   Dodaj go do pliku .env w katalogu projektu:\n' +
        '     APIFY_TOKEN=apify_api_xxxxxxxxxxxxxxxxxxxx\n' +
        '   albo przekaż inline:\n' +
        '     APIFY_TOKEN=apify_api_xxx node scripts/fetch-phone-images.mjs apple\n',
    );
    process.exit(1);
  }

  const client = new ApifyClient({ token });

  console.log(`▶ Uruchamiam aktora ${ACTOR_ID} dla brandSlug="${brandSlug}"...`);

  let run;
  try {
    run = await client.actor(ACTOR_ID).call({
      mode: 'byBrand',
      brandSlug,
      maxItems: 2000,
    });
  } catch (error) {
    console.error('❌ Nie udało się uruchomić aktora Apify:', error?.message ?? error);
    process.exit(1);
  }

  if (!run?.defaultDatasetId) {
    console.error('❌ Aktor nie zwrócił identyfikatora datasetu (defaultDatasetId).');
    process.exit(1);
  }

  let items;
  try {
    const dataset = await client.dataset(run.defaultDatasetId).listItems();
    items = dataset.items ?? [];
  } catch (error) {
    console.error('❌ Nie udało się pobrać wyników z datasetu:', error?.message ?? error);
    process.exit(1);
  }

  const phones = items
    .map(toPhoneImage)
    .filter((phone) => phone.phoneName && phone.phoneImage);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(phones, null, 2), 'utf8');

  console.log(`✅ Zapisano ${phones.length} pozycji do ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  if (phones.length > 0) {
    console.log('   Przykład:', JSON.stringify(phones[0]));
  }
}

main().catch((error) => {
  console.error('❌ Nieoczekiwany błąd:', error);
  process.exit(1);
});
