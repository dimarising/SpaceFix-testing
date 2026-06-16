export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('tel:') || path.startsWith('mailto:')) {
    return path;
  }

  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`;
  }

  return `${base}${path}`;
}
