import { jsPDF } from 'jspdf';

const FONT_NORMAL = 'DejaVuSans.ttf';
const FONT_BOLD = 'DejaVuSans-Bold.ttf';
export const PDF_FONT_FAMILY = 'DejaVuSans';

let initPromise: Promise<void> | null = null;

async function loadFontBinary(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nie udało się załadować czcionki PDF: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunks: string[] = [];
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + chunkSize)));
  }

  return chunks.join('');
}

export function initPdfFonts(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const [normal, bold] = await Promise.all([
      loadFontBinary('/fonts/DejaVuSans.ttf'),
      loadFontBinary('/fonts/DejaVuSans-Bold.ttf'),
    ]);

    const addFonts = function (this: jsPDF) {
      this.addFileToVFS(FONT_NORMAL, normal);
      this.addFont(FONT_NORMAL, PDF_FONT_FAMILY, 'normal', undefined, 'Identity-H');
      this.addFileToVFS(FONT_BOLD, bold);
      this.addFont(FONT_BOLD, PDF_FONT_FAMILY, 'bold', undefined, 'Identity-H');
    };

    jsPDF.API.events.push(['addFonts', addFonts]);
  })();

  return initPromise;
}
