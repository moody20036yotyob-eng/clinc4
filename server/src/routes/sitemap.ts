import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const sitemapRouter = Router();

const CLIENT_URL = process.env.CLIENT_URL || 'https://ecotrove.sa';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/cv-templates', priority: '0.9', changefreq: 'weekly' },
  { path: '/portfolio-templates', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/digital-solutions', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
];

sitemapRouter.get('/sitemap.xml', async (_req, res) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { isPublished: true, isActive: true },
      select: { slug: true, updatedAt: true },
    });

    const now = new Date().toISOString().split('T')[0];

    const urls = [
      ...STATIC_PAGES.map((p) => `
  <url>
    <loc>${CLIENT_URL}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
      ...portfolios.map((p) => `
  <url>
    <loc>${CLIENT_URL}/p/${p.slug}</loc>
    <lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (err) {
    res.status(500).send('<?xml version="1.0"?><error>Sitemap generation failed</error>');
  }
});

sitemapRouter.get('/robots.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /editor/

Sitemap: ${CLIENT_URL}/sitemap.xml
`);
});
