/**
 * Where to land after a sign-in that leaves the site (Google, Facebook,
 * email links). Email and code sign-ins keep the page in router state;
 * a provider round trip loses it, so the page that sent the person to sign
 * in leaves its path here first.
 */

const KEY = 'ogt:after-auth';

export function rememberAfterAuth(path: string) {
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    /* storage blocked: the person lands on the default page */
  }
}

/** The remembered path, once, or the account page. Only paths on this site. */
export function afterAuth(fallback = '/dashboard'): string {
  try {
    const path = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (path && path.startsWith('/') && !path.startsWith('//')) return path;
  } catch {
    /* ignore */
  }
  return fallback;
}
