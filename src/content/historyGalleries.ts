import { historyEngagements } from './history';
import { historyGalleryManifest } from './historyGalleryManifest.generated';

interface GalleryImage {
  src: string;
  filePath: string;
  alt: string;
}

const buildImageAlt = (engagementName: string, filePath: string) => {
  const filename = filePath.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'gallery image';
  const readableName = filename.replace(/[-_]+/g, ' ').trim();
  return readableName ? `${engagementName} - ${readableName}` : `${engagementName} gallery image`;
};

export const historyGalleryImageMap = historyEngagements.reduce<Record<string, GalleryImage[]>>((acc, engagement) => {
  acc[engagement.id] = (historyGalleryManifest[engagement.id] ?? []).map((src) => ({
    src,
    filePath: src,
    alt: buildImageAlt(engagement.shortName, src),
  }));
  return acc;
}, {});

export const historyGalleryEntries = historyEngagements.map((engagement) => ({
  ...engagement,
  images: historyGalleryImageMap[engagement.id] ?? [],
}));
