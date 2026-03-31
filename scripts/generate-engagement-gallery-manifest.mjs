import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const galleriesRoot = path.join(projectRoot, 'public', 'assets', 'engagement-galleries');
const outputFile = path.join(projectRoot, 'src', 'content', 'historyGalleryManifest.generated.ts');
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg']);

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

const getImagesForFolder = async (folderName) => {
  const folderPath = path.join(galleriesRoot, folderName);
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => `/assets/engagement-galleries/${folderName}/${entry.name}`)
    .sort(sortNaturally);
};

const generateManifestSource = async () => {
  const folders = await getGalleryFolders();
  const manifestEntries = await Promise.all(
    folders.map(async (folderName) => {
      const images = await getImagesForFolder(folderName);
      return `  '${folderName}': ${JSON.stringify(images)},`;
    }),
  );

  return [
    'export const historyGalleryManifest: Record<string, string[]> = {',
    ...manifestEntries,
    '};',
    '',
  ].join('\n');
};

const main = async () => {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  const source = await generateManifestSource();
  await fs.writeFile(outputFile, source, 'utf8');
};

main().catch((error) => {
  console.error('Failed to generate engagement gallery manifest.');
  console.error(error);
  process.exit(1);
});
