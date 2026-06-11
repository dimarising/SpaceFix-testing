import { jsPDF } from 'jspdf';
import { contact } from '../../config/site';
import { paczkomat } from './configurator-data';
import { initPdfFonts, PDF_FONT_FAMILY } from './registerPdfFonts';
import type { ShippingFormData } from './shipping-form-data';

interface PdfContext {
  modelName: string;
  repairTitle: string;
}

const MARGIN = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 6,
): number {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function addSectionTitle(doc: jsPDF, title: string, y: number): number {
  doc.setFont(PDF_FONT_FAMILY, 'bold');
  doc.setFontSize(12);
  doc.setTextColor(28, 29, 17);
  doc.text(title, MARGIN, y);
  doc.setFont(PDF_FONT_FAMILY, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  return y + 8;
}

function addField(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFont(PDF_FONT_FAMILY, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(label, MARGIN, y);

  doc.setFont(PDF_FONT_FAMILY, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(1, 1, 1);
  const nextY = addWrappedText(doc, value || '—', MARGIN, y + 5, CONTENT_WIDTH);
  return nextY + 4;
}

export async function generateShippingPdf(
  formData: ShippingFormData,
  context: PdfContext,
): Promise<jsPDF> {
  await initPdfFonts();

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  let y = MARGIN;

  doc.setFont(PDF_FONT_FAMILY, 'bold');
  doc.setFontSize(18);
  doc.setTextColor(28, 29, 17);
  doc.text('SpaceFix — Formularz wysyłki telefonu', MARGIN, y);
  y += 10;

  doc.setFont(PDF_FONT_FAMILY, 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  y = addWrappedText(
    doc,
    'Wydrukuj ten formularz i dołącz go do przesyłki z telefonem. Po odebraniu urządzenia skontaktujemy się z Tobą w sprawie naprawy i płatności.',
    MARGIN,
    y,
    CONTENT_WIDTH,
  );
  y += 6;

  y = addSectionTitle(doc, 'Dane klienta', y);
  y = addField(doc, 'Imię i nazwisko', `${formData.firstName} ${formData.lastName}`, y);
  y = addField(doc, 'Telefon', formData.phone, y);
  y = addField(doc, 'E-mail', formData.email, y);
  y = addField(
    doc,
    'Adres zwrotny',
    `${formData.street}, ${formData.postalCode} ${formData.city}`,
    y,
  );

  y = addSectionTitle(doc, 'Urządzenie i naprawa', y);
  y = addField(doc, 'Model telefonu', context.modelName, y);
  y = addField(doc, 'Rodzaj naprawy', context.repairTitle, y);
  y = addField(doc, 'Numer IMEI / seryjny', formData.serialNumber, y);
  y = addField(doc, 'Hasło do urządzenia', formData.devicePassword, y);
  y = addField(doc, 'Opis usterki / uwagi', formData.notes, y);

  if (y > 240) {
    doc.addPage();
    y = MARGIN;
  }

  y = addSectionTitle(doc, 'Instrukcja wysyłki', y);
  y = addField(
    doc,
    'Adres serwisu',
    `${contact.addressLine1}, ${contact.addressLine2}`,
    y,
  );
  y = addField(doc, 'Paczkomat', paczkomat, y);
  y = addField(doc, 'Telefon w sprawie przesyłek', contact.phone, y);

  return doc;
}

export async function downloadShippingPdf(
  formData: ShippingFormData,
  context: PdfContext,
  filename = 'formularz-wysylki-spacefix.pdf',
): Promise<void> {
  const doc = await generateShippingPdf(formData, context);
  doc.save(filename);
}

export async function createShippingPdfBlobUrl(
  formData: ShippingFormData,
  context: PdfContext,
): Promise<string> {
  const doc = await generateShippingPdf(formData, context);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
