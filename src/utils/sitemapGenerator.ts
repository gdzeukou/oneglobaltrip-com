import { ROUTES } from '@/constants/routes';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

export const generateSitemapUrls = (baseUrl: string = 'https://oneglobaltrip.com'): SitemapUrl[] => {
  const today = new Date().toISOString().split('T')[0];
  
  const publicRoutes = [
    { route: ROUTES.HOME, priority: 1.0, changefreq: 'daily' as const },
    { route: ROUTES.PACKAGES, priority: 0.8, changefreq: 'weekly' as const },
    { route: ROUTES.VISAS, priority: 0.8, changefreq: 'weekly' as const },
    { route: ROUTES.CONTACT, priority: 0.7, changefreq: 'monthly' as const },
    { route: ROUTES.PRICING, priority: 0.8, changefreq: 'weekly' as const },
    { route: ROUTES.ABOUT, priority: 0.7, changefreq: 'monthly' as const },
    { route: ROUTES.BLOG, priority: 0.7, changefreq: 'weekly' as const },
    { route: ROUTES.SERVICES, priority: 0.8, changefreq: 'weekly' as const },
    { route: ROUTES.TESTIMONIALS, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.SHORT_STAY_VISAS, priority: 0.7, changefreq: 'weekly' as const },
    { route: ROUTES.LONG_STAY_VISAS, priority: 0.7, changefreq: 'weekly' as const },
    { route: ROUTES.VISAS_PRICING, priority: 0.7, changefreq: 'weekly' as const },
    { route: ROUTES.SCHENGEN_SHORT_STAY_LANDING, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.FRANCE_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.GREECE_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.ITALY_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.NETHERLANDS_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.GERMANY_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.DENMARK_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.SWEDEN_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.UK_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.UK_5_YEAR_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.UAE_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.CANADA_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.BRAZIL_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.INDIA_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.NIGERIA_SHORT_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.FRANCE_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.GERMANY_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.PORTUGAL_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.FINLAND_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.DENMARK_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.NORWAY_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.SWITZERLAND_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.NIGERIA_LONG_STAY, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.PARIS_EXPLORE_PACKAGE, priority: 0.6, changefreq: 'monthly' as const },
    { route: ROUTES.CONCIERGE, priority: 0.7, changefreq: 'weekly' as const },
    { route: ROUTES.AI_CHAT, priority: 0.7, changefreq: 'weekly' as const },
  ];

  // Filter out external URLs and private routes
  const internalRoutes = publicRoutes.filter(({ route }) => 
    !route.startsWith('http') && 
    !route.includes(':id') &&
    !route.includes('/auth') &&
    !route.includes('/dashboard') &&
    !route.includes('/profile') &&
    !route.includes('/admin') &&
    !route.includes('/booking')
  );

  return internalRoutes.map(({ route, priority, changefreq }) => ({
    loc: `${baseUrl}${route}`,
    lastmod: today,
    changefreq,
    priority,
  }));
};

export const generateSitemapXml = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};