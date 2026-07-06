import { withBase } from '../../utils/withBase';

export const KONFIGURATOR_PATH = withBase('/konfigurator/');

/** Query param: ?naprawa=<repairType.id> → konfigurator od razu na kroku 2. */
export const REPAIR_QUERY_PARAM = 'naprawa';

export function getKonfiguratorHref(repairId?: string): string {
  if (!repairId) return KONFIGURATOR_PATH;
  const params = new URLSearchParams({ [REPAIR_QUERY_PARAM]: repairId });
  return `${KONFIGURATOR_PATH}?${params.toString()}`;
}

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, '');

/** Slugi identyfikujące model w URL oferty, np. apple / iphone / iPhone-13-pro-max. */
export interface ModelSelectionSlugs {
  brandSlug: string;
  categorySlug: string;
  modelSlug: string;
}

/** URL oferty dla modelu, np. '/offer/apple/iphone/iPhone-13-pro-max/?naprawa=bateria'. */
export function getOfferHref(selection: ModelSelectionSlugs, repairId?: string): string {
  const path = withBase(
    `/offer/${trimSlashes(selection.brandSlug)}/${trimSlashes(selection.categorySlug)}/${trimSlashes(selection.modelSlug)}/`,
  );
  if (!repairId) return path;
  const params = new URLSearchParams({ [REPAIR_QUERY_PARAM]: repairId });
  return `${path}?${params.toString()}`;
}

export function getRepairIdFromSearch(search: URLSearchParams): string | null {
  const id = search.get(REPAIR_QUERY_PARAM)?.trim();
  return id || null;
}

/** Odczyt naprawy z props (SSR/dev) lub z URL (statyczny build + ?naprawa=). */
export function resolveInitialRepairId(propId?: string | null): string | null {
  if (propId) return propId;
  if (typeof window === 'undefined') return null;
  return getRepairIdFromSearch(new URLSearchParams(window.location.search));
}

export function getModelSelectionSlugs(
  brand: { slug: string },
  category: { slug: string },
  model: { slug: string },
): ModelSelectionSlugs {
  return {
    brandSlug: trimSlashes(brand.slug),
    categorySlug: trimSlashes(category.slug),
    modelSlug: trimSlashes(model.slug),
  };
}

/** Aktualizuje pasek adresu bez przeładowania strony. */
export function syncBrowserUrl(selection: ModelSelectionSlugs | null, repairId?: string | null): void {
  if (typeof window === 'undefined') return;
  const href = selection
    ? getOfferHref(selection, repairId ?? undefined)
    : getKonfiguratorHref(repairId ?? undefined);
  window.history.replaceState(window.history.state, '', href);
}
