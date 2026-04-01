import { historyEngagements } from './history';
import { historyGalleryManifest } from './historyGalleryManifest.generated';

interface GalleryImage {
  src: string;
  filePath: string;
  alt: string;
  scopeId: string | null;
}

const buildImageAlt = (engagementName: string, filePath: string) => {
  const filename = filePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'gallery image';
  const readableName = filename.replace(/[-_]+/g, ' ').trim();
  return readableName ? `${engagementName} - ${readableName}` : `${engagementName} gallery image`;
};

export const historyGalleryImageMap = historyEngagements.reduce<Record<string, GalleryImage[]>>((acc, engagement) => {
  acc[engagement.id] = (historyGalleryManifest[engagement.id] ?? []).map((image) => ({
    src: image.src,
    filePath: image.src,
    alt: buildImageAlt(engagement.shortName, image.src),
    scopeId: image.scopeId,
  }));
  return acc;
}, {});

export const historyGalleryEntries = historyEngagements.map((engagement) => ({
  ...engagement,
  images: historyGalleryImageMap[engagement.id] ?? [],
}));
