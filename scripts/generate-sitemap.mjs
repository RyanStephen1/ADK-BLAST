import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const galleriesRoot = path.join(projectRoot, 'public', 'assets', 'engagement-galleries');
const outputFile = path.join(projectRoot, 'public', 'sitemap.xml');

const BASE_URL = 'https://adknprotech.com';

const staticRoutes = [
  '',
  '/services',
  '/history',
  '/certifications',
  '/partners',
  '/privacy-policy',
  '/terms-of-service'
];

const sortNaturally = (left, right) =>
  left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });

const exists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const getGalleryFolders = async () => {
  if (!(await exists(galleriesRoot))) {
    return [];
  }

  const entries = await fs.readdir(galleriesRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(sortNaturally);
};

const generateSitemap = async () => {
  const dynamicFolders = await getGalleryFolders();
  
  const allRoutes = [
    ...staticRoutes,
    ...dynamicFolders.map(folder => `/history/gallery/${folder}`)
  ];

  const currentDate = new Date().toISOString().split('T')[0];

  const urls = allRoutes.map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemapXml;
};

const main = async () => {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  const sitemapXml = await generateSitemap();
  await fs.writeFile(outputFile, sitemapXml, 'utf8');
  console.log('Sitemap generated successfully at public/sitemap.xml');
};

main().catch((error) => {
  console.error('Failed to generate sitemap.');
  console.error(error);
  process.exit(1);
});
