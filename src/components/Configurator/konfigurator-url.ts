import { withBase } from '../../utils/withBase';

export const KONFIGURATOR_PATH = withBase('/konfigurator/');

/** Query param: ?naprawa=<repairType.id> → konfigurator od razu na kroku 2. */
export const REPAIR_QUERY_PARAM = 'naprawa';

export function getKonfiguratorHref(repairId?: string): string {
  if (!repairId) return KONFIGURATOR_PATH;
  const params = new URLSearchParams({ [REPAIR_QUERY_PARAM]: repairId });
  return `${KONFIGURATOR_PATH}?${params.toString()}`;
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
